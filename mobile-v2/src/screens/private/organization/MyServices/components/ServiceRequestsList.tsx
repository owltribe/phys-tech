import { FlatList, StyleSheet } from "react-native";
import ServiceRequestCard from "components/cards/ServiceRequestCard";
import EmptyStatement from "components/EmptyStatement";
import Loader from "components/Loader";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import { useAuth } from "providers/AuthProvider";
import { ServiceRequestsScreenProps, ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

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
        <Loader
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
          styles.container,
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
