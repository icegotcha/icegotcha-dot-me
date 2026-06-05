export interface ISectionProps {
  children: React.ReactNode
}

const Section = ({ children }: ISectionProps) => {
  return (
    <section
      className={`w-full max-w-7xl m-2 p-4 bg-[rgba(255,255,255,0.3)] shadow-lg rounded-br-4xl rounded-tl-4xl animate-fade-in-up`}
    >
      {children}
    </section>
  )
}

export default Section
