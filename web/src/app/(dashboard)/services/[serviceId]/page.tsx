import { Metadata} from "next";
import {fetchService} from "@/hooks/services/useService";
import {Card, DataList, Heading, Link, Text, Theme} from "@radix-ui/themes";
import {Instagram} from "lucide-react";

import ActionsCard from "./_components/ActionsCard";
import {formatPrice} from "@/lib/formatters";
import ImagesCarousel from "@/app/(dashboard)/services/[serviceId]/_components/ImagesCarousel";

interface ServiceDetailProps {
  params: {
    serviceId: string
  }
}

export async function generateMetadata({
  params: { serviceId }
}: ServiceDetailProps): Promise<Metadata> {
  const service = await fetchService(serviceId)

  return {
    title: service.name,
    description: service.description,
  }
}

export default async function ServiceDetail({
  params: { serviceId }
}: ServiceDetailProps) {
  const service = await fetchService(serviceId)

  return (
    <Theme radius="small" accentColor="blue">
      <div className="p-6 space-y-4 container mx-auto">
        {service && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
              <Card size="3" className="aspect-video overflow-hidden">
                <div className="absolute inset-y-0 inset-x-0 w-full">
                  {!!service.service_images?.length ? (
                    <ImagesCarousel images={service.service_images} />
                  ) : (
                    <div className="bg-gray-100 flex w-full h-full justify-center items-center">
                      <Instagram className="h-10 w-10" />
                    </div>
                  )}
                </div>
              </Card>

              <Card size="3" >
                <Heading size="6">
                  {service.name}
                </Heading>
                <Text mt="2" as="div" color="gray" size="2">
                  {service.description}
                </Text>

                <DataList.Root mt="6" trim="start">
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Ожидаемый результат</DataList.Label>
                    <DataList.Value>
                      {service.expected_result}
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Цена</DataList.Label>
                    <DataList.Value>{formatPrice(service.cost)}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item align="center">
                    <DataList.Label minWidth="88px">Организация</DataList.Label>
                    <DataList.Value>
                      <Link
                        href={`/organizations/${service.organization.id}`}
                        underline="always"
                      >
                        {service.organization.name}
                      </Link>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Номер телефона</DataList.Label>
                    <DataList.Value>{service.organization.contact}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Card>
            </div>

            <div className="order-2 lg:col-span-2 flex flex-col space-y-6">
              <ActionsCard service={service} />
            </div>
          </div>
        )}
      </div>
    </Theme>
  )
}