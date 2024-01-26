import { FlatList, StyleSheet } from "react-native";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import useServices from "hooks/services/useServices";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import ServiceRequestCard from "./ServiceRequestCard";

const ServiceRequestsList = ({
  navigation
}: {
  navigation: ServicesScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const isOrganization = user?.role === "Organization";

  const { data: serviceRequestsData, refetch: refetchServiceRequestsData } =
    useServiceRequests({
      organizationId: isOrganization ? user?.organization?.id : undefined,
      requestedById: !isOrganization ? user?.id : undefined
    });

  useRefreshOnFocus(refetchServiceRequestsData);

  return (
    <FlatList
      data={serviceRequestsData?.data.items}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0}
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={[
        commonStyles.defaultHorizontalPadding,
        commonStyles.defaultListGap,
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  }
});

export default ServiceRequestsList;
