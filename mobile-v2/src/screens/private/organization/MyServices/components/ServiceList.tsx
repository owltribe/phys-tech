import { FlatList, StyleSheet } from "react-native";
import useServices from "hooks/services/useServices";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import useServicesForUserRequests from "../../../../../hooks/services/useServicesForUserRequests";

import ServiceCard from "./ServiceCard";

const ServiceList = ({
  navigation
}: {
  navigation: ServicesScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const isClientRole = !!user?.role && user.role === "Client";

  const { data: servicesData, refetch: refetchServicesData } = useServices({
    organizationId: user?.organization?.id,
    enabled: !isClientRole
  });
  const { data, refetch } = useServicesForUserRequests({
    enabled: isClientRole
  });

  useRefreshOnFocus(refetchServicesData);
  useRefreshOnFocus(refetch);

  return (
    <FlatList
      data={isClientRole ? data?.data.items : servicesData?.data.items}
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  }
});

export default ServiceList;
