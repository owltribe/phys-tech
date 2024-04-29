import Image from "next/image";

export const Logo = ({
  className,
}: {
  className?: string
}) => {
  return (
    <Image
      height={32}
      width={32}
      alt="logo"
      src="/logo.svg"
      className={className}
    />
  )
}