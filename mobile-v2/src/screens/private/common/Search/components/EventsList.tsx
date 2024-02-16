import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useEvents from "hooks/events/useEvents";
import EventCard from "screens/private/common/Search/components/EventCard";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const EventsList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { data, isLoading, isFetching, isSuccess } = useEvents({
    search: search
  });

  const ListFooter = () => {
    if (isSuccess && !data?.data.items.length) {
      return <EmptyStatement description="Нет мероприятий" />;
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
      contentContainerStyle={[
        commonStyles.defaultHorizontalPadding,
        commonStyles.defaultVerticalPadding,
        commonStyles.defaultListGap
      ]}
      renderItem={({ item }) => (
        <EventCard
          eventData={item}
          onPress={() => navigation.navigate("Event", { eventId: item.id })}
        />
      )}
      ListFooterComponent={ListFooter}
    />
  );
};

export default EventsList;
