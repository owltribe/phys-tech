import Image from "next/image";
import Link from "next/link";
import {EventRead} from "@/types/generated";
import {Calendar, Clock, Pin} from "lucide-react";

interface EventCardProps {
  event: EventRead
}

const EventCard = ({ event }: EventCardProps) => {
  console.log('event', event);

  return (
    <Link href={`/events/${event.id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full p-3">
        <div className="flex items-center space-x-4">
          <Calendar className="h-6 w-6" />
          <div className="grid gap-1.5">
            <div className="text-sm md:text-base font-medium group-hover:text-sky-700 transition line-clamp-1">
              {event.name}
            </div>
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="h-4 w-4 opacity-70" />
            <div>{event.start_date}</div>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <Pin className="h-4 w-4 opacity-70" />
            <div>{event.location}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard;
