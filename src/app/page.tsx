import Image from 'next/image'
import { GitHub, Linkedin, Globe, File } from 'react-feather'
import Container from '../components/Container'
import SocialButton from '../components/SocialButton'
import Typewriter from '../components/Typewriter'

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
    name: 'Linkedin',
    link: 'https://www.linkedin.com/in/kotchakornw/',
    icon: <Linkedin size={ICON_SIZE} />,
  },
]

const HomePage = () => {
  return (
    <div>
      <Container>
        <Image
          src='/images/owner.jpg'
          width={128}
          height={175}
          alt='Avatar'
          className='rounded-full h-32 w-32 object-cover object-[50%_80%] mb-4 border-dashed border-white border-2'
        />
        <p className='text-4xl md:text-6xl font-bold p-4'>
          Hi! this is <Typewriter text="Icegotcha" className="text-purple-800" duration={1800} />.
        </p>
        <p className='text-center text-xl p-4'>
          I&apos;m passionate about learning and exploring new technologies, and
          enjoy sharing my knowledge and experiences with others.
        </p>
        <ul className='list-none mx-auto p-4 flex flex-col sm:flex-row justify-center gap-4'>
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
