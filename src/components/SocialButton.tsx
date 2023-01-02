export interface ISocialButtonProps {
  icon: React.ReactNode
  name: string
  link: string
}

const SocialButton = ({ icon, name, link }: ISocialButtonProps) => {
  return (
    <a
      href={link}
      className='bg-purple-600 rounded-full p-3 text-white hover:bg-purple-700 flex gap-2 items-center justify-center drop-shadow-md'
    >
      {icon}
      <span>{name}</span>
    </a>
  )
}

export default SocialButton
