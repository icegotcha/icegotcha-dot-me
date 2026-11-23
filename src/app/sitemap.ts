import type { MetadataRoute } from 'next'
import { WORKS } from '@/content/works'
import { SITE_URL } from '@/lib/site'

const STATIC_PATHS = ['/', '/story', '/gallery'] as const

// lastModified is omitted until content carries real dates; a build-time
// timestamp on every URL teaches crawlers to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...WORKS.map((work) => `/work/${work.slug}`)]
  return paths.map((path) => ({ url: new URL(path, SITE_URL).toString() }))
}
