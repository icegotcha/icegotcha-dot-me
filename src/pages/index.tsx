import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { GitHub, Twitter, Linkedin, Globe } from 'react-feather'
import Container from '../components/Container'
import SocialButton from '../components/SocialButton'

const ICON_SIZE = 16

const socialLinks = [
  {
    name: 'Blog',
    link: 'https://knowlats.dev',
    icon: <Globe size={ICON_SIZE} />,
  },
  {
    name: 'Github',
    link: 'https://github.com/icegotcha',
    icon: <GitHub size={ICON_SIZE} />,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/icegotcha_dev',
    icon: <Twitter size={ICON_SIZE} />,
  },
  {
    name: 'Linkedin',
    link: 'https://www.linkedin.com/in/kotchakornw/',
    icon: <Linkedin size={ICON_SIZE} />,
  },
]

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Icegotcha.me</title>
      </Head>
      <Container>
        <Image
          src='/images/owner.jpg'
          width={128}
          height={128}
          alt='Avatar'
          className='rounded-full h-32 w-32 mb-4 border-dashed border-white border-2'
        />
        <p className='text-4xl md:text-6xl font-bold p-4'>
          Hi! this is <span className='text-purple-800'>Icegotcha</span>.
        </p>
        <p className='text-center text-xl p-4'>
          I&apos;m passionate about learning and exploring new technologies, and
          enjoy sharing my knowledge and experiences with others.
        </p>
        <ul className='list-disc list-none mx-auto p-4 flex flex-col sm:flex-row justify-center gap-4'>
          {socialLinks.map((item, index) => (
            <li key={index}>
              <SocialButton {...item} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

export default HomePage
