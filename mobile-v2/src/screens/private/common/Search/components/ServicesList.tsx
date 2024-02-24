import { FlatList, RefreshControl } from "react-native";
import ServiceCard from "components/cards/ServiceCard";
import EmptyStatement from "components/EmptyStatement";
import useServices from "hooks/services/useServices";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { refreshControlColors } from "utils/colors";

const ServicesList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { data, refetch, isLoading, isFetching } = useServices({
    search: search
  });

  return (
    <FlatList
      data={data?.data.items}
      contentContainerStyle={[
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
      refreshing={isLoading || isFetching}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isFetching}
          onRefresh={refetch}
          colors={refreshControlColors}
        />
      }
      ListEmptyComponent={
        <EmptyStatement description="Нет доступных организаций" />
      }
    />
  );
};

export default ServicesList;
