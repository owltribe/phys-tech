import { KeyboardAvoidingView, StyleSheet } from "react-native";
import ScreenWrapper from "components/ScreenWrapper";
import Header from "components/typography/Header";
import ServiceRequestsList from "screens/private/organization/MyServices/components/ServiceRequestsList";
import { ServiceRequestsScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const MyServiceRequests = ({ navigation }: ServiceRequestsScreenProps) => {
  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[commonStyles.container]}>
        <Header>Мои заявки</Header>
      </KeyboardAvoidingView>

      <ServiceRequestsList navigation={navigation} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    marginBottom: 4,
    fontWeight: "700"
  }
});

export default MyServiceRequests;
