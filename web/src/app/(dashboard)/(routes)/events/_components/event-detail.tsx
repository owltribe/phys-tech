"use client";

import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import dayjs from "dayjs";

import "dayjs/locale/ru";
import { Card, DataList, Heading, Text } from "@radix-ui/themes";
import { formatMinutesToHoursMinutes } from "@/lib/formatters";
import useEvent from "@/hooks/events/useEvent";
import { Suspense } from "react";

interface EventDetailsProps {
  eventId: string;
}

const EventDetails = ({ eventId }: EventDetailsProps) => {
  const { data, isLoading } = useEvent(eventId);

  const fullStartDate =
    event &&
    dayjs(`${data?.start_date}T${data?.start_time}`)
      .locale("ru")
      .format("DD MMMM YYYY HH:MM");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
            <Card size="3" className="aspect-video overflow-hidden">
              <div className="absolute inset-y-0 inset-x-0 w-full">
                <div className="bg-gray-100 flex w-full h-full justify-center items-center">
                  <Calendar className="h-10 w-10" />
                </div>
              </div>
            </Card>

            <Card size="3">
              <Heading size="6">{data.name}</Heading>
              <Text mt="2" as="div" color="gray" size="2">
                {data.description}
              </Text>

              <DataList.Root mt="6" trim="start">
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    Начало
                  </DataList.Label>
                  <DataList.Value>{fullStartDate}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Длительность
                  </DataList.Label>
                  <DataList.Value>
                    {formatMinutesToHoursMinutes(data.duration)}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    Локация
                  </DataList.Label>
                  <DataList.Value>{data.location}</DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Card>
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default EventDetails;
