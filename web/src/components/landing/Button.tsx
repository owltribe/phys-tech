import React from "react";
import {cn} from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'light';
  className?: string
  href?: string
  onClick?: () => void
}

const Button = ({
  children,
  variant = 'solid',
  className,
  ...props
}: ButtonProps) => {
  const variantStyles = {
    solid: 'before:bg-blue-600',
    light: 'before:border before:border-gray-200 before:bg-gray-50',
  }[variant]

  const variantTextStyles = {
    solid: 'text-white',
    light: 'text-blue',
  }[variant]

  const Element = props.href? Link : 'button';

  return (
    <Element
      className={
        cn("relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max",
          variantStyles,
          className,
        )
      }
      {...props as any}
    >
      <span
        className={
          cn("relative text-sm font-semibold",
            variantTextStyles
          )
        }
      >
        {children}
      </span>
    </Element>
  )
}

export default Button;