import { StyleSheet } from "react-native";
import { Card, IconButton, Avatar } from "react-native-paper";
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
          subtitle={eventData.description}
          titleVariant="titleMedium"
          style={styles.title}
          left={() => (
            <Avatar.Image
              source={localImage}
              size={50} // Adjust the size as needed
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
  squareAvatar: {
    borderRadius: 10,
    backgroundColor: transparent
  }
});

export default EventCard;
