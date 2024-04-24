import Image from "next/image";

export const Logo = ({
  className,
}: {
  className?: string
}) => {
  return (
    <Image
      height={40}
      width={140}
      alt="logo"
      src="/logo-ipsum.svg"
      className={className}
    />
  )
}