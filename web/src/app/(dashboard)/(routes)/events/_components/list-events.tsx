'use client';

import {useSearchParams} from "next/navigation";
import EventCard from "./event-card";
import useEvents from "@/hooks/events/useEvents";
import {Button, Container, TabNav} from "@radix-ui/themes";
import {Suspense, useState} from "react";
import CardListLoader from "@/components/loaders/card-list-loader";
import Link from "next/link";
import {PlusCircle} from "lucide-react";
import EventCreateDialog from "@/components/dialogs/create-event-dialog";
import {useAuth} from "@/providers/AuthProvider";
import Pagination from "@/components/pagination";

const ListEvents = () => {
  const {user} = useAuth()
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1

  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
  } = useEvents({
    search: searchParams.get("search"),
  })

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false)

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpened(true)
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        {(!!user && user.role === 'Organization') && (
          <div className="flex mb-4">
            <Button onClick={handleOpenCreateDialog}>
              <PlusCircle className="h-4 w-4" />
              Добавить мероприятие
            </Button>
          </div>
        )}


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
        {isSuccess && !!data && (
          <div className="flex justify-center my-8">
            <Pagination
              page={currentPage}
              total={data.pages as number}
            />
          </div>
        )}
      </Container>

      <EventCreateDialog open={isCreateDialogOpened} onOpenChange={setIsCreateDialogOpened} />
    </Suspense>
  )
}

export default ListEvents;
