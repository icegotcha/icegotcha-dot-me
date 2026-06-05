import Image from 'next/image'
import {
  GitHub,
  Linkedin,
  Globe,
  Book,
  Instagram,
  Briefcase,
} from 'react-feather'
import Container from '../components/Container'
import SocialButton from '../components/SocialButton'
import Typewriter from '../components/Typewriter'
import Section from '@/components/Section'
import Title from '@/components/Title'

const ICON_SIZE = 16

const socialLinks = [
  {
    name: 'Resume',
    link: 'resume.icegotcha.me',
    icon: <Briefcase size={ICON_SIZE} />,
  },
  {
    name: 'Linkedin',
    link: 'https://www.linkedin.com/in/kotchakornw/',
    icon: <Linkedin size={ICON_SIZE} />,
  },
  {
    name: 'Github',
    link: 'https://github.com/icegotcha',
    icon: <GitHub size={ICON_SIZE} />,
  },
  {
    name: 'Blog',
    link: 'https://knowlats.dev',
    icon: <Globe size={ICON_SIZE} />,
  },
  {
    name: 'Medium',
    link: 'https://medium.com/@icegotcha',
    icon: <Book size={ICON_SIZE} />,
  },
  {
    name: 'Artwork',
    link: 'https://www.instagram.com/icegotcha_artwork',
    icon: <Instagram size={ICON_SIZE} />,
  },
]

const HomePage = () => {
  return (
    <Container>
      <Section>
        <div className='flex flex-col justify-center items-center text-center text-gray-800'>
          <Image
            src='/images/owner.jpg'
            width={128}
            height={175}
            loading='eager'
            alt='Avatar'
            className='rounded-full h-32 w-32 object-cover object-[50%_80%] mb-4 border-dashed border-white border-2'
          />
          <p className='text-4xl md:text-6xl font-bold p-4'>
            Hi! this is{' '}
            <Typewriter
              text='Icegotcha'
              className='text-purple-800'
              duration={1800}
            />
          </p>
          <p className='text-center text-xl p-4'>
            Software Engineer | Lifelong Learner | Writer at Heart | Crafting
            Ideas into Reality
          </p>
        </div>
      </Section>
      <Title message='about me' />
      <Section>
        <div className='w-full flex flex-col md:flex-row gap-8 justify-center items-center p-8'>
          <div className='shrink-0'>
            <Image
              src='/images/me-full.png'
              width={436}
              height={582}
              loading='eager'
              alt='Avatar'
              className='w-3xs h-auto object-cover rounded-l'
            />
          </div>
          <div className='w-full'>
            <p className='text-lg md:text-xl text-gray-700'>
              My name is Kotchakorn Wongwisutigul (Ice).
              <br />
              <br />
              I'm a software engineer who enjoys turning complex ideas into
              clear solutions through thoughtful design and strong
              documentation. I build both backend and frontend applications, and
              I'm always curious about how things work beneath the surface.
              <br />
              <br />
              Outside of coding, I spend my time studying creativity, drawing,
              writing, and human psychology. I have a deep passion for
              storytelling, character development, and world-building. I believe
              technology and writing share the same purpose: making ideas easier
              for people to understand, use, and connect with.
            </p>
            <ul className='list-none mx-auto py-8 px-4 flex flex-col sm:flex-row flex-wrap justify-center gap-4'>
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <SocialButton {...item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </Container>
  )
}

export default HomePage
