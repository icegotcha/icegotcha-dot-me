import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

const validSubmission = {
  name: ' Test Visitor ',
  email: 'visitor@example.com',
  message: ' A synthetic test message. ',
  token: 'synthetic-token',
}
const verified = { success: true, action: 'contact', hostname: 'portfolio.example' }
const NAME_ERROR = 'Enter a name between 1 and 100 characters, without line breaks.'
const EMAIL_ERROR = 'Enter a valid email address.'
const MESSAGE_ERROR = 'Enter a message between 1 and 5,000 characters.'
const TOKEN_ERROR = 'Verification is missing or invalid. Please submit again.'
const fetchMock = vi.fn<typeof fetch>()

function submit(body: unknown = validSubmission): Promise<Response> {
  return POST(
    new Request('https://portfolio.example/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  )
}

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'development')
  vi.stubEnv('TURNSTILE_SECRET_KEY', 'synthetic-secret')
  vi.stubEnv('TURNSTILE_EXPECTED_HOSTNAME', 'portfolio.example')
  vi.stubEnv('RESEND_API_KEY', 'synthetic-api-key')
  vi.stubEnv('CONTACT_FROM_EMAIL', 'sender@example.com')
  vi.stubEnv('CONTACT_TO_EMAIL', 'delivered@resend.dev')
  vi.stubGlobal('fetch', fetchMock)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  fetchMock.mockReset()
  fetchMock.mockResolvedValueOnce(Response.json(verified))
  fetchMock.mockResolvedValueOnce(Response.json({ id: 'synthetic-email-id' }))
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('submission validation', () => {
  it.each([null, false, 1, 'text'])('rejects invalid body %j', async (body) => {
    const response = await submit(body)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'Invalid submission.', status: 400 })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    [{}, NAME_ERROR],
    [[], NAME_ERROR],
    [{ name: 1 }, NAME_ERROR],
    [{ name: ' ' }, NAME_ERROR],
    [{ name: 'Test\nVisitor' }, NAME_ERROR],
    [{ name: 'Test\rVisitor' }, NAME_ERROR],
    [{ name: 'x'.repeat(101) }, NAME_ERROR],
    [{ email: null }, EMAIL_ERROR],
    [{ email: ' visitor@example.com' }, EMAIL_ERROR],
    [{ email: 'visitor@example' }, EMAIL_ERROR],
    [{ email: 'a'.repeat(243) + '@example.com' }, EMAIL_ERROR],
    [{ message: 1 }, MESSAGE_ERROR],
    [{ message: ' \n ' }, MESSAGE_ERROR],
    [{ message: 'x'.repeat(5001) }, MESSAGE_ERROR],
    [{ token: null }, TOKEN_ERROR],
    [{ token: '' }, TOKEN_ERROR],
    [{ token: 'x'.repeat(2049) }, TOKEN_ERROR],
  ])('preserves field error for %j', async (fields, error) => {
    const body =
      Array.isArray(fields) || Object.keys(fields).length === 0
        ? fields
        : { ...validSubmission, ...fields }
    const response = await submit(body)
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error, status: 400 })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('reports the first invalid field in name/email/message/token order', async () => {
    for (const field of ['name', 'email', 'message', 'token'] as const) {
      const fields = { ...validSubmission, name: '', email: '', message: '', token: '' }
      for (const key of ['name', 'email', 'message', 'token'] as const) {
        if (key === field) break
        fields[key] = validSubmission[key]
      }
      const response = await submit(fields)
      const expected = {
        name: NAME_ERROR,
        email: EMAIL_ERROR,
        message: MESSAGE_ERROR,
        token: TOKEN_ERROR,
      }
      expect((await response.json()).error).toBe(expected[field])
    }
  })

  it.each([
    { name: 'x'.repeat(100) },
    { email: 'a'.repeat(242) + '@example.com' },
    { message: 'x'.repeat(5000) },
    { token: 'x'.repeat(2048) },
    { token: ' ' },
    { email: 'a..b@example.com' },
    { email: 'visitor@example.c' },
    { extra: 'ignored' },
  ])('preserves accepted boundaries and formats %j', async (fields) => {
    const response = await submit({ ...validSubmission, ...fields })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ success: true })
  })

  it('rejects malformed JSON and checks raw length before parsing', async () => {
    for (const [body, status] of [
      ['{', 400],
      ['x'.repeat(20001), 413],
    ] as const) {
      const response = await POST(
        new Request('https://portfolio.example/api/contact', { method: 'POST', body })
      )
      expect(response.status).toBe(status)
    }
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accepts exactly 20,000 characters', async () => {
    const body = JSON.stringify(validSubmission)
    const response = await POST(
      new Request('https://portfolio.example/api/contact', {
        method: 'POST',
        body: body + ' '.repeat(20000 - body.length),
      })
    )
    expect(response.status).toBe(200)
  })
})

