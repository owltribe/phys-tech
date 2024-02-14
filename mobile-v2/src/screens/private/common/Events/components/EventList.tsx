import { FlatList, StyleSheet } from "react-native";
import useEvents from "hooks/events/useEvents";
import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
import { EventsScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import EventCard from "../../Search/components/EventCard";

const EventList = ({
  navigation
}: {
  navigation: EventsScreenProps["navigation"];
}) => {
  const { data: eventsData, refetch: refetchEventsData } = useEvents({
    eventName: undefined
  });

  useRefreshOnFocus(refetchEventsData);

  return (
    <FlatList
      data={eventsData?.data.items}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0}
      scrollEventThrottle={16}
      style={styles.container}
      contentContainerStyle={[
        commonStyles.defaultHorizontalPadding,
        styles.container,
        commonStyles.defaultListGap
      ]}
      renderItem={({ item }) => (
        <EventCard
          eventData={item}
          onPress={() =>
            navigation.navigate("Event", {
              eventId: item.id
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60
  }
});

export default EventList;
