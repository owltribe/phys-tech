import "dayjs/locale/ru";

import { Theme } from "@radix-ui/themes";

import EventDetails from "@/app/(dashboard)/(routes)/events/_components/event-detail";
import { Metadata } from "next";
import { fetchEvent } from "@/hooks/events/useEvent";

interface EventDetailProps {
  params: {
    eventId: string;
  };
}

export async function generateMetadata({
  params: { eventId },
}: EventDetailProps): Promise<Metadata> {
  const event = await fetchEvent(eventId);

  return {
    title: event.name,
    description: event.description,
  };
}

async function EventDetailPage({ params: { eventId } }: EventDetailProps) {
  return (
    <Theme radius="small" accentColor="blue">
      <div className="p-6 space-y-4 container mx-auto">
        <EventDetails eventId={eventId} />
      </div>
    </Theme>
  );
}

export default EventDetailPage;