describe('configuration and delivery', () => {
  it.each(['TURNSTILE_SECRET_KEY', 'RESEND_API_KEY', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL'])(
    'requires %s',
    async (key) => {
      vi.stubEnv(key, '')
      expect((await submit()).status).toBe(503)
      expect(fetchMock).not.toHaveBeenCalled()
    }
  )

  it('verifies before delivery and trims only the email payload', async () => {
    await submit()
    const [verificationUrl, verification] = fetchMock.mock.calls[0]
    expect(verificationUrl).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify')
    expect(JSON.parse(verification!.body as string)).toEqual({
      secret: 'synthetic-secret',
      response: validSubmission.token,
    })
    const [deliveryUrl, delivery] = fetchMock.mock.calls[1]
    expect(deliveryUrl).toBe('https://api.resend.com/emails')
    expect(JSON.parse(delivery!.body as string)).toEqual({
      from: 'sender@example.com',
      to: ['delivered@resend.dev'],
      reply_to: validSubmission.email,
      subject: 'Portfolio contact from Test Visitor',
      text: 'Name: Test Visitor\nEmail: visitor@example.com\n\nA synthetic test message.',
    })
    expect(verification!.signal).toBeInstanceOf(AbortSignal)
    expect(delivery!.signal).toBeInstanceOf(AbortSignal)
  })

  it.each([
    [
      401,
      { name: 'invalid_api_key', message: 'API key is invalid' },
      503,
      'Resend API key is invalid.',
    ],
    [
      403,
      { name: 'validation_error', message: 'Domain not verified' },
      503,
      'Resend sender domain is not verified.',
    ],
    [
      422,
      { name: 'validation_error', message: 'testing emails' },
      503,
      'Resend test sender can only deliver',
    ],
    [429, { name: 'rate_limit_exceeded' }, 502, 'HTTP 429, rate_limit_exceeded'],
    [500, { name: 'unsafe-name!', message: 'unknown' }, 502, 'HTTP 500, unknown'],
  ])('maps Resend %i errors', async (providerStatus, body, status, detail) => {
    fetchMock
      .mockReset()
      .mockResolvedValueOnce(Response.json(verified))
      .mockResolvedValueOnce(Response.json(body, { status: providerStatus }))
    const response = await submit()
    expect(response.status).toBe(status)
    expect((await response.json()).details).toContain(detail)
  })

  it('handles non-JSON delivery errors', async () => {
    fetchMock
      .mockReset()
      .mockResolvedValueOnce(Response.json(verified))
      .mockResolvedValueOnce(new Response('unavailable', { status: 500 }))
    expect((await submit()).status).toBe(502)
  })

  it.each(['development', 'production'])(
    'exposes diagnostic details only in development (%s)',
    async (environment) => {
      vi.stubEnv('NODE_ENV', environment)
      fetchMock.mockReset().mockResolvedValueOnce(Response.json({ success: false }))
      const body = await (await submit()).json()
      expect('details' in body).toBe(environment === 'development')
    }
  )

  it.each(['turnstile', 'resend'])('handles %s connection failures and timeouts', async (stage) => {
    fetchMock.mockReset()
    if (stage === 'resend') fetchMock.mockResolvedValueOnce(Response.json(verified))
    fetchMock.mockRejectedValueOnce(new DOMException('Timed out', 'TimeoutError'))
    const response = await submit()
    expect(response.status).toBe(502)
    expect((await response.json()).error).toBe(
      stage === 'turnstile'
        ? 'Verification is unavailable. Please try again.'
        : 'Could not send your message. Please try again later.'
    )
    expect(console.error).toHaveBeenCalledWith('Contact provider connection failed', {
      stage,
      errorType: 'TimeoutError',
    })
  })
})

describe('Turnstile safeguards', () => {
  it.each([
    [{ success: false }, 'Verification failed. Please submit again.'],
    [
      { success: false, 'error-codes': ['timeout-or-duplicate', 'unsafe!'] },
      'Verification expired or was already used. Please submit again.',
    ],
    [{ ...verified, action: 'other' }, 'Verification failed. Please submit again.'],
    [{ ...verified, hostname: 'other.example' }, 'Verification failed. Please submit again.'],
    [
      { ...verified, action: 'other', metadata: { result_with_testing_key: true } },
      'Verification failed. Please submit again.',
    ],
    [
      { ...verified, hostname: 'other.example', metadata: { result_with_testing_key: true } },
      'Verification failed. Please submit again.',
    ],
  ])('rejects invalid verification %j', async (result, error) => {
    fetchMock.mockReset().mockResolvedValueOnce(Response.json(result))
    const response = await submit()
    expect(response.status).toBe(400)
    expect((await response.json()).error).toBe(error)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('handles verification HTTP errors', async () => {
    fetchMock.mockReset().mockResolvedValueOnce(new Response('', { status: 503 }))
    expect((await submit()).status).toBe(502)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('allows an unconfigured hostname with a valid action', async () => {
    vi.stubEnv('TURNSTILE_EXPECTED_HOSTNAME', '')
    fetchMock
      .mockReset()
      .mockResolvedValueOnce(Response.json({ success: true, action: 'contact' }))
      .mockResolvedValueOnce(Response.json({ id: 'test' }))
    expect((await submit()).status).toBe(200)
  })

  it.each([
    '1x0000000000000000000000000000000AA',
    '2x0000000000000000000000000000000AA',
    '3x0000000000000000000000000000000AA',
  ])('restricts dummy secret %s to development', async (secret) => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', secret)
    vi.stubEnv('NODE_ENV', 'production')
    expect((await submit()).status).toBe(503)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    [{ success: true, metadata: { result_with_testing_key: true } }, 200],
    [{ success: false, metadata: { result_with_testing_key: true } }, 400],
    [{ success: true, action: 'test', hostname: 'portfolio.example' }, 200],
    [{ success: true, action: 'contact', hostname: 'portfolio.example' }, 400],
    [{ success: true, action: 'test', hostname: 'other.example' }, 400],
  ])('preserves dummy-key verification rules %j', async (result, status) => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA')
    fetchMock
      .mockReset()
      .mockResolvedValueOnce(Response.json(result))
      .mockResolvedValueOnce(Response.json({ id: 'test' }))
    expect((await submit()).status).toBe(status)
  })
})
