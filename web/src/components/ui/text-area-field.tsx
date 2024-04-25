'use client'

import React from "react";
import {Text, TextArea, TextAreaProps} from "@radix-ui/themes";

interface TextAreaFieldProps extends TextAreaProps {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

const TextAreaField = React.forwardRef<
  React.ElementRef<typeof TextArea>,
  TextAreaFieldProps
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

  const handledVariant = error ? 'soft' : variant
  const handledColor = error ? 'red' : color

  return (
    <label className={wrapperClassName}>
      <Text as="div" size="2" mb="1" weight="medium" className="text-gray-700">
        {label}
      </Text>
      <TextArea
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

TextAreaField.displayName = TextArea.displayName

export default TextAreaField