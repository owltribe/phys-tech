'use client';

import {useSearchParams} from "next/navigation";
import EventCard from "./event-card";
import useEvents from "@/hooks/events/useEvents";
import {Container} from "@radix-ui/themes";

const ListEvents = () => {
  const searchParams = useSearchParams();

  const {data, isSuccess} = useEvents({
    search: searchParams.get("search"),
  })

  return (
    <Container>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.items.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
      {isSuccess && data?.total === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p className="font-googleSans">Нет доступных мероприятия</p>
        </div>
      )}
    </Container>
  )
}

export default ListEvents;
