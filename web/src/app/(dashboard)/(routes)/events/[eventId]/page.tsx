import { Metadata} from "next";
import {fetchEvent} from "@/hooks/events/useEvent";
import {Card, DataList, Heading, Link, Text, Theme} from "@radix-ui/themes";
import {Calendar, CalendarDays, Clock, MapPin} from "lucide-react";

import {formatMinutesToHoursMinutes, formatPrice} from "@/lib/formatters";
import dayjs from "dayjs";

interface EventDetailProps {
  params: {
    eventId: string
  }
}

export async function generateMetadata({
  params: { eventId }
}: EventDetailProps): Promise<Metadata> {
  const event = await fetchEvent(eventId)

  return {
    title: event.name,
    description: event.description,
  }
}

async function EventDetail({
  params: { eventId }
}: EventDetailProps) {
  const event = await fetchEvent(eventId)
  const fullStartDate = dayjs(`${event.start_date}T${event.start_time}`)
      .locale("ru")
      .format("DD MMMM YYYY HH:MM")


  return (
    <Theme radius="small" accentColor="blue">
      <div className="p-6 space-y-4 container mx-auto">
        {event && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
              <Card size="3" className="aspect-video overflow-hidden">
                <div className="absolute inset-y-0 inset-x-0 w-full">
                    <div className="bg-gray-100 flex w-full h-full justify-center items-center">
                      <Calendar className="h-10 w-10" />
                    </div>
                </div>
              </Card>

              <Card size="3" >
                <Heading size="6">
                  {event.name}
                </Heading>
                <Text mt="2" as="div" color="gray" size="2">
                  {event.description}
                </Text>

                <DataList.Root mt="6" trim="start">
                  <DataList.Item>
                    <DataList.Label minWidth="88px" className="flex items-center">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      Начало
                    </DataList.Label>
                    <DataList.Value>
                      {fullStartDate}
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px" className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      Длительность
                    </DataList.Label>
                    <DataList.Value>{formatMinutesToHoursMinutes(event.duration)}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px" className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      Локация
                    </DataList.Label>
                    <DataList.Value>{event.location}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Theme>
  )
}

export default EventDetail;
