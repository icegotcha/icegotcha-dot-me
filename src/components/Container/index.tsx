'use client'

interface IContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: IContainerProps) => {
  return (
    <main className='p-9 m-0 w-full min-h-screen bg-linear-to-r from-[#B993D6] to-[#8CA6DB] round-r-lt flex flex-col items-center justify-start gap-8'>
      {children}
    </main>
  )
}

export default Container
