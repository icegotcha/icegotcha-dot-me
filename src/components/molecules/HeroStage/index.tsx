import { forwardRef } from 'react'
import ParallaxLayer, { type HeroObjectActivation } from '@/components/molecules/ParallaxLayer'
import HeroDesk from '@/components/atoms/HeroDesk'
import HeroPlant from '@/components/atoms/HeroPlant'
import HeroComputer, { type HeroComputerScreen } from '@/components/atoms/HeroComputer'
import HeroCoffeeCup from '@/components/atoms/HeroCoffeeCup'
import type { SteamShape } from '@/components/atoms/HeroCoffeeCup/SteamStrands'
import HeroRabbit from '@/components/atoms/HeroRabbit'
import HeroRabbitShelf from '@/components/atoms/HeroRabbitShelf'
import HeroStoryBookTrigger from '@/components/molecules/HeroStoryBookTrigger'
import HeroPalette from '@/components/atoms/HeroPalette'
import HeroSketchbookTrigger from '@/components/molecules/HeroSketchbookTrigger'
import HeroBrush from '@/components/atoms/HeroBrush'
import HeroMouse from '@/components/atoms/HeroMouse'
import HeroAmbientSparkles from '@/components/atoms/HeroAmbientSparkles'
import HeroStarfield from '@/components/atoms/HeroStarfield'
import HeroSparkBurst from '@/components/atoms/HeroSparkBurst'
import type { HeroSkyMode } from '@/lib/heroTheme'

const DEPTH = {
  stars: 0.15,
  notebook: 0.3,
  coffee: 0.25,
  plant: 0.1,
  palette: 0.3,
  mouse: 0.25,
  drawing: 0.3,
  brush: 0.3,
}
const ANCHOR_SPRING = { stiffness: 260, damping: 26, mass: 0.5 }
const SCREEN_ACTION_LABELS: Record<HeroComputerScreen, string> = {
  code: 'Show browser on the computer',
  browser: 'Show artwork on the computer',
  artwork: 'Show code on the computer',
}

export interface HeroBurst {
  id: number
  x: number
  y: number
  radius: number
}

interface HeroStageProps {
  skyMode?: HeroSkyMode
  computerScreen?: HeroComputerScreen
  onMouseActivate?: (point: HeroObjectActivation) => void
  onPlantActivate?: () => void
  onBrushActivate?: () => void
  onCoffeeActivate?: () => void
  coffeeBreak?: { key: number; shape: SteamShape; message: string | null }
  brushDrawing?: { key: number; index: number } | null
  bursts: HeroBurst[]
  reducedMotion: boolean
  onObjectActivate: (point: HeroObjectActivation) => void
  onDismissBurst: (id: number) => void
}

/**
 * A fixed-aspect workspace with three explicit percentage-based compositions.
 * Related objects share the same breakpoint rhythm so they remain grounded.
 */
