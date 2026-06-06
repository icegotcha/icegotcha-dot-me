import {
  GitHub,
  Linkedin,
  Globe,
  Book,
  Instagram,
  Briefcase,
} from 'react-feather'

const ICON_SIZE = 16

export const SOCIAL_LINKS = [
  {
    name: 'Resume',
    link: 'https://resume.icegotcha.me',
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
