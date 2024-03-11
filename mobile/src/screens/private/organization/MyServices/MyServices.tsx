import { useState } from "react";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { FAB } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import Header from "components/typography/Header";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors, white } from "utils/colors";

import ServiceList from "./components/ServiceList";
import ServiceRequestsList from "./components/ServiceRequestsList";

const SERVICES = "Services";
const SERVICE_REQUESTS = "ServiceRequests";

const options = [
  { label: "Услуги", value: SERVICES },
  { label: "Заявки", value: SERVICE_REQUESTS }
];

type OptionsType = "Services" | "ServiceRequests";

const Services = ({ navigation }: ServicesScreenProps) => {
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState<OptionsType>(SERVICES);

  const isOrganization = user?.role === "Organization";

  return (
    <>
      <ScreenWrapper withScrollView={false}>
        <KeyboardAvoidingView style={[{ paddingTop: StatusBar.currentHeight }]}>
          <View style={[commonStyles.defaultHorizontalPadding]}>
            <Header align="left">Мои Услуги</Header>
            <SegmentedControl
              options={options}
              selectedOption={selectedOption}
              onOptionPress={(o) => setSelectedOption(o as OptionsType)}
            />
          </View>
        </KeyboardAvoidingView>

        {selectedOption === SERVICES && <ServiceList navigation={navigation} />}
        {selectedOption === SERVICE_REQUESTS && (
          <ServiceRequestsList navigation={navigation} />
        )}

        {isOrganization && selectedOption === SERVICES && (
          <>
            <FAB
              label="Добавить услугу"
              icon="plus"
              style={styles.fab}
              color={white}
              onPress={() => SheetManager.show("ServiceCreation")}
              animated
            />
          </>
        )}
      </ScreenWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,

    backgroundColor: mantineColors.blue[5]
  }
});

export default Services;