const HeroStage = forwardRef<HTMLDivElement, HeroStageProps>(function HeroStage(
  {
    bursts,
    reducedMotion,
    onObjectActivate,
    onDismissBurst,
    skyMode = 'moon',
    computerScreen = 'code',
    onMouseActivate,
    onPlantActivate,
    onBrushActivate,
    onCoffeeActivate,
    coffeeBreak = { key: 0, shape: 'heart', message: null },
    brushDrawing = null,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className="hero-stage relative mx-auto aspect-[3/4] w-full max-w-[1100px] sm:aspect-[16/10] md:aspect-[16/9]"
    >
      <style>{`
        .hero-decoration-enter { animation: heroDecorationEnter 450ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes heroDecorationEnter {
          from { opacity: 0.85; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-decoration-enter { animation: none; }
        }
      `}</style>
      <ParallaxLayer
        depth={DEPTH.stars}
        options={{ fadeTo: 0 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="hero-decoration-enter absolute inset-0">
          <HeroStarfield />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.notebook}
        options={{ drift: { x: -30, y: -22 } }}
        className="absolute left-[1%] top-[4%] z-10 w-[33%] sm:left-[1%] sm:top-[2%] sm:w-[24%] md:left-[1%] md:top-[2%] md:w-[22%]"
      >
        <div className="hero-decoration-enter">
          <HeroStoryBookTrigger />
        </div>
      </ParallaxLayer>

      <ParallaxLayer
        depth={0}
        className="pointer-events-none absolute left-[65%] top-[23%] z-0 h-[3%] w-[34%] sm:left-[72%] sm:top-[35%] sm:h-[3.3%] sm:w-[27%] md:left-[74%] md:top-[36%] md:h-[3.5%] md:w-[25%]"
      >
        <HeroRabbitShelf />
      </ParallaxLayer>

      <ParallaxLayer
        depth={0}
        className="absolute left-[69%] top-[7%] z-10 w-[28%] sm:left-[76%] sm:top-[10%] sm:w-[21%] md:left-[78%] md:top-[10%] md:w-[19%]"
      >
        <HeroRabbit />
      </ParallaxLayer>

      <ParallaxLayer
        depth={0}
        className="pointer-events-none absolute inset-x-0 top-[62%] z-0 h-[20%] sm:top-[73%] sm:h-[20%] md:top-[74%] md:h-[20%]"
      >
        <HeroDesk />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.plant}
        options={{ spring: ANCHOR_SPRING, drift: { x: 0, y: -12 } }}
        className="absolute left-[69%] top-[43%] z-20 w-[30%] sm:left-[71%] sm:top-[35%] sm:w-[28%] md:left-[72%] md:top-[33%] md:w-[28%]"
      >
        <HeroPlant
          onActivate={onPlantActivate}
          label={
            onPlantActivate
              ? `Change the sky. Current: ${skyMode}. Switch to ${skyMode === 'moon' ? 'day' : 'night'}.`
              : undefined
          }
        />
      </ParallaxLayer>

      <ParallaxLayer
        depth={0}
        className="absolute left-[6%] top-[22%] z-10 w-[88%] sm:left-[17%] sm:top-[12%] sm:w-[64%] md:left-[17%] md:top-[6%] md:w-[64%]"
      >
        <HeroComputer screen={computerScreen} />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.coffee}
        options={{ drift: { x: -16, y: 16 } }}
        interactiveLabel="Take a coffee break"
        onActivate={onCoffeeActivate ?? onObjectActivate}
        className="absolute left-[1%] top-[55%] z-20 w-[18%] sm:left-[7%] sm:top-[64%] sm:w-[12%] md:left-[7%] md:top-[64%] md:w-[11%]"
      >
        <HeroCoffeeCup
          puffKey={coffeeBreak.key}
          puffShape={coffeeBreak.shape}
          message={coffeeBreak.message}
        />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.drawing}
        options={{ drift: { x: 12, y: 25 } }}
        className="absolute left-[35%] top-[63%] z-30 w-[31%] sm:left-[39%] sm:top-[69%] sm:w-[20%] md:left-[39%] md:top-[68%] md:w-[19%]"
      >
        <HeroSketchbookTrigger />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.palette}
        options={{ drift: { x: 12, y: 25 } }}
        interactiveLabel="Create stars around the palette"
        onActivate={onObjectActivate}
        className="absolute left-[3%] top-[72%] z-20 w-[24%] sm:left-[20%] sm:top-[78%] sm:w-[19%] md:left-[21%] md:top-[78%] md:w-[17%]"
      >
        <HeroPalette />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.brush}
        options={{ drift: { x: 12, y: 25 } }}
        interactiveLabel="Paint a little magic"
        onActivate={onBrushActivate ?? (() => undefined)}
        className="absolute left-[3%] top-[71%] z-20 w-[24%] sm:left-[20%] sm:top-[77%] sm:w-[19%] md:left-[21%] md:top-[77%] md:w-[17%]"
      >
        <HeroBrush paintKey={brushDrawing?.key ?? 0} drawingIndex={brushDrawing?.index} />
      </ParallaxLayer>

      <ParallaxLayer
        depth={DEPTH.mouse}
        options={{ drift: { x: 20, y: 18 } }}
        interactiveLabel={SCREEN_ACTION_LABELS[computerScreen]}
        onActivate={onMouseActivate ?? onObjectActivate}
        className="absolute left-[68%] top-[68%] z-20 w-[14%] sm:left-[66%] sm:top-[78%] sm:w-[12%] md:left-[66%] md:top-[78%] md:w-[11%]"
      >
        <HeroMouse />
      </ParallaxLayer>

      <ParallaxLayer depth={0.22} className="pointer-events-none absolute inset-0 z-20">
        <HeroAmbientSparkles />
      </ParallaxLayer>

      {bursts.map((burst) => (
        <HeroSparkBurst
          key={burst.id}
          x={burst.x}
          y={burst.y}
          radius={burst.radius}
          reducedMotion={reducedMotion}
          onComplete={() => onDismissBurst(burst.id)}
        />
      ))}
    </div>
  )
})

export default HeroStage
