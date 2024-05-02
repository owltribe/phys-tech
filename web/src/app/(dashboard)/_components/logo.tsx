import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  className,
}: {
  className?: string
}) => {
  return (
    <Link href='/'>
      <Image
        height={32}
        width={32}
        alt="logo"
        src="/logo.svg"
        className={className}
      />
    </Link>
  )
}