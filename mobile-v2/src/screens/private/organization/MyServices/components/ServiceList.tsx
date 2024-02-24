import { FlatList, StyleSheet } from "react-native";
import ServiceCard from "components/cards/ServiceCard";
import EmptyStatement from "components/EmptyStatement";
import Loader from "components/Loader";
import useServices from "hooks/services/useServices";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const ServiceList = ({
  navigation
}: {
  navigation: ServicesScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const { data, isLoading, isFetching, isSuccess } = useServices({
    organizationId: user?.organization?.id
  });

  const ListFooter = () => {
    if (isSuccess && !data?.data.items.length) {
      return <EmptyStatement description="У вас пока нет услуг" />;
    }
    if (isLoading || isFetching) {
      return <Loader size="large" />;
    }

    return null;
  };

  return (
    <FlatList
      data={data?.data.items}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0}
      scrollEventThrottle={16}
      style={styles.container}
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
      ListFooterComponent={ListFooter}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  }
});

export default ServiceList;
