'use client'

import Button from '@/components/atoms/Button'

import Script from 'next/script'
import { useEffect, useRef, useState, type FormEvent, type ReactElement } from 'react'
import { MONO } from '@/lib/fonts'
import type { ContactSubmission } from '@/app/api/contact/schema'

type SubmissionState = { phase: 'idle' | 'verifying' | 'sending'; message: string }

type ContactMessage = Omit<ContactSubmission, 'token'>
type Turnstile = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string
  execute: (id: string) => void
  remove: (id: string) => void
}

function turnstile(): Turnstile | undefined {
  return (window as Window & { turnstile?: Turnstile }).turnstile
}

const fieldClass =
  'w-full rounded-lg border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.10)] px-4 py-3 text-[#FBF9FF] placeholder:text-[rgba(251,249,255,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD03A]'

export default function ContactForm(): ReactElement {
  const form = useRef<HTMLFormElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<string | null>(null)
  const pending = useRef<ContactMessage | null>(null)
  const [started, setStarted] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [submission, setSubmission] = useState<SubmissionState>({ phase: 'idle', message: '' })
  const busy = submission.phase !== 'idle'
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  function cleanup(): void {
    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = null
    if (widget.current !== null) turnstile()?.remove(widget.current)
    widget.current = null
  }

  useEffect(() => cleanup, [])

  function finish(message: string): void {
    pending.current = null
    cleanup()
    setSubmission({ phase: 'idle', message })
  }

  async function send(token: string): Promise<void> {
    if (!pending.current) return
    const message = pending.current
    pending.current = null
    setSubmission({ phase: 'sending', message: 'Sending your message…' })
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...message, token }),
        signal: AbortSignal.timeout(30000),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok) {
        const explanation = result?.error || 'Could not send your message. Please try again.'
        throw new Error(
          `Error ${response.status}: ${explanation}${result?.details ? ` ${result.details}` : ''}`
        )
      }
      form.current?.reset()
      finish('Thanks! Your message has been sent.')
    } catch (error) {
      finish(
        error instanceof Error ? error.message : 'Could not send your message. Please try again.'
      )
    }
  }

  function verify(): void {
    const api = turnstile()
    if (!api || !container.current || !pending.current || widget.current !== null) return
    try {
      widget.current = api.render(container.current, {
        sitekey: siteKey,
        action: 'contact',
        execution: 'execute',
        appearance: 'execute',
        theme: 'dark',
        size: 'flexible',
        'response-field': false,
        callback: (token: string) => void send(token),
        'error-callback': () => {
          finish('Verification failed. Please try again.')
          return true
        },
        'expired-callback': () => finish('Verification expired. Please submit again.'),
        'timeout-callback': () => finish('Verification timed out. Please try again.'),
      })
      api.execute(widget.current)
    } catch {
      finish('Could not start verification. Please try again.')
    }
  }

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (busy || pending.current) return
    if (!siteKey) {
      finish('The contact form is currently unavailable. Please try again later.')
      return
    }
    const data = new FormData(event.currentTarget)
    pending.current = {
      name: String(data.get('name')).trim(),
      email: String(data.get('email')).trim(),
      message: String(data.get('message')).trim(),
    }
    setSubmission({ phase: 'verifying', message: 'Verifying your submission…' })
    timer.current = setTimeout(() => {
      if (pending.current) finish('Verification timed out. Please try again.')
    }, 90000)
    setStarted(true)
    verify()
  }

  return (
    <form
      data-contact-form
      ref={form}
      onSubmit={submit}
      className="min-w-0 space-y-5 text-sm"
      style={MONO}
    >
      <fieldset disabled={busy} className="space-y-5 disabled:opacity-70">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block space-y-2 text-[#FBF9FF]">
            <span>Your name</span>
            <input
              className={fieldClass}
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="What should I call you?"
            />
          </label>
          <label className="block space-y-2 text-[#FBF9FF]">
            <span>Email address</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label className="block space-y-2 text-[#FBF9FF]">
          <span>Your message</span>
          <textarea
            className={`${fieldClass} min-h-36 resize-y`}
            name="message"
            required
            maxLength={5000}
            rows={5}
            placeholder="Tell me about your idea…"
          />
        </label>
      </fieldset>
      <div ref={container} />
      {started && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          onReady={verify}
          onError={() =>
            finish('Could not load verification. Please check your connection and try again.')
          }
        />
      )}
      <Button
        variant="plain"
        type="submit"
        disabled={busy}
        className="min-h-12 rounded-lg bg-[#FFD03A] px-6 py-3 text-[#30234F] transition-colors hover:bg-[#FFE078] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD03A] disabled:cursor-wait disabled:opacity-70"
      >
        {busy ? 'Please wait…' : 'Send message ↗'}
      </Button>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="min-h-5 text-[rgba(251,249,255,0.76)]"
      >
        {submission.message}
      </p>
    </form>
  )
}
