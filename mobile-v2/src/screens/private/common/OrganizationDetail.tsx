import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import useOrganization from "hooks/organization/useOrganization";
import { OrganizationScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const OrganizationDetail = ({
  route: {
    params: { organizationId }
  }
}: OrganizationScreenProps) => {
  const { data } = useOrganization(organizationId);

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
        <Text variant="titleMedium">{`Описание: ${data?.data.description}`}</Text>
        <Text variant="titleMedium">{`БИН: ${data?.data.bin}`}</Text>
        <Text variant="titleMedium">{`Адрес: ${data?.data.address}`}</Text>
        <Text variant="titleMedium">{`Контактные данные: ${data?.data.contact}`}</Text>
        <Text variant="titleMedium">{`Почта: ${data?.data.email}`}</Text>
        <Text variant="titleMedium">{`Категория: ${data?.data.category}`}</Text>
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
  }
});

export default OrganizationDetail;
