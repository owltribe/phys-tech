import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
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

  const { data } = useService(serviceId);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        {/*<Image*/}
        {/*  source={{*/}
        {/*    uri: "https://sev.severance.healthcare/_res/yuhs/sev-en/img/ihc/medical-service/img-medical-service.jpg"*/}
        {/*  }}*/}
        {/*  width="100%"*/}
        {/*  height={200}*/}
        {/*  borderRadius="$space.4"*/}
        {/*/>*/}

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
            disabled={user?.role === "Organization"}
            onPress={() => {}}
          >
            Запросить услугу
          </PrimaryButton>
        </View>
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

export default ServiceDetail;
