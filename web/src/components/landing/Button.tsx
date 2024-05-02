import React from "react";
import {cn} from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'light';
  className?: string
}

const Button = ({
  children,
  variant = 'solid',
  className,
}: ButtonProps) => {
  const variantStyles = {
    solid: 'text-white bg-blue-600 hover:bg-blue-700',
    light: 'text-blue-600 bg-gray-100 over:text-blue-600/75',
  }[variant]

  return (
    <button
      className={
        cn("block rounded-md px-5 py-2.5 text-sm font-medium transition",
          variantStyles,
          className,
        )
      }
    >
      {children}
    </button>
  )
}

export default Button;