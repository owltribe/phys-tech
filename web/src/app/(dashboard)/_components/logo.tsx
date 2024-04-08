import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      height={40}
      width={140}
      alt="logo"
      src="/logo-ipsum.svg"
    />
  )
}