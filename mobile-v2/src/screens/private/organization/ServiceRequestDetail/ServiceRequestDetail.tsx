import { useState } from "react";
import { View } from "react-native";
import { Button, Divider, List } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import useServiceRequest from "hooks/service_requests/useServiceRequest";
import { ServiceRequestScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import useUpdateServiceRequest from "../../../../hooks/service_requests/useUpdateServiceRequest";
import { showToastWithGravityAndOffset } from "../../../../utils/notifications";

import ApproveModal from "./components/ApproveModal";

const ServiceRequestDetail = ({
  route: {
    params: { serviceRequestId }
  }
}: ServiceRequestScreenProps) => {
  const { data } = useServiceRequest(serviceRequestId);
  const updateServiceRequestMutation =
    useUpdateServiceRequest(serviceRequestId);

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
  const [isCompletedModalVisible, setIsCompletedModalVisible] = useState(false);

  const handleConfirm = () => {
    updateServiceRequestMutation.mutate(
      {
        // @ts-ignore
        status: "Утверждено",
        requested_by_id: data?.data.requested_by.id || null,
        service_id: data?.data.service.id || null
      },
      {
        onSuccess: () => {
          showToastWithGravityAndOffset("Заявка утверждена");
        },
        onError: (error) => {
          showToastWithGravityAndOffset(
            `Ошибка утверждения заявки: ${String(error.request.detail)}`
          );
        },
        onSettled: () => {
          setIsApproveModalVisible(false);
        }
      }
    );
  };
  const handleDecline = () => {
    updateServiceRequestMutation.mutate(
      {
        // @ts-ignore
        status: "Отклонено",
        requested_by_id: data?.data.requested_by.id || null,
        service_id: data?.data.service.id || null
      },
      {
        onSuccess: () => {
          showToastWithGravityAndOffset("Заявка отклонена");
        },
        onError: (error) => {
          showToastWithGravityAndOffset(
            `Ошибка отклонения заявки: ${String(error.request.detail)}`
          );
        },
        onSettled: () => {
          setIsDeclineModalVisible(false);
        }
      }
    );
  };
  const handleComplete = () => {
    updateServiceRequestMutation.mutate(
      {
        // @ts-ignore
        status: "Completed",
        requested_by_id: data?.data.requested_by.id || null,
        service_id: data?.data.service.id || null
      },
      {
        onSuccess: () => {
          showToastWithGravityAndOffset("Заявка завершена");
        },
        onError: (error) => {
          showToastWithGravityAndOffset(
            `Ошибка завершения заявки: ${String(error.request.detail)}`
          );
        },
        onSettled: () => {
          setIsCompletedModalVisible(false);
        }
      }
    );
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
          description="Ождиемый результат"
        />
        <List.Item
          title={data?.data.status}
          description="Статус заявки"
        />
      </List.Section>

      <View style={commonStyles.defaultHorizontalPadding}>
        <Divider bold />
      </View>

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
        {/*@ts-ignore*/}
        {data?.data.status === "Утверждено" && (
          <Button
            mode="contained"
            onPress={() => setIsCompletedModalVisible(true)}
          >
            Завершить
          </Button>
        )}
      </View>

      <ApproveModal
        visible={isApproveModalVisible}
        onDismiss={() => setIsApproveModalVisible(false)}
        onConfirm={handleConfirm}
        isLoading={updateServiceRequestMutation.isPending}
        title="Утвердить заявку"
        description={`Вы согласовали вашу услугу c заказчиком и уверены что хотите обновить статус на "Утверждено"?`}
      />
      <ApproveModal
        visible={isDeclineModalVisible}
        onDismiss={() => setIsDeclineModalVisible(false)}
        onConfirm={handleDecline}
        isLoading={updateServiceRequestMutation.isPending}
        title="Отклонить заявку"
        description={`Вы уверенны что хотите поменять статус на "Отклонить"? Данное действия не обратимо.`}
      />
      <ApproveModal
        visible={isCompletedModalVisible}
        onDismiss={() => setIsCompletedModalVisible(false)}
        onConfirm={handleComplete}
        isLoading={updateServiceRequestMutation.isPending}
        title="Завершить заявку"
        description={`Вы выполнили вашу услугу и вы уверенны что хотите поменять статус на "Выполнено"?`}
      />
    </ScreenWrapper>
  );
};

export default ServiceRequestDetail;
