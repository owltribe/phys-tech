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

export const organizationCategories = [
  {
    label: "Научная организация",
    value: "Scientific Organization"
  },
  { label: "Вуз", value: "University" },
  { label: "Технопарк", value: "Technopark" },
  {
    label: "Коммерческая Лабораторная компания",
    value: "Commercial Laboratory Company"
  }
];

export const getOrganizationCategoryLabel = (
  category: OrganizationCategory
) => {
  if (category === "Scientific Organization") {
    return "Научная Организация";
  }
  if (category === "University") {
    return "Университет";
  }
  if (category === "Technopark") {
    return "Технопарк";
  }
  if (category === "Commercial Laboratory Company") {
    return "Коммерческая Лабораторная компания";
  }
};
