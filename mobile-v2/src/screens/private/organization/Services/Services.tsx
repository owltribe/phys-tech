import { useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import { FAB, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import useServices from "hooks/services/useServices";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import AddServiceModal from "./components/AddServiceModal";
import ServiceCard from "./components/ServiceCard";
import ServiceRequestCard from "./components/ServiceRequestCard";

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
  const [isAddServiceModalOpened, setIsAddServiceModalOpened] = useState(false);

  const isOrganization = user?.role === "Organization";

  const { data: servicesData, refetch: refetchServicesData } = useServices({
    organizationId: user?.organization?.id
  });
  const { data: serviceRequestsData, refetch: refetchServiceRequestsData } =
    useServiceRequests({
      organizationId: isOrganization ? user?.organization?.id : undefined,
      requestedById: !isOrganization ? user?.id : undefined
    });

  useRefreshOnFocus(refetchServicesData);
  useRefreshOnFocus(refetchServiceRequestsData);

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[commonStyles.container]}>
        <Text
          style={styles.text}
          variant="headlineLarge"
        >
          Мои Услуги
        </Text>
        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={(o) => setSelectedOption(o as OptionsType)}
        />
      </KeyboardAvoidingView>

      {selectedOption === SERVICES && (
        <>
          {servicesData?.data && (
            <FlatList
              data={servicesData?.data.items}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0}
              scrollEventThrottle={16}
              style={styles.container}
              contentContainerStyle={[
                commonStyles.defaultHorizontalPadding,
                styles.container
              ]}
              renderItem={({ item }) => (
                <ServiceCard
                  serviceData={item}
                  onPress={() =>
                    navigation.navigate("Service", {
                      serviceId: item.id
                    })
                  }
                />
              )}
            />
          )}
        </>
      )}
      {selectedOption === SERVICE_REQUESTS && (
        <>
          {serviceRequestsData?.data && (
            <FlatList
              data={serviceRequestsData?.data.items}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0}
              scrollEventThrottle={16}
              style={styles.container}
              contentContainerStyle={[
                commonStyles.defaultHorizontalPadding,
                styles.container
              ]}
              renderItem={({ item }) => (
                <ServiceRequestCard
                  serviceRequest={item}
                  onPress={() => {
                    if (isOrganization) {
                      navigation.navigate("ServiceRequest", {
                        serviceRequestId: item.id
                      });
                    } else {
                      navigation.navigate("Service", {
                        serviceId: item.service.id
                      });
                    }
                  }}
                />
              )}
            />
          )}
        </>
      )}

      {isOrganization && selectedOption === SERVICES && (
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
  container: {
    paddingBottom: 60
  },
  text: {
    marginVertical: 4,
    fontWeight: "700"
  },
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
