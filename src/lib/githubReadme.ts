import type { GitHubReadmeSource } from '@/types'
import { GITHUB_README_ALLOWED_OWNERS } from '../config/github-readme'

const MAX_README_BYTES = 1024 * 1024

function isSafePath(value: string): boolean {
  return (
    value.length > 0 &&
    !/[\\\x00-\x20\x7f?#%]/.test(value) &&
    value.split('/').every((part) => part !== '' && part !== '.' && part !== '..')
  )
}

export function sanitizeContentUrl(value: string, kind: 'image' | 'link'): string {
  const trimmed = value.trim()
  if (!trimmed || /[\\\x00-\x20\x7f]/.test(trimmed) || trimmed.startsWith('//')) return ''
  if (!/^[a-z][a-z\d+.-]*:/i.test(trimmed)) return trimmed
  try {
    const url = new URL(trimmed)
    if (url.username || url.password) return ''
    if (url.protocol === 'https:' || url.protocol === 'http:') return trimmed
    if (kind === 'link' && (url.protocol === 'mailto:' || url.protocol === 'tel:')) return trimmed
  } catch {
    return ''
  }
  return ''
}

export function getReadmeUrls(source: GitHubReadmeSource): {
  raw: string
  document: string
  rawRoot: string
  documentRoot: string
} {
  const owner = source.repository.split('/')[0].toLowerCase()
  if (
    !/^[a-z\d-]+\/[a-z\d_.-]+$/i.test(source.repository) ||
    !GITHUB_README_ALLOWED_OWNERS.some((allowedOwner) => allowedOwner.toLowerCase() === owner) ||
    source.repository.split('/').some((part) => part === '.' || part === '..') ||
    !isSafePath(source.ref ?? 'main') ||
    !isSafePath(source.path ?? 'README.md')
  ) {
    throw new Error('Invalid GitHub README source')
  }
  const repository = source.repository.split('/').map(encodeURIComponent).join('/')
  const ref = encodeURIComponent(source.ref ?? 'main')
  const path = (source.path ?? 'README.md').split('/').map(encodeURIComponent).join('/')
  const rawRoot = `https://raw.githubusercontent.com/${repository}/${ref}/`
  const documentRoot = `https://github.com/${repository}/blob/${ref}/`
  return { raw: rawRoot + path, document: documentRoot + path, rawRoot, documentRoot }
}

export function resolveReadmeUrl(
  value: string,
  kind: 'image' | 'link',
  source: GitHubReadmeSource
): string {
  const safeValue = sanitizeContentUrl(value, kind)
  if (!safeValue || /^[a-z][a-z\d+.-]*:/i.test(safeValue)) return safeValue
  try {
    const urls = getReadmeUrls(source)
    const base = kind === 'image' ? urls.raw : urls.document
    const resolved = safeValue.startsWith('/')
      ? new URL(safeValue.slice(1), kind === 'image' ? urls.rawRoot : urls.documentRoot)
      : new URL(safeValue, base)
    return sanitizeContentUrl(resolved.href, kind)
  } catch {
    return ''
  }
}

export async function fetchGitHubReadme(source: GitHubReadmeSource): Promise<string | null> {
  try {
    const response = await fetch(getReadmeUrls(source).raw, {
      next: { revalidate: 3600 },
      redirect: 'error',
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) return null
    if (!response.body) return null
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let content = ''
    let bytes = 0
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        bytes += value.byteLength
        if (bytes > MAX_README_BYTES) {
          await reader.cancel()
          return null
        }
        content += decoder.decode(value, { stream: true })
      }
      content += decoder.decode()
    } finally {
      reader.releaseLock()
    }
    return content.trim() ? content : null
  } catch {
    return null
  }
}
