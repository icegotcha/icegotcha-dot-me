import type { Metadata } from 'next'
import {  Source_Code_Pro } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: 'Icegotcha.me',
  description: 'Personal website of Icegotcha, a passionate learner and explorer of new technologies.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${sourceCodePro.className} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
