import "dayjs/locale/ru";

import {Card, DataList, Flex, Heading, Text, Theme} from "@radix-ui/themes";

import { Metadata } from "next";
import {fetchOrganization} from "@/hooks/organization/useOrganization";
import {AtSign, Calendar, CalendarDays, Hash, MapPin, Phone} from "lucide-react";
import dayjs from "dayjs";
import {getNonCachingImgUrl} from "@/lib/utils";
import OrganizationCategoryBadge
  from "@/app/(dashboard)/(routes)/organizations/_components/organization-category-badge";

interface EventDetailProps {
  params: {
    organizationId: string;
  };
}

export async function generateMetadata({
  params: { organizationId },
}: EventDetailProps): Promise<Metadata> {
  const organization = await fetchOrganization(organizationId);

  return {
    title: organization.name,
    description: organization.description,
  };
}

async function OrganizationDetail({ params: { organizationId } }: EventDetailProps) {
  const organization = await fetchOrganization(organizationId)

  const fullStartDate =
    dayjs(`${organization.created_at}`)
      .locale("ru")
      .format("DD MMMM YYYY HH:MM");

  return (
    <Theme radius="small" accentColor="blue">
      <div className="p-6 space-y-4 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
            <Card size="3" className="aspect-video overflow-hidden">
              <div className="absolute inset-y-0 inset-x-0 w-full">
                {organization.photo ? (
                  <img
                    className="w-full aspect-video object-cover"
                    alt={organization.name}
                    src={getNonCachingImgUrl(organization.photo)}
                  />
                ) : (
                  <div className="bg-gray-100 flex w-full h-full justify-center items-center">
                    <Calendar className="h-10 w-10" />
                  </div>
                )}
              </div>
            </Card>

            <Card size="3">
              <Heading size="6">{organization.name}</Heading>
              <Text mt="2" as="div" color="gray" size="2">
                {organization.description}
              </Text>

              <Flex mt="3">
                <OrganizationCategoryBadge category={organization.category} />
              </Flex>

              <DataList.Root mt="6" trim="start">
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <Hash className="mr-2 h-4 w-4" />
                    БИН
                  </DataList.Label>
                  <DataList.Value>{organization.bin}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Адрес
                  </DataList.Label>
                  <DataList.Value>{organization.address}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <AtSign className="mr-2 h-4 w-4" />
                    Электронная почта
                  </DataList.Label>
                  <DataList.Value>{organization.email}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Контактный номер
                  </DataList.Label>
                  <DataList.Value>{organization.contact}</DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <DataList.Label minWidth="88px" className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Дата регистрации
                  </DataList.Label>
                  <DataList.Value>{fullStartDate}</DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Card>
          </div>
        </div>
      </div>
    </Theme>
  );
}

export default OrganizationDetail;
