import { FlatList, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useServices from "hooks/services/useServices";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import ServiceCard from "./ServiceCard";

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
    <FlatList
      data={data?.data.items}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0}
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={[
        commonStyles.defaultHorizontalPadding,
        commonStyles.defaultVerticalPadding,
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
