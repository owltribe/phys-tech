'use client';

import {useSearchParams} from "next/navigation";
import EventCard from "./event-card";
import useEvents from "@/hooks/events/useEvents";
import {Container} from "@radix-ui/themes";
import {Suspense} from "react";
import CardListLoader from "@/components/loaders/card-list-loader";

const ListEvents = () => {
  const searchParams = useSearchParams();

  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
  } = useEvents({
    search: searchParams.get("search"),
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {(isLoading || isFetching) && <CardListLoader />}

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
    </Suspense>
  )
}

export default ListEvents;
