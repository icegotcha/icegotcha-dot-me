import Typewriter from '../Typewriter'

export interface ITitleProps {
  message: string
}

const Title = ({ message }: ITitleProps) => {
  return (
    <h1 className='w-full max-w-7xl text-2xl md:text-4xl font-bold p-4 animate-fade-in-up'>
      <span className='text-gray-600'>&gt;</span> <Typewriter text={message} />
    </h1>
  )
}

export default Title
