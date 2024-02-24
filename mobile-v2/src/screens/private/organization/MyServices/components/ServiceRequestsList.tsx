import { FlatList, RefreshControl, StyleSheet } from "react-native";
import ServiceRequestCard from "components/cards/ServiceRequestCard";
import EmptyStatement from "components/EmptyStatement";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import { useAuth } from "providers/AuthProvider";
import { ServiceRequestsScreenProps, ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { refreshControlColors } from "utils/colors";

const ServiceRequestsList = ({
  navigation
}: {
  navigation:
    | ServicesScreenProps["navigation"]
    | ServiceRequestsScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const isOrganization = user?.role === "Organization";

  const { data, refetch, isLoading, isFetching } = useServiceRequests({
    organizationId: isOrganization ? user?.organization?.id : undefined,
    requestedById: !isOrganization ? user?.id : undefined
  });

  return (
    <>
      <FlatList
        data={data?.data.items}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0}
        scrollEventThrottle={16}
        style={styles.container}
        onRefresh={refetch}
        refreshing={isLoading || isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isFetching}
            onRefresh={refetch}
            colors={refreshControlColors}
          />
        }
        ListEmptyComponent={
          <EmptyStatement description="У вас нет заявок на услуги" />
        }
        contentContainerStyle={[
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultListGap
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
