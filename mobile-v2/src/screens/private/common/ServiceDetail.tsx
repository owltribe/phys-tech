import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Divider, Snackbar, Text as PaperText } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import * as ImagePicker from "expo-image-picker";
import useCreateServiceRequest from "hooks/service_requests/useCreateServiceRequest";
import useService from "hooks/services/useService";
import useUploadServiceImage from "hooks/services/useUploadServiceImage";
import { ImageIcon, Instagram } from "lucide-react-native";
import { useAuth } from "providers/AuthProvider";
import { ServiceScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors } from "utils/colors";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravityAndOffset } from "utils/notifications";

import { formatCost } from "../../../utils/money-formatter";

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

  const handleNavigateToOrganization = (organizationId: string) => {
    navigation.navigate("Organization", {
      organizationId: organizationId
    });
  };

  return (
    <>
      <ScreenWrapper>
        <KeyboardAvoidingView
          style={[commonStyles.container, commonStyles.defaultListGap]}
        >
          {data?.data.service_images?.length ? (
            <Carousel
              loop={false}
              pagingEnabled
              style={styles.imageContainer}
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
            <View style={styles.imageContainer}>
              <Instagram
                size={42}
                color={mantineColors.dark[5]}
              />
            </View>
          )}

          {data?.data && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Главное</Text>
              <View style={styles.cardInnerContainer}>
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Название</Text>
                  <Text style={styles.itemText}>{data.data.name}</Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Ожидаемый результат</Text>
                  <Text style={styles.itemText}>
                    {data.data.expected_result}
                  </Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Цена</Text>
                  <Text style={styles.itemText}>
                    {formatCost(data.data.cost)}
                  </Text>
                </View>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Организация</Text>
                <Text
                  style={styles.itemLink}
                  onPress={() =>
                    handleNavigateToOrganization(data.data.organization.id)
                  }
                >
                  {data.data.organization.name}
                </Text>
              </View>
            </View>
          )}

          {data?.data.description && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Описание</Text>
              <View style={styles.cardInnerContainer}>
                <Text style={styles.itemText}>{data.data.description}</Text>
              </View>
            </View>
          )}

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
  imageContainer: {
    backgroundColor: mantineColors.gray[1],
    borderRadius: 16,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
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
    flex: 1,
    color: mantineColors.dark[3],
    fontFamily: "GoogleSans-Regular"
  },
  itemText: {
    flex: 1,
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  },
  itemLink: {
    flex: 1,
    color: mantineColors.blue[5],
    fontFamily: "GoogleSans-MediumItalic",
    textDecorationLine: "underline"
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
