import { PRESS } from '@/lib/fonts'

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-4 md:px-8">
        <div className="pt-6 flex items-center justify-between">
          <span className="text-white/60 text-[0.55rem]" style={PRESS}>
            icegotcha.me
          </span>
          <span className="text-white/60 text-[0.55rem]" style={PRESS}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
