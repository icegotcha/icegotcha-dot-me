import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'

import { WORKS } from '@/content/works'
import { WorkCategory } from '@/types'
import WorksSection from '.'

const meta = {
  title: 'Organisms/WorksSection',
  component: WorksSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WorksSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FilterProjects: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getAllByRole('article')).toHaveLength(WORKS.length)
    for (const filter of ['Software', 'Writing', 'Art & experiments'] as const) {
      const button = canvas.getByRole('button', { name: filter })
      await userEvent.click(button)
      await expect(button).toHaveAttribute('aria-pressed', 'true')
      const categories = {
        Software: [WorkCategory.Software, WorkCategory.BrowserGame],
        Writing: [WorkCategory.Novel],
        'Art & experiments': [WorkCategory.AIExperiment, WorkCategory.IllustrationSeries],
      }
      const expectedWorks = WORKS.filter((work) => categories[filter].includes(work.category))
      await expect(canvas.queryAllByRole('article')).toHaveLength(expectedWorks.length)
      for (const work of WORKS) {
        const heading = canvas.queryByRole('heading', { name: work.title })
        if (expectedWorks.includes(work)) {
          await expect(heading).toBeVisible()
        } else {
          await expect(heading).not.toBeInTheDocument()
        }
      }
      if (expectedWorks.length === 0) {
        await expect(canvas.getByRole('heading', { name: 'Coming Soon' })).toBeVisible()
      } else {
        await expect(canvas.queryByRole('heading', { name: 'Coming Soon' })).not.toBeInTheDocument()
      }
    }
    await userEvent.click(canvas.getByRole('button', { name: 'All' }))
    await expect(canvas.getAllByRole('article')).toHaveLength(WORKS.length)
    await expect(canvas.queryByRole('heading', { name: 'Coming Soon' })).not.toBeInTheDocument()
  },
}
