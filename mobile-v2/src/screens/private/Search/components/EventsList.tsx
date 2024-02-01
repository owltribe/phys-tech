import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useEvents from "hooks/events/useEvents";
import EventCard from "screens/private/Search/components/EventCard";
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

  return (
    <>
      {(isLoading || isFetching) && <ActivityIndicator size="large" />}
      {isSuccess && !data?.data.items.length && (
        <EmptyStatement description="Нет мероприятий" />
      )}

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
      />
    </>
  );
};

export default EventsList;
