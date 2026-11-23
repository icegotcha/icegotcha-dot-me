'use client'

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactElement,
  type RefObject,
} from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from 'motion/react'
import { useBrowserPreviewFrame } from '@/components/molecules/BrowserPreviewFrame'
import styles from './WebsiteMockup.module.css'

export default function WebsiteMockup(): ReactElement {
  const { active, viewportRef } = useBrowserPreviewFrame()
  const sceneRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [product, setProduct] = useState(0)
  const heroInView = useInView(heroRef, { root: viewportRef, amount: 0.1 })

  useEffect(() => {
    const scene = sceneRef.current
    const viewport = viewportRef.current
    if (!scene || !('IntersectionObserver' in window)) return

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.setAttribute('data-visible', String(entry.isIntersecting))
        }
      },
      { root: viewport }
    )
    for (const element of scene.querySelectorAll('[data-continuous]')) {
      visibilityObserver.observe(element)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        }
      },
      { root: viewport, threshold: 0.5 }
    )
    scene.setAttribute('data-observing', 'true')
    for (const element of scene.querySelectorAll('[data-reveal]')) observer.observe(element)
    return () => {
      observer.disconnect()
      visibilityObserver.disconnect()
    }
  }, [viewportRef])

  return (
    <div
      ref={sceneRef}
      className={styles.sequence}
      data-playing={active}
      data-hero-active={heroInView}
    >
      <div className={styles.page}>
        <div>
          <div className={styles.navigation} aria-hidden="true">
            <span className={styles.siteName} />
            <div className={styles.navLinks}>
              <span />
              <span />
              <span />
            </div>
            <span className={styles.menu} />
          </div>
          <div
            ref={heroRef}
            className={styles.hero}
            role="img"
            aria-label="Unbranded grayscale website mockup: staggered headline reveal and six floating geometric objects."
          >
            <div className={styles.heroBackdrop}>
              {Array.from({ length: 12 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    left: `${(index * 17 + 7) % 100}%`,
                    top: `${(index * 29 + 11) % 100}%`,
                  }}
                />
              ))}
            </div>
            <div className={`${styles.floatingObject} ${styles.objectLeft}`}>
              <div className={styles.float}>
                <div className={styles.cube} />
              </div>
            </div>
            <div className={`${styles.floatingObject} ${styles.objectTopLeft}`}>
              <div className={styles.float}>
                <div className={styles.ring} />
              </div>
            </div>
            <div className={`${styles.floatingObject} ${styles.objectBottomLeft}`}>
              <div className={styles.float}>
                <div className={styles.sphere} />
              </div>
            </div>
            <div className={styles.headline}>
              <span />
              <span />
            </div>
            <div className={styles.description}>
              <span />
              <span />
            </div>
            <div className={styles.action} />
            <div className={`${styles.floatingObject} ${styles.objectRight}`}>
              <div className={styles.float}>
                <div className={styles.ring} />
              </div>
            </div>
            <div className={`${styles.floatingObject} ${styles.objectTopRight}`}>
              <div className={styles.float}>
                <div className={styles.cube} />
              </div>
            </div>
            <div className={`${styles.floatingObject} ${styles.objectBottomRight}`}>
              <div className={styles.float}>
                <div className={styles.sphere} />
              </div>
            </div>
          </div>
          <div className={styles.partnerStrip} aria-hidden="true" data-continuous="true">
            <div className={styles.partnerTrack}>
              {Array.from({ length: 20 }, (_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
          <div className={styles.content} aria-hidden="true">
            <span className={styles.sectionTitle} data-reveal="true" />
            <div className={styles.panels}>
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className={styles.panel} data-reveal="true" data-continuous="true">
                  <div className={styles.panelArtwork} />
                  <span />
                  <span />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.scrollSection} data-reveal="true">
            <div className={styles.feature}>
              <div className={styles.featureIllustration} aria-hidden="true" data-product={product}>
                <div key={product} className={styles.productVisual}>
                  <div className={styles.orbit} />
                  <div className={styles.featureCube} />
                </div>
              </div>
              <div className={styles.featureCopy}>
                <div
                  className={styles.productChoices}
                  role="group"
                  aria-label="Mockup product views"
                >
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      type="button"
                      aria-pressed={product === index}
                      aria-label={`Show product view ${index + 1}`}
                      onClick={() => setProduct(index)}
                    >
                      <span aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <div aria-hidden="true">
                  <span className={styles.copyHeading} />
                  <span className={styles.copyHeading} />
                  <div className={styles.copyLines}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={styles.featureAction} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.scrollSection} data-reveal="true">
            <div className={styles.details} aria-hidden="true">
              <span className={styles.sectionTitle} />
              <div className={styles.detailRows}>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className={styles.detailRow} data-reveal="true">
                    <div className={styles.detailSymbol} />
                    <div className={styles.copyLines}>
                      <span />
                      <span />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.scrollSection} data-reveal="true">
            <AchievementPreview active={active} viewportRef={viewportRef} />
            <div className={styles.footer} aria-hidden="true">
              <span className={styles.siteName} />
              <div className={styles.navLinks}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AchievementPreviewProps {
  active: boolean
  viewportRef: RefObject<HTMLDivElement | null>
}

