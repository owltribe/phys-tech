import { useState } from "react";
import { View } from "react-native";
import { Button, Divider, List } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import useServiceRequest from "hooks/service_requests/useServiceRequest";
import useUpdateServiceRequest from "hooks/service_requests/useUpdateServiceRequest";
import { useAuth } from "providers/AuthProvider";
import { ServiceRequestScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { ServiceRequestStatus } from "types/generated";
import { getServiceRequestStatusLabel } from "utils/enum-helpers";
import { showToastWithGravityAndOffset } from "utils/notifications";

import ApproveModal from "./components/ApproveModal";

const ServiceRequestDetail = ({
  route: {
    params: { serviceRequestId }
  }
}: ServiceRequestScreenProps) => {
  const { user } = useAuth();

  const { data, isSuccess } = useServiceRequest(serviceRequestId);
  const updateServiceRequestMutation =
    useUpdateServiceRequest(serviceRequestId);

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  const isOrganization = user?.role === "Organization";

  const handleSubmit = (status: ServiceRequestStatus) => {
    if (isSuccess && data?.data) {
      updateServiceRequestMutation.mutate(
        {
          status: status,
          requested_by_id: data.data.requested_by.id,
          service_id: data.data.service.id
        },
        {
          onSuccess: () => {
            let successMessage: string = "";

            if (status === "Approved") {
              successMessage = "Заявка утверждена";
            }
            if (status === "Rejected") {
              successMessage = "Заявка отклонена";
            }
            if (status === "Completed") {
              successMessage = "Заявка завершена";
            }

            showToastWithGravityAndOffset(successMessage);
          },
          onError: (error) => {
            let errorMessage: string = "";

            if (status === "Approved") {
              errorMessage = `Ошибка утверждения заявки: ${String(
                error.request.detail
              )}`;
            }
            if (status === "Rejected") {
              errorMessage = `Ошибка отклонения заявки: ${String(
                error.request.detail
              )}`;
            }
            if (status === "Completed") {
              errorMessage = `Ошибка завершения заявки: ${String(
                error.request.detail
              )}`;
            }

            showToastWithGravityAndOffset(errorMessage);
          },
          onSettled: () => {
            if (status === "Approved") {
              setIsApproveModalVisible(false);
            }
            if (status === "Rejected") {
              setIsDeclineModalVisible(false);
            }
            if (status === "Completed") {
              setIsCompletedModalVisible(false);
            }
          }
        }
      );
    }
  };

  return (
    <ScreenWrapper>
      <List.Section
        title="Информация об услуге"
        titleStyle={{ fontSize: 22, fontWeight: "700" }}
      >
        <List.Item
          title={data?.data.service.name}
          description="Название"
        />
        <List.Item
          title={`${data?.data.service.cost} KZT`}
          description="Цена"
        />
        <List.Item
          title={data?.data.service.expected_result}
          description="Ожидаемый результат"
        />
        <List.Item
          title={getServiceRequestStatusLabel(data?.data.status || "Pending")}
          description="Статус заявки"
        />
      </List.Section>

      <View style={commonStyles.defaultHorizontalPadding}>
        <Divider bold />
      </View>

      {isOrganization ? (
        <List.Section
          title="Информация о заказчике"
          titleStyle={{ fontSize: 22, fontWeight: "700" }}
        >
          <List.Item
            title={data?.data.requested_by.full_name}
            description="Полное имя"
          />
          <List.Item
            title={data?.data.requested_by.email}
            description="Электронная почта"
          />
        </List.Section>
      ) : (
        <List.Section
          title="Информация о поставщике"
          titleStyle={{ fontSize: 22, fontWeight: "700" }}
        >
          <List.Item
            title={data?.data.service.organization.name}
            description="Название организации"
          />
          <List.Item
            title={data?.data.service.organization.email}
            description="Электронная почта"
          />
        </List.Section>
      )}

      {isOrganization && (
        <View style={commonStyles.container}>
          {data?.data.status === "Pending" && (
            <>
              <Button
                mode="contained"
                onPress={() => setIsApproveModalVisible(true)}
              >
                Утвердить
              </Button>
              <Button
                mode="outlined"
                onPress={() => setIsDeclineModalVisible(true)}
              >
                Отклонить
              </Button>
            </>
          )}
          {data?.data.status === "Approved" && (
            <Button
              mode="contained"
              onPress={() => setIsCompletedModalVisible(true)}
            >
              Завершить
            </Button>
          )}
        </View>
      )}

      <ApproveModal
        visible={isApproveModalVisible}
        onDismiss={() => setIsApproveModalVisible(false)}
        onConfirm={() => handleSubmit("Approved")}
        isLoading={updateServiceRequestMutation.isPending}
        title="Утвердить заявку"
        description={`Вы согласовали вашу услугу c заказчиком и уверены что хотите обновить статус на "Утверждено"?`}
      />
      <ApproveModal
        visible={isDeclineModalVisible}
        onDismiss={() => setIsDeclineModalVisible(false)}
        onConfirm={() => handleSubmit("Rejected")}
        isLoading={updateServiceRequestMutation.isPending}
        title="Отклонить заявку"
        description={`Вы уверенны что хотите поменять статус на "Отклонить"? Данное действия не обратимо.`}
      />
      <ApproveModal
        visible={isCompletedModalVisible}
        onDismiss={() => setIsCompletedModalVisible(false)}
        onConfirm={() => handleSubmit("Completed")}
        isLoading={updateServiceRequestMutation.isPending}
        title="Завершить заявку"
        description={`Вы выполнили вашу услугу и вы уверенны что хотите поменять статус на "Выполнено"?`}
      />
    </ScreenWrapper>
  );
};

export default ServiceRequestDetail;
