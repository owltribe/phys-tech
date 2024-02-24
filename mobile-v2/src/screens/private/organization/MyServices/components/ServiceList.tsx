import { FlatList, RefreshControl, StyleSheet } from "react-native";
import ServiceCard from "components/cards/ServiceCard";
import EmptyStatement from "components/EmptyStatement";
import useServices from "hooks/services/useServices";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { refreshControlColors } from "utils/colors";

const ServiceList = ({
  navigation
}: {
  navigation: ServicesScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const { data, refetch, isLoading, isFetching, isSuccess } = useServices({
    organizationId: user?.organization?.id
  });

  return (
    <FlatList
      data={data?.data.items}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0}
      scrollEventThrottle={16}
      style={styles.container}
      refreshing={isLoading || isFetching}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isFetching}
          onRefresh={refetch}
          colors={refreshControlColors}
        />
      }
      ListEmptyComponent={<EmptyStatement description="У вас нет услуг" />}
      contentContainerStyle={[
        styles.container,
        commonStyles.defaultHorizontalPadding,
        commonStyles.defaultVerticalPadding,
        commonStyles.defaultListGap
      ]}
      renderItem={({ item }) => (
        <ServiceCard
          data={item}
          onPress={() => navigation.navigate("Service", { serviceId: item.id })}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80
  }
});

export default ServiceList;
