import clawedCharacterColorImage from '@/assets/gallery/clawed-character-color.jpg'
import crownIllustrationImage from '@/assets/gallery/crown-illustration.jpeg'
import darkSideImage from '@/assets/gallery/darksidecolor.gif'
import headphonesDrawingImage from '@/assets/gallery/headphones-drawing.jpeg'
import mermanImage from '@/assets/gallery/merman.jpg'
import sunMaskIllustrationImage from '@/assets/gallery/sun-mask-illustration.jpeg'
import thisHollowWorldImage from '@/assets/gallery/thishollowworld-creepy.jpg'
import fantasyWorldImage from '@/assets/gallery/to-fantasy-world.jpg'
import vampireCharacterIllustrationImage from '@/assets/gallery/vampire-character-illustration.jpeg'
import viperTheVampireImage from '@/assets/gallery/viperthevampire.jpg'
import type { GalleryContent } from '@/types'

export const GALLERY_CONTENT: GalleryContent = {
  metadata: {
    title: 'Drawings & Illustrations',
    description:
      'Browse drawings and illustrations by Icegotcha, from colorful characters to imagined worlds, and discover a lifelong love of making art.',
  },
  images: [
    {
      img: fantasyWorldImage,
      alt: 'Illustration of a person beneath a rainbow with small planets',
    },
    {
      img: mermanImage,
      alt: 'Colored-pencil illustration of a merman among underwater plants',
    },
    {
      img: thisHollowWorldImage,
      alt: 'This Hollow World illustration with a figure surrounded by eerie hands and eyes',
    },
    {
      img: darkSideImage,
      alt: 'Black-and-white character portrait with a red outlined figure against a black background',
    },
    {
      img: clawedCharacterColorImage,
      alt: 'Colored illustration of a character with round ears and a clawed hand',
    },
    {
      img: vampireCharacterIllustrationImage,
      alt: 'Illustration of a red-eyed vampire character surrounded by bats',
    },
    {
      img: viperTheVampireImage,
      alt: 'Cartoon vampire with a cane against a red-and-black skull pattern',
    },
    {
      img: crownIllustrationImage,
      alt: 'Black-and-white illustration of a crowned character wearing ornamental robes',
    },
    {
      img: headphonesDrawingImage,
      alt: 'Colored-pencil drawing of a person wearing headphones among flowers',
    },
    {
      img: sunMaskIllustrationImage,
      alt: 'Illustration of a person with a golden sun-shaped mask above a reflection',
    },
  ],
}
