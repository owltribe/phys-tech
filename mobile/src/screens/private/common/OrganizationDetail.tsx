import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import ServiceCard from "components/cards/ServiceCard";
import ScreenWrapper from "components/ScreenWrapper";
import useOrganization from "hooks/organization/useOrganization";
import { Building2 } from "lucide-react-native";
import { OrganizationScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors, white } from "utils/colors";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";
import { fontPixel, fontSize } from "utils/font-helper";

const OrganizationDetail = ({
  route: {
    params: { organizationId }
  },
  navigation
}: OrganizationScreenProps) => {
  const { data } = useOrganization(organizationId);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={[commonStyles.container, commonStyles.defaultListGap]}
      >
        <View style={styles.imageContainer}>
          {data?.data.photo ? (
            <Image
              source={{ uri: data?.data.photo + "?" + new Date() }}
              style={styles.image}
            />
          ) : (
            <View style={styles.image}>
              <Building2
                size={60}
                color={white}
              />
            </View>
          )}
          <Text style={styles.title}>{data?.data.name}</Text>
        </View>

        {data?.data && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Главное</Text>
              <View style={styles.cardInnerContainer}>
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Категория</Text>
                  <Text style={styles.itemText}>
                    {getOrganizationCategoryLabel(data.data.category)}
                  </Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>БИН</Text>
                  <Text style={styles.itemText}>{data.data.bin}</Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Адрес</Text>
                  <Text style={styles.itemText}>{data.data.address}</Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Номер телефона</Text>
                  <Text style={styles.itemText}>
                    {data.data.contact || "-"}
                  </Text>
                </View>
                <Divider bold />
                <View style={styles.item}>
                  <Text style={styles.itemLabel}>Почта</Text>
                  <Text style={styles.itemText}>{data.data.email}</Text>
                </View>
              </View>
            </View>

            {data.data.description && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Описание</Text>
                <View style={styles.cardInnerContainer}>
                  <Text style={[styles.itemText, { textAlign: "left" }]}>
                    {data.data.description}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        {!!data?.data.services.length && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Сервисы</Text>
            <View style={styles.cardInnerContainer}>
              {data.data.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  data={service}
                  onPress={() =>
                    navigation.navigate("Service", { serviceId: service.id })
                  }
                  organizationView
                />
              ))}
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 18
  },
  image: {
    flex: 1,
    width: 160,
    height: 160,
    borderRadius: 50,
    backgroundColor: mantineColors.blue[4],
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: fontSize.large,
    fontFamily: "GoogleSans-Regular"
  },

  card: {
    borderRadius: 16,
    paddingVertical: 18,
    gap: 24
  },
  cardTitle: {
    fontSize: fontPixel(22),
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
    display: "flex",
    flexWrap: "nowrap",
    width: "auto",
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

export default OrganizationDetail;
