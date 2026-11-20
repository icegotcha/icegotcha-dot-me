import { WorkCategory, WorkStatus } from '@/types'
import type { Work } from '@/types'

export const WORKS: readonly Work[] = [
  {
    slug: 'the-crimson-sanctuary',
    year: '2026 - Present',
    category: WorkCategory.Novel,
    image: {
      src: '/images/portfolio/aaron-burden-y02jEX_B0O0-unsplash.webp',
      alt: 'Concept illustration of a library desk, books, and a brass lamp beside an arched window',
    },
    title: 'The Crimson Sanctuary',
    tags: ['Dark Fantasy', 'Vampire', 'Supernatural'],
    excerpt: 'A boy who discovers a hidden world of vampire and his own dark secrets',
    status: WorkStatus.InProgress,
  },
  {
    slug: 'soulcoach-by-cal',
    year: '2025 - Present',
    category: WorkCategory.Software,
    image: {
      src: '/images/portfolio/soulcoach-by-cal-cover.png',
      alt: 'Soulcoach workshop and community platform illustrated with event booking, membership, payment, and seat selection interfaces',
    },
    title: 'Soulcoach by Cal',
    tags: ['Full-stack', 'Event Booking', 'Community'],
    technologies: [
      'React',
      'TypeScript',
      'Supabase',
      'PostgreSQL',
      'Edge Functions',
      'Stripe',
      'Lovable',
    ],
    excerpt:
      'A full-stack event booking and community management platform for workshops, private sessions, club activities, and memberships.',
    status: WorkStatus.ActiveDevelopment,
    markdownContent: `## Overview

A full-stack event booking and community management platform supporting workshops, private sessions, club activities, and memberships.

## My role

I am responsible for the platform's technical development and maintenance, including booking workflows, seat reservation, payment integration with Stripe and PromptPay, authentication, membership management, and performance optimization.

I designed business-critical workflows for concurrent bookings, payment consistency, referral attribution, financial transactions, and role-based access control.

## AI-assisted development

I leveraged AI-assisted development with Lovable while maintaining responsibility for system design, technical specifications, business logic, testing, and production reliability.

## Key contributions

- Developed and improved event booking and payment workflows.
- Designed seat reservation and concurrency control mechanisms to prevent overbooking.
- Integrated Stripe and PromptPay payment methods.
- Improved authentication and role-based access control.
- Designed referral, commission, and customer credit workflows.
- Reduced the main JavaScript bundle from approximately 1.7 MB to 300 KB through code splitting and dependency optimization.
- Improved website performance through database query analysis, caching, lazy loading, and polling optimization.

## Tech stack

- React
- TypeScript
- Supabase
- PostgreSQL
- Edge Functions
- Stripe
- Lovable
`,
    links: [
      {
        kind: 'link',
        label: 'Visit website',
        href: 'https://soulcoachbycal.com',
      },
    ],
  },
  {
    slug: 'knowlats-dev',
    year: '2023 - Present',
    category: WorkCategory.Software,
    image: {
      src: '/images/portfolio/knowlats-dev-cover-image.webp',
      alt: 'Portfolio and knowledge sharing platform design with blog interface, note-taking tools, and code editor',
    },
    title: 'Knowlats.dev',
    tags: ['Web Development', 'Blog', 'Knowledge'],
    technologies: ['Astro', 'Svelte 5', 'TypeScript', 'Tailwind CSS 4', 'pnpm'],
    excerpt:
      'A personal blog for sharing knowledge, insights, and experiences in software development and related fields.',
    status: WorkStatus.ActiveDevelopment,
    githubReadme: { repository: 'knowlats-dot-dev/website', ref: 'main' },
    links: [
      {
        kind: 'link',
        label: 'Visit the website',
        href: 'http://knowlats.dev',
      },
      {
        kind: 'github',
        label: 'View source on GitHub',
        href: 'https://github.com/knowlats-dot-dev/website',
      },
    ],
  },
  {
    slug: 'movie-ticket-system',
    year: '2026',
    category: WorkCategory.Software,
    image: {
      src: '/images/portfolio/movie-ticket-system-website-cover.webp',
      alt: 'Website cover for the movie ticket system project',
    },
    title: 'Movie Ticket System',
    githubReadme: { repository: 'icegotcha/cinema-ticket-booking-system', ref: 'main' },
    links: [
      {
        kind: 'github',
        label: 'View source on GitHub',
        href: 'https://github.com/icegotcha/cinema-ticket-booking-system',
      },
    ],
    tags: ['Web Development', 'Frontend', 'Backend'],
    technologies: ['Go', 'Gin', 'MongoDB', 'Redis', 'RabbitMQ', 'Vue 3', 'Firebase Auth', 'Docker'],
    excerpt:
      'A demo project for a movie ticket booking system, showcasing the user interface and booking flow.',
    status: WorkStatus.Released,
    gallery: [
      {
        src: '/images/works/cinema-ticket-booking-system-1.webp',
        caption: 'First page of the cinema ticket booking system contains the list of movies',
        alt: 'First page of the cinema ticket booking system contains the list of movies',
      },
      {
        src: '/images/works/cinema-ticket-booking-system-2.webp',
        caption:
          'This page shows available showtimes for this movie, allowing users to select a showtime.',
        alt: 'This page shows available showtimes for this movie, allowing users to select a showtime.',
      },
      {
        src: '/images/works/cinema-ticket-booking-system-3.webp',
        caption: 'Seating selection page where users choose their seats for the selected showtime.',
        alt: 'Seating selection page where users choose their seats for the selected showtime.',
      },
      {
        src: '/images/works/cinema-ticket-booking-system-4.webp',
        caption: 'login modal page for user authentication',
        alt: 'login modal page for user authentication',
      },
      {
        src: '/images/works/cinema-ticket-booking-system-5.webp',
        caption: 'Admin dashboard for viewing and managing movies, showtimes, and bookings',
        alt: 'Admin dashboard for viewing and managing movies, showtimes, and bookings',
      },
    ],
  },

  {
    slug: 'bitkubblockchain',
    year: '2025',
    category: WorkCategory.Software,
    image: {
      src: '/images/portfolio/bitkub-blockchain-cover-image.webp',
      alt: 'Blockchain security and transaction platform design with cryptocurrency wallet, database, and task management interface',
    },
    title: 'Bitkubblockchain.com',
    tags: ['Web Development', 'Frontend'],
    technologies: ['React', 'Next.js 16', 'CSS animations', 'Swiper.js', 'React Hook Form', 'Zod'],
    excerpt: 'A corporate website for Bitkub Blockchain, showcasing their services and projects.',
    markdownContent: `## Overview

I developed a responsive corporate website for Bitkub Blockchain using React and Next.js 16, adapting the layout for desktop, tablet, and mobile screens.

## My contributions

- Built responsive layouts across the website.
- Used CSS animations to bring objects in the hero section to life and fade sections into view as they become visible.
- Integrated Swiper.js to create swipeable, scrollable content.
- Built the contact form with React Hook Form and Zod for form handling and validation.

## Tech stack

- React
- Next.js 16
- CSS animations
- Swiper.js
- React Hook Form
- Zod
`,
    status: WorkStatus.Released,
    links: [
      {
        label: 'Visit website',
        href: 'https://bitkubblockchain.com',
      },
    ],
  },
]
