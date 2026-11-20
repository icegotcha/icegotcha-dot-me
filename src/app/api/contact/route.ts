import { contactSubmissionSchema } from './schema'

function failure(error: string, status: number, details?: string): Response {
  return Response.json(
    { error, status, ...(process.env.NODE_ENV === 'development' && details ? { details } : {}) },
    { status }
  )
}

function getVerificationFailureReason(
  success: boolean,
  action: unknown,
  expectedAction: string,
  codes: string
): string {
  if (!success) return `Turnstile rejected the token${codes ? `: ${codes}` : '.'}`
  if (action !== expectedAction) return `Turnstile action does not match ${expectedAction}.`
  return 'Turnstile hostname does not match TURNSTILE_EXPECTED_HOSTNAME.'
}

function getDeliveryFailureReason(message: string, errorType: string, status: number): string {
  if (message.includes('api key is invalid') || errorType === 'invalid_api_key') {
    return 'Resend API key is invalid. Update RESEND_API_KEY and restart the dev server.'
  }
  if (message.includes('not verified')) {
    return 'Resend sender domain is not verified. Verify the domain used by CONTACT_FROM_EMAIL.'
  }
  if (message.includes('testing emails')) {
    return 'Resend test sender can only deliver to your account email. Update CONTACT_TO_EMAIL or use a verified sender domain.'
  }
  return `Resend rejected delivery: HTTP ${status}, ${errorType}. Check the Resend dashboard.`
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    const text = await request.text()
    if (text.length > 20000) return failure('Your message is too long.', 413)
    body = JSON.parse(text)
  } catch {
    return failure('Invalid submission.', 400)
  }
  if (!body || typeof body !== 'object') return failure('Invalid submission.', 400)
  // Arrays previously reached the first field check and reported an invalid name.
  const submission = contactSubmissionSchema.safeParse(Array.isArray(body) ? {} : body)
  if (!submission.success) return failure(submission.error.issues[0].message, 400)
  const { name, email, message, token } = submission.data

  const secret = process.env.TURNSTILE_SECRET_KEY
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!secret || !apiKey || !from || !to) {
    return failure('The contact form is currently unavailable. Please try again later.', 503)
  }

  const testSecret = [
    '1x0000000000000000000000000000000AA',
    '2x0000000000000000000000000000000AA',
    '3x0000000000000000000000000000000AA',
  ].includes(secret)
  if (testSecret && process.env.NODE_ENV !== 'development') {
    return failure('The contact form is currently unavailable. Please try again later.', 503)
  }
  // Cloudflare test keys return a fixed action rather than the widget's configured action.
  const expectedAction = testSecret ? 'test' : 'contact'

  let stage = 'turnstile'
  try {
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      signal: AbortSignal.timeout(10000),
    })
    if (!verification.ok) {
      console.error('Contact Turnstile request failed', { status: verification.status })
      return failure('Verification is unavailable. Please try again.', 502)
    }
    const result = await verification.json()
    // Test responses may omit action and use a synthetic hostname.
    // Trust this marker only with an allowlisted dummy secret in development.
    const testingResponse = testSecret && result.metadata?.result_with_testing_key === true
    if (
      !result.success ||
      (!testingResponse && result.action !== expectedAction) ||
      (!testingResponse &&
        process.env.TURNSTILE_EXPECTED_HOSTNAME &&
        result.hostname !== process.env.TURNSTILE_EXPECTED_HOSTNAME)
    ) {
      const codes = Array.isArray(result['error-codes'])
        ? result['error-codes']
            .filter((code: unknown) => typeof code === 'string' && /^[a-z-]+$/.test(code))
            .join(', ')
        : ''
      const reason = getVerificationFailureReason(
        Boolean(result.success),
        result.action,
        expectedAction,
        codes
      )
      return failure(
        codes.includes('timeout-or-duplicate')
          ? 'Verification expired or was already used. Please submit again.'
          : 'Verification failed. Please submit again.',
        400,
        reason
      )
    }
    stage = 'resend'
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email.trim(),
        subject: `Portfolio contact from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!delivery.ok) {
      const providerError = await delivery.json().catch(() => null)
      const errorType =
        typeof providerError?.name === 'string' && /^[a-z_]+$/.test(providerError.name)
          ? providerError.name
          : 'unknown'
      console.error('Contact Resend request failed', { status: delivery.status, errorType })
      const providerMessage =
        typeof providerError?.message === 'string' ? providerError.message.toLowerCase() : ''
      const reason = getDeliveryFailureReason(providerMessage, errorType, delivery.status)
      if (delivery.status === 401 || delivery.status === 403 || errorType === 'validation_error') {
        return failure(
          'Email delivery is not configured correctly. Please try again later.',
          503,
          reason
        )
      }
      return failure('Could not send your message. Please try again later.', 502, reason)
    }
    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact provider connection failed', {
      stage,
      errorType: error instanceof Error ? error.name : 'unknown',
    })
    return failure(
      stage === 'turnstile'
        ? 'Verification is unavailable. Please try again.'
        : 'Could not send your message. Please try again later.',
      502
    )
  }
}
