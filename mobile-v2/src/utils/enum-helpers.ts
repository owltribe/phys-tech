import { ServiceRequestStatus, UserRole } from "types/generated";

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
