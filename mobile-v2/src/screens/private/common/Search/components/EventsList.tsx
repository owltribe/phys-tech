import { FlatList, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { ActivityIndicator, FAB } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useEvents from "hooks/events/useEvents";
import { useAuth } from "providers/AuthProvider";
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
  const { user } = useAuth();

  const { data, isLoading, isFetching, isSuccess } = useEvents({
    search: search
  });

  const isOrganization = user?.role === "Organization";

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
    <>
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

      {isOrganization && (
        <FAB
          label="Добавить"
          icon="plus"
          style={styles.fab}
          onPress={() => SheetManager.show("EventCreation")}
          animated
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default EventsList;
