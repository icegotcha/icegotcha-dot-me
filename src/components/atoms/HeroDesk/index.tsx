/** A physical desk surface, built entirely from CSS — no image, no SVG. */
export default function HeroDesk() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full bg-gradient-to-b from-[#B7A7D2] via-[#8B77B0] to-[#544073]"
      style={{
        boxShadow:
          'inset 0 1.5px 0 rgba(255,255,255,0.4), inset 0 -10px 16px -10px rgba(46,32,90,0.35)',
      }}
    />
  )
}
