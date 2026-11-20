import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StoryChapter from '.'
import { STORY_CONTENT } from '@/content/story'

const meta = {
  title: 'Molecules/StoryChapter',
  component: StoryChapter,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StoryChapter>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { chapter: STORY_CONTENT.chapters[0] } }

export const LongChapter: Story = {
  args: { chapter: STORY_CONTENT.chapters[1] },
}
