export const MAGIC_DRAWINGS = [
  {
    name: 'Bunny',
    paths: [
      'M31 49 C17 15 34 8 39 42 M47 41 C48 9 65 15 57 48',
      'M31 47 C12 57 20 82 44 83 C70 85 80 60 57 47 C49 42 39 42 31 47Z',
      'M33 61 l1 2 M54 61 l1 2 M41 68 q3 4 6 0 M44 71 v4 m-6 0 q6 6 12 0',
      'M23 69 l-7 -2 m8 8 l-8 1 M63 69 l7 -2 m-8 8 l8 1',
    ],
  },
  {
    name: 'Twinkling star',
    paths: [
      'M48 18 Q51 44 77 48 Q52 52 48 79 Q44 52 18 48 Q43 44 48 18Z',
      'M76 14 v14 m-7 -7 h14 M20 73 v12 m-6 -6 h12',
      'M43 46 l1 1 M54 46 l1 1 M44 56 q5 4 10 0',
    ],
  },
  {
    name: 'Crescent moon',
    paths: [
      'M61 16 C23 10 9 55 34 77 C53 94 78 81 85 61 C54 76 32 40 61 16Z',
      'M66 28 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2Z',
      'M45 62 q4 4 8 0 M58 67 q4 3 7 -1',
    ],
  },
  {
    name: 'Small flower',
    paths: [
      'M49 39 C27 18 46 6 51 27 C61 6 80 22 62 36 C87 32 85 55 64 49 C80 70 56 78 51 56 C44 80 23 66 38 50 C15 55 15 32 38 37Z',
      'M45 44 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0',
      'M51 59 Q55 77 47 88 M52 76 Q29 76 32 64 Q48 63 52 76 M52 82 Q70 80 71 69 Q56 68 52 82',
    ],
  },
  {
    name: 'Butterfly',
    paths: [
      'M48 47 C22 0 4 29 24 53 C3 73 34 92 48 57',
      'M52 47 C78 0 96 29 76 53 C97 73 66 92 52 57',
      'M50 40 Q45 55 50 73 Q55 55 50 40 M48 42 Q44 28 39 29 M52 42 Q56 28 61 29',
      'M24 33 Q31 29 38 43 M23 68 Q29 73 37 64 M76 33 Q69 29 62 43 M77 68 Q71 73 63 64',
    ],
  },
  {
    name: 'Heart',
    paths: [
      'M50 79 C40 70 12 52 17 32 C22 12 43 19 50 33 C57 19 78 12 83 32 C88 52 60 70 50 79Z',
      'M26 37 Q26 29 34 28 M69 59 l-8 8',
      'M13 68 l-3 6 m75 -55 l4 -5',
    ],
  },
  {
    name: 'Dream cloud',
    paths: [
      'M24 64 C4 64 8 40 26 43 C22 19 56 15 60 37 C78 23 95 44 80 53 C99 70 67 76 24 64Z',
      'M33 51 q4 5 8 0 M53 52 q4 5 8 0 M42 61 q5 4 10 0',
      'M35 78 l-3 6 M57 80 l-2 7 M77 76 l-2 5',
    ],
  },
  {
    name: 'Shooting star',
    paths: [
      'M66 18 l6 14 15 2 -11 10 3 15 -13 -8 -13 8 3 -15 -11 -10 15 -2Z',
      'M49 49 Q29 55 15 79 M53 59 Q39 66 31 83 M39 47 Q23 50 13 61',
      'M23 24 v10 m-5 -5 h10',
    ],
  },
] as const

/** Uniform selection among every motif except the last one. */
export function nextDrawingIndex(previous: number | null, random: number): number {
  const count = MAGIC_DRAWINGS.length
  if (previous === null) return Math.floor(random * count)
  const candidate = Math.floor(random * (count - 1))
  return candidate >= previous ? candidate + 1 : candidate
}

export const MAGIC_DRAWING_DURATION_MS = 4000
