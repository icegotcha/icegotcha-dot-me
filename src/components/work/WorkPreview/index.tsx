import type { ComponentType, ReactElement } from 'react'
import BitkubBlockchainPreview from '@/components/work/BitkubBlockchain'

const WORK_PREVIEWS: Record<string, ComponentType | undefined> = {
  bitkubblockchain: BitkubBlockchainPreview,
}

interface WorkPreviewProps {
  slug: string
}

export default function WorkPreview({ slug }: WorkPreviewProps): ReactElement | null {
  const Preview = WORK_PREVIEWS[slug]
  if (!Preview) return null
  return <Preview />
}
