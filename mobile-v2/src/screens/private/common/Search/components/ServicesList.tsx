import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useServices from "hooks/services/useServices";
import ServiceCard from "screens/private/organization/MyServices/components/ServiceCard";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const ServicesList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { data, isLoading, isFetching, isSuccess } = useServices({
    search: search
  });

  return (
    <>
      {isSuccess && !data?.data.items.length && (
        <EmptyStatement description="Нет доступных услуг" />
      )}

      <FlatList
        data={data?.data.items}
        contentContainerStyle={[
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultListGap
        ]}
        renderItem={({ item }) => (
          <ServiceCard
            serviceData={item}
            onPress={() =>
              navigation.navigate("Service", { serviceId: item.id })
            }
          />
        )}
      />

      {(isLoading || isFetching) && <ActivityIndicator size="large" />}
    </>
  );
};

export default ServicesList;
