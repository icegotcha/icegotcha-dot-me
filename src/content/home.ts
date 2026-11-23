import type { HeroContent } from '@/types'
import type { TechExpertise, TechSkill } from '@/types'
import {
  siGithub,
  siNextdotjs,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
} from 'simple-icons'

export const HERO_CONTENT: HeroContent = {
  headlineLines: ['Hi, I’m', 'I build digital experiences,', 'and worlds beyond the screen.'],
  highlightWord: 'Icegotcha.',
  description:
    'A software developer, growing as a writer and illustrator, building thoughtful digital experiences at the intersection of code, story, and image.',
}

export const HERO_BROWSER_CONTENT = {
  address: 'example.com',
  label: 'Illustrative website mockup in a browser',
}

export const HERO_SCREEN_IMAGE = {
  src: '/images/hero/screen-wallpaper.webp',
  alt: 'Hand-drawn brown-haired faces on a peach background',
} as const

export const HERO_CODE_CONTENT = {
  filename: 'index.html',
  lines: [
    '<!doctype html>',
    '<html lang="en">',
    '  <body>',
    '    <main>...</main>',
    '  </body>',
    '</html>',
  ],
}

export const TECH_SKILLS: readonly TechSkill[] = [
  { name: 'React', icon: siReact.path },
  { name: 'TypeScript', icon: siTypescript.path },
  { name: 'Next.js', icon: siNextdotjs.path },
  { name: 'Supabase', icon: siSupabase.path },
  { name: 'Tailwind CSS', icon: siTailwindcss.path },
  { name: 'Git & GitHub', icon: siGithub.path },
]

export const TECH_EXPERTISE = [
  { title: 'React & Next.js', description: 'Building scalable, interactive web applications' },
  { title: 'TypeScript', description: 'Writing maintainable, type-safe code' },
  { title: 'State Management', description: 'Managing complex application states with Redux' },
  { title: 'API Integration', description: 'Integrating REST and GraphQL APIs' },
  { title: 'UI Engineering', description: 'Creating responsive, reusable UI components' },
  { title: 'Backend Development', description: 'Building APIs and server-side applications' },
] as const satisfies readonly TechExpertise[]
