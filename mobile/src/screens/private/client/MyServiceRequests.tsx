import { KeyboardAvoidingView, StatusBar, View } from "react-native";
import ScreenWrapper from "components/ScreenWrapper";
import Header from "components/typography/Header";
import ServiceRequestsList from "screens/private/organization/MyServices/components/ServiceRequestsList";
import { ServiceRequestsScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const MyServiceRequests = ({ navigation }: ServiceRequestsScreenProps) => {
  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[{ paddingTop: StatusBar.currentHeight }]}>
        <View style={commonStyles.defaultHorizontalPadding}>
          <Header align="left">Мои заявки</Header>
        </View>
      </KeyboardAvoidingView>

      <ServiceRequestsList navigation={navigation} />
    </ScreenWrapper>
  );
};

export default MyServiceRequests;
