/** A small floating shelf for the rabbit to sit on — CSS only, no image, no SVG. */
export default function HeroRabbitShelf() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full bg-gradient-to-b from-[#DCD3F2]/75 via-[#B9A8E6]/55 to-[#6C5AAE]/45"
      style={{
        boxShadow:
          'inset 0 1.5px 0 rgba(255,255,255,0.45), inset 0 -6px 10px -6px rgba(46,32,90,0.35), 0 10px 14px -8px rgba(46,32,90,0.3)',
      }}
    />
  )
}
