import "dayjs/locale/ru";

import dayjs from "dayjs";
import { Calendar } from "lucide-react-native";
import { EventRead } from "types/generated";

import BaseCard from "./BaseCard";

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
    <BaseCard
      title={eventData.name}
      description={`Дата начала: ${fullStartDate}`}
      descriptionNumberOfLines={2}
      onPress={onPress}
      Icon={Calendar}
    />
  );
};

export default EventCard;
