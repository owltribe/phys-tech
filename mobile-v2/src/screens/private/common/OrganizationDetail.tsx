import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import useOrganization from "hooks/organization/useOrganization";
import { OrganizationScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";

const OrganizationDetail = ({
  route: {
    params: { organizationId }
  }
}: OrganizationScreenProps) => {
  const { data } = useOrganization(organizationId);

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={commonStyles.container}>
        <View style={styles.imageContainer}>
          {data?.data.photo ? (
            <Avatar.Image
              size={142}
              source={{ uri: data.data.photo }}
            />
          ) : (
            <Avatar.Icon
              size={142}
              icon="camera"
            />
          )}
        </View>

        {/*<Surface*/}
        {/*  style={styles.surface}*/}
        {/*  mode="flat"*/}
        {/*  elevation={4}*/}
        {/*>*/}
        {/*  <Icon*/}
        {/*    source="camera"*/}
        {/*    size={42}*/}
        {/*  />*/}
        {/*</Surface>*/}

        <Text
          variant="headlineSmall"
          style={{ fontWeight: "700" }}
        >
          {data?.data.name}
        </Text>
        <Text variant="titleMedium">{`Описание: ${data?.data.description}`}</Text>
        <Text variant="titleMedium">{`БИН: ${data?.data.bin}`}</Text>
        <Text variant="titleMedium">{`Адрес: ${data?.data.address}`}</Text>
        <Text variant="titleMedium">{`Контактные данные: ${data?.data.contact}`}</Text>
        <Text variant="titleMedium">{`Почта: ${data?.data.email}`}</Text>
        {data?.data.category && (
          <Text variant="titleMedium">
            {`Категория: ${getOrganizationCategoryLabel(data?.data.category)}`}
          </Text>
        )}
      </KeyboardAvoidingView>
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
  },
  imageContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OrganizationDetail;
