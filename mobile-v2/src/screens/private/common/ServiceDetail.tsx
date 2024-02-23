import { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Divider, Snackbar } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import ScreenWrapper from "components/ScreenWrapper";
import useCreateServiceRequest from "hooks/service_requests/useCreateServiceRequest";
import useDestroyService from "hooks/services/useDestroyService";
import useService from "hooks/services/useService";
import { Bolt, SquarePen, Trash2 } from "lucide-react-native";
import { useAuth } from "providers/AuthProvider";
import { ServiceScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors } from "utils/colors";
import { getFormattedError } from "utils/error-helper";
import { formatCost } from "utils/money-formatter";
import { showToastWithGravityAndOffset } from "utils/notifications";

const ServiceDetail = ({
  navigation,
  route: {
    params: { serviceId }
  }
}: ServiceScreenProps) => {
  const width = Dimensions.get("window").width;
  const { user } = useAuth();

  const { data, isLoading } = useService(serviceId);

  const destroyServiceMutation = useDestroyService(serviceId);

  const isOrganization = user?.role === "Organization";

  const handleNavigateToOrganization = (organizationId: string) => {
    navigation.navigate("Organization", {
      organizationId: organizationId
    });
  };

  const handleDestroyService = () => {
    destroyServiceMutation.mutate(undefined, {
      onSuccess: () => {
        showToastWithGravityAndOffset(
          `Услуга "${data?.data.name}" была удалена.`
        );
        navigation.navigate("Services");
      },
      onError: (e) => {
        showToastWithGravityAndOffset(
          `Ошибка удаление услуги. ${getFormattedError(
            e.response?.data.detail || ""
          )}`
        );
        navigation.navigate("Services");
      }
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
              <Bolt
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
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Номер телефона</Text>
                  <Text style={styles.itemText}>
                    {data.data.organization.contact}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {data?.data.description && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Описание</Text>
              <View style={styles.cardInnerContainer}>
                <Text style={[styles.itemText, { textAlign: "left" }]}>
                  {data.data.description}
                </Text>
              </View>
            </View>
          )}

          {data?.data.is_editable && isOrganization && (
            <>
              <SolidButton
                title="Редактировать"
                Icon={SquarePen}
                onPress={() =>
                  navigation.navigate("ServiceEdit", { service: data.data })
                }
              />
              <OutlineButton
                title="Удалить"
                color="red"
                Icon={Trash2}
                loading={destroyServiceMutation.isPending}
                onPress={handleDestroyService}
              />
            </>
          )}

          {data?.data && !isOrganization && (
            <SolidButton
              title="Запросить услугу"
              // loading={createServiceRequestMutation.isPending}
              disabled={isLoading}
              onPress={() =>
                SheetManager.show("ServiceRequestCreation", {
                  payload: { serviceId: data.data.id }
                })
              }
              // onPress={handleSubmit}
            />
          )}
        </KeyboardAvoidingView>
      </ScreenWrapper>

      {/*<Snackbar*/}
      {/*  visible={!!snackbarContent}*/}
      {/*  onDismiss={() => setSnackbarContent(null)}*/}
      {/*  action={{*/}
      {/*    label: snackbarContent?.requestId ? "Перейти к заявке" : "Закрыть",*/}
      {/*    onPress: () => {*/}
      {/*      if (snackbarContent?.requestId) {*/}
      {/*        navigation.navigate("ServiceRequest", {*/}
      {/*          serviceRequestId: snackbarContent.requestId*/}
      {/*        });*/}
      {/*      } else {*/}
      {/*        setSnackbarContent(null);*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  duration={Snackbar.DURATION_LONG}*/}
      {/*>*/}
      {/*  {snackbarContent?.message}*/}
      {/*</Snackbar>*/}
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
    textAlign: "right",
    flex: 1,
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  },
  itemLink: {
    textAlign: "right",
    flex: 1,
    color: mantineColors.blue[5],
    fontFamily: "GoogleSans-MediumItalic",
    textDecorationLine: "underline"
  },

  image: {
    flex: 1,
    width: "100%"
  }
});

export default ServiceDetail;
