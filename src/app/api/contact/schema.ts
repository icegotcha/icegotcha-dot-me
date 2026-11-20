import { z } from 'zod'

const NAME_ERROR = 'Enter a name between 1 and 100 characters, without line breaks.'
const EMAIL_ERROR = 'Enter a valid email address.'
const MESSAGE_ERROR = 'Enter a message between 1 and 5,000 characters.'
const TOKEN_ERROR = 'Verification is missing or invalid. Please submit again.'

// Validate the original values; trimming happens only when composing the email.
export const contactSubmissionSchema = z.object({
  name: z
    .string({ error: NAME_ERROR })
    .refine((value) => Boolean(value.trim()) && value.length <= 100 && !/[\r\n]/.test(value), {
      error: NAME_ERROR,
    }),
  email: z
    .string({ error: EMAIL_ERROR })
    .refine((value) => value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      error: EMAIL_ERROR,
    }),
  message: z
    .string({ error: MESSAGE_ERROR })
    .refine((value) => Boolean(value.trim()) && value.length <= 5000, { error: MESSAGE_ERROR }),
  token: z
    .string({ error: TOKEN_ERROR })
    .refine((value) => Boolean(value) && value.length <= 2048, { error: TOKEN_ERROR }),
})

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>
