import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Icon, Snackbar, Surface, Text } from "react-native-paper";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useCreateServiceRequest from "hooks/service_requests/useCreateServiceRequest";
import useService from "hooks/services/useService";
import { useAuth } from "providers/AuthProvider";
import { ServiceScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const ServiceDetail = ({
  route: {
    params: { serviceId }
  }
}: ServiceScreenProps) => {
  const { user } = useAuth();

  const [serviceRequestResponse, setServiceRequestResponse] = useState<
    string | null
  >(null);

  const { data, isSuccess, isLoading } = useService(serviceId);

  const createServiceRequestMutation = useCreateServiceRequest();

  const handleSubmit = () => {
    if (isSuccess && data?.data) {
      createServiceRequestMutation.mutate(
        { service_id: serviceId },
        {
          onSuccess: (response) => {
            setServiceRequestResponse(
              `Заявка на услугу "${response.data.service.name}" была создана. Переключитесь на вкладку заявки, чтобы посмотреть актуальный статус.`
            );
          },
          onError: (error) => {
            setServiceRequestResponse(
              `Ошибка создания заявки на услугу. Повторите позже. ${String(
                error.response?.data.detail
              )}`
            );
          }
        }
      );
    }
  };

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Surface
          style={styles.surface}
          mode="flat"
          elevation={4}
        >
          <Icon
            source="camera"
            size={42}
          />
        </Surface>

        <Text
          variant="headlineSmall"
          style={{ fontWeight: "700" }}
        >
          {data?.data.name}
        </Text>
        <Text variant="titleMedium">{`Ожидаемый результат: ${data?.data.expected_result}`}</Text>
        <Text variant="titleMedium">{data?.data.description}</Text>

        <View style={styles.button}>
          <PrimaryButton
            mode="contained"
            loading={createServiceRequestMutation.isPending}
            disabled={isLoading || user?.role === "Organization"}
            onPress={handleSubmit}
          >
            Запросить услугу
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>

      <Snackbar
        visible={!!serviceRequestResponse}
        onDismiss={() => setServiceRequestResponse(null)}
        action={{
          label: "Закрыть",
          onPress: () => setServiceRequestResponse(null)
        }}
        duration={Snackbar.DURATION_LONG}
      >
        {serviceRequestResponse}
      </Snackbar>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 16,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 16
  }
});

export default ServiceDetail;
