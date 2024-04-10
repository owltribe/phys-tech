import {
  OrganizationCategory,
  ServiceRequestStatus,
  UserRole
} from "types/generated";

export const getServiceRequestStatusLabel = (status: ServiceRequestStatus) => {
  if (status === "Approved") {
    return "Утверждено";
  }
  if (status === "Rejected") {
    return "Отклонено";
  }
  if (status === "Completed") {
    return "Завершено";
  }
  if (status === "Pending") {
    return "В обработке";
  }
};

export const getUserRoleLabel = (role: UserRole) => {
  if (role === "Client") {
    return "Клиент";
  }
  if (role === "Organization") {
    return "Организация";
  }
};

export const organizationCategories: {
  label: string;
  value: OrganizationCategory;
}[] = [
  {
    label: "НИИ (Научно-исследовательский институт)",
    value: "Scientific Institute"
  },
  {
    label: "Компания (ТОО/ИП)",
    value: "Company"
  },
  {
    label: "ВУЗ (Высшее учебное заведение)",
    value: "University"
  }
];

export const getOrganizationCategoryLabel = (
  category: OrganizationCategory
) => {
  if (category === "Scientific Institute") {
    return "НИИ (Научно-исследовательский институт)";
  }
  if (category === "University") {
    return "ВУЗ (Высшее учебное заведение)";
  }
  if (category === "Company") {
    return "Компания (ТОО/ИП)";
  }
};
