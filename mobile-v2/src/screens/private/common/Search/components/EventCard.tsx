import "dayjs/locale/ru";

import { StyleSheet } from "react-native";
import { Avatar, Card, IconButton, MD2Colors } from "react-native-paper";
import dayjs from "dayjs";
import { EventRead } from "types/generated";
import { transparent } from "utils/colors";

const localImage = require("images/icons/calendar.png");

const EventCard = ({
  eventData,
  onPress
}: {
  eventData: EventRead;
  onPress: () => void;
}) => {
  const fullStartDate = dayjs(`${eventData.start_date}T${eventData.start_time}`)
    .locale("ru")
    .format("DD MMMM YYYY HH:MM");

  return (
    <Card
      mode="elevated"
      onPress={onPress}
      style={{ backgroundColor: MD2Colors.white }}
    >
      <Card.Content style={styles.content}>
        <Card.Title
          title={eventData.name}
          subtitle={fullStartDate}
          titleVariant="titleMedium"
          style={styles.title}
          left={() => (
            <Avatar.Image
              source={localImage}
              size={50}
              style={styles.squareAvatar}
            />
          )}
          right={() => <IconButton icon="chevron-right" />}
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
    backgroundColor: transparent,
    marginRight: 12
  }
});

export default EventCard;
