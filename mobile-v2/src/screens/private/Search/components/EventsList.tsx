import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import useEvents from "hooks/events/useEvents";
import EventCard from "screens/private/Events/components/EventCard";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const EventsList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { data, isLoading, isFetching } = useEvents({
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
