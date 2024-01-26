import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useServices from "hooks/services/useServices";
import ServiceCard from "screens/private/organization/Services/components/ServiceCard";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const ServicesList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { data, isLoading, isFetching } = useServices({
    search: search
  });

  return (
    <>
      {(isLoading || isFetching) && <ActivityIndicator size="large" />}

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
    </>
  );
};

export default ServicesList;
