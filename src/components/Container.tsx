interface IContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: IContainerProps) => {
  return (
    <main className='p-9 m-0 w-full min-h-screen bg-gradient-to-r from-[#B993D6] to-[#8CA6DB]'>
      <section className='m-2 p-4 text-center text-gray-800 bg-[rgba(255,255,255,0.3)] shadow-lg flex flex-col justify-center items-center'>
        {children}
      </section>
    </main>
  )
}

export default Container
