import {Select, Text} from "@radix-ui/themes";
import React from "react";

export interface SelectFieldProps extends
  Select.RootProps,
  Partial<Pick<Select.TriggerProps, 'color' | 'variant' | 'className'>> {
  label: string;
  error?: string;
  wrapperClassName?: string;
  items: {
    label: string;
    value: string
  }[]
}

const SelectField =  React.forwardRef<
  React.ElementRef<typeof Select.Root>,
  SelectFieldProps
>(({
    label,
    items,
    error,
    variant,
    color,
    className,
    wrapperClassName,
    ...selectFieldProps
  }, ref) => {

  const handledVariant = error ? 'soft' : variant
  const handledColor = error ? 'red' : color

  return (
    <label className={wrapperClassName}>
      <Text as="div" size="2" mb="1" weight="medium">
        {label}
      </Text>
      <Select.Root {...selectFieldProps}>
        <Select.Trigger
          variant={handledVariant}
          color={handledColor}
          className={className}
        />
        <Select.Content color={handledColor} ref={ref} position="popper">
          <Select.Group>
            {items.map(({value, label}) => (
              <Select.Item
                key={value}
                value={value}
              >
                {label}
              </Select.Item>
            ))}
          </Select.Group>
       </Select.Content>
     </Select.Root>
      {error && (
        <Text color='red' size="1">
          {error}
        </Text>
      )}
    </label>
  )
})

SelectField.displayName = Select.Root.displayName

export default SelectField
