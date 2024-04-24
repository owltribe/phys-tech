import {OrganizationCategory} from "@/types/generated";

export enum OrganizationCategoryEnum {
  "Scientific Institute" = "НИИ\n(Научно-исследовательский институт)",
  "University" = "ВУЗ\n(Высшее учебное заведение)",
  "Company" = "Компания\n(ТОО/ИП)",
}

export const organizationCategories: {
  value: OrganizationCategory,
  label: OrganizationCategoryEnum
}[] = Object.entries(OrganizationCategoryEnum)
    .map(([value, label]) => ({
      value: value as OrganizationCategory,
      label
    }))