function AchievementPreview({ active, viewportRef }: AchievementPreviewProps): ReactElement {
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { root: viewportRef, amount: 0.1 })
  const countersRevealed = useInView(frameRef, { root: viewportRef, amount: 0.5, once: true })
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  )
  const x = useSpring(0, { stiffness: 120, damping: 22 })
  const y = useSpring(0, { stiffness: 120, damping: 22 })
  const moving = active && inView && !reducedMotion

  useEffect(() => {
    if (reducedMotion) {
      x.jump(0)
      y.jump(0)
    } else if (!moving) {
      x.jump(x.get())
      y.jump(y.get())
    }
  }, [moving, reducedMotion, x, y])

  function moveOrb(event: PointerEvent<HTMLDivElement>): void {
    if (!moving) return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)) - bounds.width / 2)
    y.set(Math.max(0, Math.min(bounds.height, event.clientY - bounds.top)) - bounds.height / 2)
  }

  function resetOrb(): void {
    if (!moving) return
    x.set(0)
    y.set(0)
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLDivElement>): void {
    if (!moving) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const step = Math.min(bounds.width, bounds.height) * 0.15
    switch (event.key) {
      case 'ArrowLeft':
        x.set(Math.max(-bounds.width / 2, x.get() - step))
        break
      case 'ArrowRight':
        x.set(Math.min(bounds.width / 2, x.get() + step))
        break
      case 'ArrowUp':
        y.set(Math.max(-bounds.height / 2, y.get() - step))
        break
      case 'ArrowDown':
        y.set(Math.min(bounds.height / 2, y.get() + step))
        break
      case 'Home':
        resetOrb()
        break
      default:
        return
    }
    event.preventDefault()
  }

  return (
    <div
      ref={frameRef}
      className={`${styles.achievements} ${styles.pointerFrame}`}
      role="group"
      aria-label="Interactive achievements preview: move your pointer or use arrow keys to move the circular light; Home recenters it."
      tabIndex={0}
      onPointerMove={moveOrb}
      onKeyDown={moveWithKeyboard}
    >
      <div className={styles.orbAnchor} aria-hidden="true">
        <motion.div className={styles.pointerOrb} style={{ x, y }} />
      </div>
      <div className={styles.achievementIntro} aria-hidden="true">
        <span className={styles.copyHeading} />
        <span className={styles.copyHeading} />
        <div className={styles.copyLines}>
          <span />
          <span />
        </div>
      </div>
      <div
        className={styles.achievementMetrics}
        role="img"
        aria-label="Illustrative achievement counters: 100 and 50."
      >
        {[100, 50].map((value, index) => (
          <div key={index} className={styles.achievementMetric}>
            <AchievementCounter
              value={value}
              running={active && inView}
              revealed={countersRevealed}
              reducedMotion={reducedMotion}
              delay={index * 0.2}
            />
            <div className={styles.copyLines}>
              <span />
              <span />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface AchievementCounterProps {
  value: number
  running: boolean
  revealed: boolean
  reducedMotion: boolean
  delay: number
}

function AchievementCounter({
  value,
  running,
  revealed,
  reducedMotion,
  delay,
}: AchievementCounterProps): ReactElement {
  const progress = useMotionValue(0)
  const displayValue = useTransform(progress, (current) =>
    Math.round(current * value).toLocaleString('en-US')
  )
  const animationRef = useRef<AnimationPlaybackControls | null>(null)

  useEffect(() => () => animationRef.current?.stop(), [])

  useEffect(() => {
    if (reducedMotion) {
      animationRef.current?.complete()
      progress.set(1)
      return
    }
    if (!running || !revealed) {
      animationRef.current?.pause()
      return
    }
    if (progress.get() >= 1) return
    if (animationRef.current) {
      animationRef.current.play()
      return
    }
    animationRef.current = animate(progress, 1, {
      duration: 2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    })
  }, [delay, progress, reducedMotion, revealed, running])

  return (
    <motion.span className={styles.metricValue} aria-hidden="true">
      {displayValue}
    </motion.span>
  )
}

function subscribeToReducedMotion(onChange: () => void): () => void {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  preference.addEventListener('change', onChange)
  return () => preference.removeEventListener('change', onChange)
}

function getReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getServerReducedMotion(): boolean {
  return false
}
