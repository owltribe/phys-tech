import { FlatList, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import { useAuth } from "providers/AuthProvider";
import { ServiceRequestsScreenProps, ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import ServiceRequestCard from "./ServiceRequestCard";

const ServiceRequestsList = ({
  navigation
}: {
  navigation:
    | ServicesScreenProps["navigation"]
    | ServiceRequestsScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const isOrganization = user?.role === "Organization";

  const { data, isSuccess, isLoading, isFetching } = useServiceRequests({
    organizationId: isOrganization ? user?.organization?.id : undefined,
    requestedById: !isOrganization ? user?.id : undefined
  });

  const ListFooter = () => {
    if (isSuccess && !data?.data.items.length) {
      return <EmptyStatement description="Нет заявок" />;
    }
    if (isLoading || isFetching) {
      return (
        <ActivityIndicator
          size="large"
          style={commonStyles.loadderMargin}
        />
      );
    }

    return null;
  };

  return (
    <>
      <FlatList
        data={data?.data.items}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={[
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultListGap,
          styles.container
        ]}
        renderItem={({ item }) => (
          <ServiceRequestCard
            serviceRequest={item}
            onPress={() => {
              navigation.navigate("ServiceRequest", {
                serviceRequestId: item.id
              });
            }}
          />
        )}
        ListFooterComponent={ListFooter}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  }
});

export default ServiceRequestsList;
