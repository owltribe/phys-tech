import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View
} from "react-native";
import { COLOR_TEXT_DEFAULT } from "react-native-onboard/lib/OnboardFlow/constants";
import { Snackbar, Surface, Text } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import * as ImagePicker from "expo-image-picker";
import useCreateServiceRequest from "hooks/service_requests/useCreateServiceRequest";
import useService from "hooks/services/useService";
import useUploadServiceImage from "hooks/services/useUploadServiceImage";
import { ImageIcon } from "lucide-react-native";
import { useAuth } from "providers/AuthProvider";
import { ServiceScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravityAndOffset } from "utils/notifications";

const ServiceDetail = ({
  navigation,
  route: {
    params: { serviceId }
  }
}: ServiceScreenProps) => {
  const width = Dimensions.get("window").width;
  const { user } = useAuth();

  const [snackbarContent, setSnackbarContent] = useState<{
    message: string;
    requestId: string | null;
  } | null>(null);

  const { data, isSuccess, isLoading } = useService(serviceId);

  const createServiceRequestMutation = useCreateServiceRequest();
  const uploadServiceImageMutation = useUploadServiceImage(serviceId);

  const isOrganization = user?.role === "Organization";

  const handleSubmit = () => {
    if (isSuccess && data?.data) {
      createServiceRequestMutation.mutate(
        { service_id: serviceId },
        {
          onSuccess: (response) => {
            setSnackbarContent({
              message: `Заявка на услугу "${response.data.service.name}" была создана. Переключитесь на вкладку заявки, чтобы посмотреть актуальный статус.`,
              requestId: response.data.id
            });
          },
          onError: (error) => {
            setSnackbarContent({
              message: `Ошибка создания заявки на услугу. Повторите позже. ${String(
                error.response?.data.detail
              )}`,
              requestId: null
            });
          }
        }
      );
    }
  };

  const handleUploadServiceImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const formData = new FormData();

      const image = {
        uri: result.assets[0].uri,
        type: "image/png",
        name: `service-image-${serviceId}`
      };
      // @ts-ignore
      formData.append("image", image);

      uploadServiceImageMutation.mutate(formData, {
        onSuccess: () => {
          showToastWithGravityAndOffset("Изображение успешно загружено");
        },
        onError: (error) => {
          showToastWithGravityAndOffset(
            getFormattedError(
              error.response?.data.detail || "Не удалось загрузить изображение"
            )
          );
        }
      });
    }
  };

  return (
    <>
      <ScreenWrapper>
        <KeyboardAvoidingView style={commonStyles.container}>
          {data?.data.service_images?.length ? (
            <Carousel
              loop={false}
              pagingEnabled
              style={styles.surface}
              width={width - 16 * 2}
              height={width / 2}
              data={data?.data.service_images || []}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <Image
                  source={{
                    uri: item.url
                  }}
                  style={styles.image}
                />
              )}
            />
          ) : (
            <Surface
              style={styles.surface}
              mode="flat"
              elevation={4}
            >
              <ImageIcon
                size={42}
                color={COLOR_TEXT_DEFAULT}
              />
            </Surface>
          )}

          <Text
            variant="headlineSmall"
            style={{ fontWeight: "700" }}
          >
            {data?.data.name}
          </Text>
          <Text variant="titleMedium">{`Ожидаемый результат: ${data?.data.expected_result}`}</Text>
          <Text variant="titleMedium">{`Описание: ${data?.data.description}`}</Text>
          <Text variant="titleMedium">{`Цена: ${data?.data.cost} KZT`}</Text>

          <View style={styles.button}>
            {isOrganization && data?.data.is_editable && (
              <PrimaryButton
                mode="contained"
                icon={(props) => (
                  <ImageIcon
                    {...props}
                    size={22}
                  />
                )}
                loading={uploadServiceImageMutation.isPending}
                disabled={isLoading}
                onPress={handleUploadServiceImage}
              >
                Добавить изображение
              </PrimaryButton>
            )}
            {!isOrganization && (
              <PrimaryButton
                mode="contained"
                loading={createServiceRequestMutation.isPending}
                disabled={isLoading || user?.role === "Organization"}
                onPress={handleSubmit}
              >
                Запросить услугу
              </PrimaryButton>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>

      <Snackbar
        visible={!!snackbarContent}
        onDismiss={() => setSnackbarContent(null)}
        action={{
          label: snackbarContent?.requestId ? "Перейти к заявке" : "Закрыть",
          onPress: () => {
            if (snackbarContent?.requestId) {
              navigation.navigate("ServiceRequest", {
                serviceRequestId: snackbarContent.requestId
              });
            } else {
              setSnackbarContent(null);
            }
          }
        }}
        duration={Snackbar.DURATION_LONG}
      >
        {snackbarContent?.message}
      </Snackbar>
    </>
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
  },
  image: {
    flex: 1,
    width: "100%"
  }
});

export default ServiceDetail;
