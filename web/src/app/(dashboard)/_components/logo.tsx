import Image from "next/image";
import Link from "next/link";

export const Logo = ({
  className,
  height = 32,
  width = 32,
}: {
  className?: string;
  height?: number;
  width?: number;
}) => {
  return (
    <Link href='/'>
      <Image
        height={height}
        width={width}
        alt="logo"
        src="/logo.svg"
        className={className}
      />
    </Link>
  )
}