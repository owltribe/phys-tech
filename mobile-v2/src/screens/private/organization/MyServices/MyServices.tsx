import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import Header from "components/typography/Header";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import AddServiceModal from "./components/AddServiceModal";
import ServiceList from "./components/ServiceList";
import ServiceRequestsList from "./components/ServiceRequestsList";

const MyServices = "Services";
const SERVICE_REQUESTS = "ServiceRequests";

const options = [
  { label: "Услуги", value: MyServices },
  { label: "Заявки", value: SERVICE_REQUESTS }
];

type OptionsType = "Services" | "ServiceRequests";

const Services = ({ navigation }: ServicesScreenProps) => {
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState<OptionsType>(MyServices);
  const [isAddServiceModalOpened, setIsAddServiceModalOpened] = useState(false);

  const isOrganization = user?.role === "Organization";

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[commonStyles.container]}>
        <Header align="left">Мои Услуги</Header>
        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={(o) => setSelectedOption(o as OptionsType)}
        />
      </KeyboardAvoidingView>

      {selectedOption === MyServices && (
        <ServiceList
          navigation={navigation}
          isEditable
        />
      )}
      {selectedOption === SERVICE_REQUESTS && (
        <ServiceRequestsList navigation={navigation} />
      )}

      {isOrganization && selectedOption === MyServices && (
        <>
          <FAB
            label="Добавить услугу"
            icon="plus"
            style={styles.fab}
            onPress={() => setIsAddServiceModalOpened(true)}
            animated
          />
          <AddServiceModal
            visible={isAddServiceModalOpened}
            onClose={() => setIsAddServiceModalOpened(false)}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: 72,
    height: 72
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default Services;
