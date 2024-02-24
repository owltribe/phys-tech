import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { FAB } from "react-native-paper";
import EventCard from "components/cards/EventCard";
import EmptyStatement from "components/EmptyStatement";
import useEvents from "hooks/events/useEvents";
import { useAuth } from "providers/AuthProvider";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors, refreshControlColors, white } from "utils/colors";

const EventsList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const { user } = useAuth();

  const { data, refetch, isLoading, isFetching } = useEvents({
    search: search
  });

  const isOrganization = user?.role === "Organization";

  return (
    <>
      <FlatList
        data={data?.data.items}
        contentContainerStyle={[
          styles.container,
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

      {isOrganization && (
        <FAB
          label="Добавить"
          icon="plus"
          style={styles.fab}
          color={white}
          onPress={() => SheetManager.show("EventCreation")}
          animated
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 80
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: 0,
    bottom: 0,

    backgroundColor: mantineColors.blue[5]
  }
});

export default EventsList;
