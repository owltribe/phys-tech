import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import dayjs from "dayjs";
import { EventRead } from "types/generated";
import { transparent } from "utils/colors";

const localImage = require("../../../../../assets/calendar.png");

const EventCard = ({
  eventData,
  onPress
}: {
  eventData: EventRead;
  onPress: () => void;
}) => {
  return (
    <Card mode="elevated">
      <Card.Content style={styles.content}>
        <Card.Title
          title={eventData.name}
          subtitle={dayjs(eventData.start_date).format("DD MMMM YYYY")}
          titleVariant="titleMedium"
          style={styles.title}
          left={() => (
            <Avatar.Image
              source={localImage}
              size={50}
              style={styles.squareAvatar}
            />
          )}
          right={() => (
            <IconButton
              icon="chevron-right"
              onPress={onPress}
            />
          )}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  title: {
    flexShrink: 1,
    marginVertical: 0
  },
  startDate: {
    color: "#888",
    textAlign: "left"
  },
  squareAvatar: {
    borderRadius: 10,
    backgroundColor: transparent
  }
});

export default EventCard;
