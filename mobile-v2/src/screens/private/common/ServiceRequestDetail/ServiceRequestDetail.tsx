import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import ServieRequestBadge from "components/badges/ServieRequestBadge";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import ScreenWrapper from "components/ScreenWrapper";
import useServiceRequest from "hooks/service_requests/useServiceRequest";
import useUpdateServiceRequest from "hooks/service_requests/useUpdateServiceRequest";
import { useAuth } from "providers/AuthProvider";
import { ServiceRequestScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { ServiceRequestStatus } from "types/generated";
import { mantineColors } from "utils/colors";
import { formatCost } from "utils/formatters";
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
      <KeyboardAvoidingView
        style={[commonStyles.container, commonStyles.defaultListGap]}
      >
        {data?.data.service && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Информация об услуге</Text>
            <View style={styles.cardInnerContainer}>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Название</Text>
                <Text style={styles.itemText}>{data.data.service.name}</Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Цена</Text>
                <Text style={styles.itemText}>
                  {formatCost(data.data.service.cost)}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Ожидаемый результат</Text>
                <Text style={styles.itemText}>
                  {data.data.service.expected_result}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Статус заявки</Text>
                <ServieRequestBadge status={data.data.status} />
              </View>
            </View>
          </View>
        )}

        {isOrganization ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Информация о заказчике</Text>
            <View style={styles.cardInnerContainer}>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Полное имя</Text>
                <Text style={styles.itemText}>
                  {data?.data.requested_by.full_name}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Электронная почта</Text>
                <Text style={styles.itemText}>
                  {data?.data.requested_by.email}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Номер телефона</Text>
                <Text style={styles.itemText}>
                  {data?.data.requested_by.contact || "-"}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Информация о поставщике</Text>
            <View style={styles.cardInnerContainer}>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Название организации</Text>
                <Text style={styles.itemText}>
                  {data?.data.service.organization.name}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Электронная почта</Text>
                <Text style={styles.itemText}>
                  {data?.data.service.organization.email}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Номер телефона</Text>
                <Text style={styles.itemText}>
                  {data?.data.service.organization.contact}
                </Text>
              </View>
            </View>
          </View>
        )}

        {data?.data.comment && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Комментарий от заказчика</Text>
            <View style={styles.cardInnerContainer}>
              <Text style={[styles.itemText, { textAlign: "left" }]}>
                {data.data.comment}
              </Text>
            </View>
          </View>
        )}

        {isOrganization && (
          <View style={commonStyles.defaultListGap}>
            {data?.data.status === "Pending" && (
              <>
                <SolidButton
                  title="Утвердить"
                  onPress={() => setIsApproveModalVisible(true)}
                />
                <OutlineButton
                  title="Отклонить"
                  onPress={() => setIsDeclineModalVisible(true)}
                  color="red"
                />
              </>
            )}
            {data?.data.status === "Approved" && (
              <SolidButton
                title="Завершить"
                onPress={() => setIsCompletedModalVisible(true)}
              />
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
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 6,
    gap: 24
  },
  cardTitle: {
    fontSize: 22,
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  },
  cardInnerContainer: {
    flex: 1,
    gap: 16
  },

  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  itemLabel: {
    color: mantineColors.dark[3],
    fontFamily: "GoogleSans-Regular"
  },
  itemText: {
    flex: 1,
    textAlign: "right",
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  }
});

export default ServiceRequestDetail;
