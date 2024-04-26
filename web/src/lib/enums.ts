import {OrganizationCategory, ServiceRequestStatus} from "@/types/generated";

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

export enum ServiceRequestEnum {
  Pending = "В обработке",
  Approved = "Утверждено",
  Rejected = "Отклонено",
  Completed = "Завершено",
}