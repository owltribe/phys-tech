import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
   className,
   placeholder,
   error,
   ...props
   }, ref) => {
    return (
      <div>
        <label
            htmlFor={placeholder}
            className={cn(
                "relative block rounded-md px-3 py-2 border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-sky-500",
                error && "ring-1 ring-red-500"
            )}
        >
            <input
                ref={ref}
                id={placeholder}
                className={cn(
                  "peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 text-gray-700",
                  className,
                )}
                placeholder={placeholder}
                {...props}
            />

            <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                {placeholder}
            </span>
        </label>
        {error && (
          <span className="ml-2 mb-2 text-xs text-red-500">
             {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }