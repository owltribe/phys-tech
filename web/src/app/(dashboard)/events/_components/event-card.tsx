import Link from "next/link";
import {EventRead} from "@/types/generated";
import {Calendar, Clock, MapPin} from "lucide-react";
import dayjs from "dayjs";

import "dayjs/locale/ru";
import {Badge, Flex, Heading, Text} from "@radix-ui/themes";
import {formatMinutesToHoursMinutes} from "@/lib/formatters";

interface EventCardProps {
  event: EventRead
}

const EventCard = ({ event }: EventCardProps) => {
  const fullStartDate = dayjs(`${event.start_date}T${event.start_time}`)
    .locale("ru")
    .format("DD MMMM YYYY HH:MM")

  return (
    <Link href={`/events/${event.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="bg-gray-100 flex w-full h-full justify-center items-center">
            <Calendar className="h-7 w-7" />
          </div>
        </div>

        <Flex pt="2" p="3" direction="column">
          <Text color="gray" size="2" className="uppercase">
            {fullStartDate}
          </Text>

          <Heading size="4" mt="3" className="line-clamp-2">
            {event.name}
          </Heading>

          <Text color="gray" size="2" mt="2" className="line-clamp-4">
            {event.description}
          </Text>

          <Flex my="3" gap="2">
            <Badge size="2">
              <Clock className="h-3 w-3" />
              {formatMinutesToHoursMinutes(event.duration)}
            </Badge>
            <Badge size="2">
              <MapPin className="h-3 w-3" />
              {event.location}
            </Badge>
          </Flex>
        </Flex>
      </div>
    </Link>
  )
}

export default EventCard;
