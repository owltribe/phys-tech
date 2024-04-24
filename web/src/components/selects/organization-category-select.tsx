import SelectField, {SelectFieldProps} from "@/components/ui/select-field";
import {organizationCategories} from "@/lib/enums";

interface OrganizationCategorySelectProps
  extends Omit<SelectFieldProps, 'items'> {}

const OrganizationCategorySelect = ({
  ...organizationCategorySelectProps
}: OrganizationCategorySelectProps) => {
  return (
    <SelectField
      items={organizationCategories}
      {...organizationCategorySelectProps}
    />
  )
}

export default OrganizationCategorySelect