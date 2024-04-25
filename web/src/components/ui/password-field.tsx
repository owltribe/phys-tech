'use client'

import React, {useState} from "react";
import {IconButton, Text, TextField as RadixTextField} from "@radix-ui/themes";
import {Eye, EyeOff} from "lucide-react";

interface TextFieldProps extends RadixTextField.RootProps {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

const PasswordField = React.forwardRef<
  React.ElementRef<typeof RadixTextField.Root>,
  TextFieldProps
>((
  {
    label,
    error,
    variant,
    color,
    wrapperClassName,
    ...textFieldProps
  },
  ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const handledVariant = error ? 'soft' : variant
  const handledColor = error ? 'red' : color

  const type = isVisible ? "text" : "password"

  return (
    <label className={wrapperClassName}>
      <Text as="div" size="2" mb="1" weight="medium" className="text-gray-700">
        {label}
      </Text>
      <RadixTextField.Root
        ref={ref}
        variant={handledVariant}
        color={handledColor}
        type={type}
        {...textFieldProps}
      >
        <RadixTextField.Slot side="right">
          <IconButton
            size="1"
            variant="ghost"
            color="gray"
            onClick={() => setIsVisible(v => !v)}
            type="button"
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </IconButton>
        </RadixTextField.Slot>
      </RadixTextField.Root>
      {error && (
        <Text color='red' size="1">
          {error}
        </Text>
      )}
    </label>
  )
})

PasswordField.displayName = RadixTextField.Root.displayName

export default PasswordField