'use client'

import React from "react";
import {Text, TextField as RadixTextField} from "@radix-ui/themes";

interface TextFieldProps extends RadixTextField.RootProps {
  label: string;
  error?: string;
}

const TextField = React.forwardRef<
  React.ElementRef<typeof RadixTextField.Root>,
  TextFieldProps
>((
  {
    label,
    error,
    variant,
    color,
    ...textFieldProps
  },
  ref) => {

  const handledVariant = error ? 'soft' : variant
  const handledColor = error ? 'red' : color

  return (
    <label>
      <Text as="div" size="2" mb="1" weight="medium">
        {label}
      </Text>
      <RadixTextField.Root
        ref={ref}
        variant={handledVariant}
        color={handledColor}
        {...textFieldProps}
      />
      {error && (
        <Text color='red' size="1">
          {error}
        </Text>
      )}
    </label>
  )
})

TextField.displayName = RadixTextField.Root.displayName

export default TextField