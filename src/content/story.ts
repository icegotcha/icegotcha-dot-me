import childhoodComputerRoomImage from '@/assets/story/childhood-computer-room.jpeg'
import kmutnbDepartmentPortraitImage from '@/assets/story/kmutnb-department-portrait.jpg'
import vintagePosterWallPortraitImage from '@/assets/story/vintage-poster-wall-portrait.jpeg'
import type { StoryContent, StoryIntroduction } from '@/types'

export const STORY_INTRODUCTION: StoryIntroduction = {
  title: 'The Story Behind the Code',
  description: `From making my first website at seven to working as a software engineer, curiosity has shaped the way I build.

Along the way, drawing, writing, and imagined worlds have become part of my story, too.`,
}

export const STORY_CONTENT: StoryContent = {
  metadata: {
    title: 'The Story Behind the Code',
    description:
      'Get to know Icegotcha, from building a first website at seven to a career in software development, with writing and illustration woven into the journey.',
  },
  hero: {
    eyebrow: 'A LITTLE ABOUT ME',
    title: STORY_INTRODUCTION.title,
    description:
      "I'm Ice, a software developer who loves building digital experiences and exploring imaginative worlds.",
    scrollLabel: 'Begin the story',
  },
  chapters: [
    {
      id: 'the-developer',
      heading: 'Chapter 01 - Where It All Began',
      image: {
        img: childhoodComputerRoomImage,
        alt: 'A childhood photo in a computer room with desktop PCs and CRT monitors',
      },
      paragraph: `I grew up in Bangkok, Thailand, with cerebral palsy, which affects my movement and speech. Some everyday things took a little more time and effort, and putting my thoughts into words wasn't always easy. But drawing, writing, and using computers gave me different ways to express myself. My childhood was full of books, cartoons, and PC games, with art and computers always holding a special place. 
      
      My first computer ran Windows 95, and I loved trying things out, even when they didn't go as planned. Once, I ended up reinstalling Windows, switching from 2000 to XP simply because I thought it looked prettier. It was a small adventure, but it made me want to learn even more.

At seven, I made my first website with Microsoft FrontPage, sharing stories about myself and simple tutorials for Word and PowerPoint. Later, I started using Dreamweaver, drawing and editing images in Photoshop, and making small programs with Visual Basic. There was something special about seeing an idea turn into something I could actually use. 

What began as a childhood hobby slowly grew into a love for building things with technology. Even today, that same excitement is still part of what I do.`,
    },
    {
      id: 'the-curious-mind',
      heading: 'Chapter 02 - From Curiosity to Craft',
      image: {
        img: kmutnbDepartmentPortraitImage,
        alt: 'Sitting in front of the Department of Computer and Information Science sign at KMUTNB',
      },
      paragraph: `As I grew older, my curiosity about computers became something I wanted to pursue more seriously.

I studied Computer Science at King Mongkut's University of Technology North Bangkok (KMUTNB), where I developed a deeper understanding of programming and software development. From building a simple calculator with Visual Basic to creating an income and expense tracking program in C, I enjoyed the process of solving problems and turning ideas into working applications.

After graduation, I stepped into the professional world as a software engineer. Over the past eight years, I've contributed to real-world products, worked alongside different teams, and gained a broader perspective on what makes software effective. I've come to appreciate not only the technical challenges but also the importance of understanding requirements, making thoughtful decisions, and building solutions that serve a purpose.

Along the way, I've learned that good software isn't just about how it works, but how well it works for the people who use it.`,
    },
    {
      id: 'beyond-the-code',
      heading: 'Chapter 03 - Beyond the Code',
      image: {
        img: vintagePosterWallPortraitImage,
        alt: 'Standing in front of a wall covered with vintage posters',
      },
      paragraph: `Beyond the screen, I'm learning to tell stories and bring imagined worlds to life through words and illustrations.

Creative writing, illustration, and worldbuilding are paths I'm actively exploring. I'm still practicing and finding my own creative voice, one story and one drawing at a time.`,
    },
  ],
  principlesHeading: 'How I Work',
  principles: [
    { title: 'Curiosity', description: 'Exploring possibilities and asking thoughtful questions.' },
    {
      title: 'Thoughtful Engineering',
      description: 'Building maintainable solutions with attention to detail.',
    },
    {
      title: 'Continuous Learning',
      description: 'Growing through experimentation and experience.',
    },
    { title: 'Creativity', description: 'Bringing imagination into problem-solving.' },
  ],
  professionalExperience: {
    heading: 'Professional Experience',
    roles: [
      {
        company: 'Bitkub Blockchain Technology Co.,Ltd.',
        title: 'Senior Frontend Developer',
        period: '2022-2026',
        description:
          'Led frontend delivery across corporate websites, customer-facing products, and internal systems. Guided junior developers, established reusable UI foundations, and improved workflows, authentication, and development environments.',
      },
      {
        company: 'Enter Corporation Co.,Ltd.',
        title: 'Senior Software Engineer',
        period: '2021-2022',
        description:
          'Designed and maintained backend microservices for an EV charging platform, covering authentication and event-driven communication. Helped strengthen engineering practices through security research, testing tools, and standardized API documentation.',
      },
      {
        company: 'Enter Corporation Co.,Ltd.',
        title: 'Software Engineer',
        period: '2018-2021',
        description:
          'Developed backend services, blockchain integrations, and smart contracts for proof-of-concept platforms and certification services. Worked across application development, databases, testing, and contract deployment, with additional contributions to a client website.',
      },
    ],
  },
  closing: {
    heading: 'Want to know more about my work?',
    description:
      "Explore the projects I've built or take a closer look at my professional experience.",
    workLabel: 'Explore My Work',
    resumeLabel: 'View Resume',
  },
  aboutLinkLabel: 'Read My Story',
}
