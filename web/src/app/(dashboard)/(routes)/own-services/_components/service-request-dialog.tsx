'use client'

import {Callout, DataList, Dialog, Flex, Link, Spinner} from "@radix-ui/themes";
import React from "react";
import useServiceRequest from "@/hooks/service-request/useServiceRequest";
import TextAreaField from "@/components/ui/text-area-field";
import ServiceRequestStatusBadge
  from "@/app/(dashboard)/(routes)/own-services/_components/service-request-status-badge";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {Info} from "lucide-react";

interface ServiceRequestDialogProps extends Required<Pick<Dialog.RootProps, 'open' | 'onOpenChange'>> {
  serviceRequestId: string
}

export default function ServiceRequestDialog({
  open,
  onOpenChange,
  serviceRequestId,
}: ServiceRequestDialogProps) {
  const {data, isLoading} = useServiceRequest(serviceRequestId)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="4">
        <Dialog.Title size="6" align='center'>
          Заявка на услугу: {`#${data ? data.id.slice(0, 4) : '-'}`}
        </Dialog.Title>
        <Dialog.Description size="3" mb="6" align='center'>
          Статус:
          {" "}
          {data && (
            <ServiceRequestStatusBadge status={data?.status} size="3" />
          )}
        </Dialog.Description>

        <Flex direction="column" className="w-full" gap="3">

          {(isLoading || !data) && <Spinner size="3" ml="auto" mr="auto" />}
          {data && (
            <>
              <DataList.Root mb="4">
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Дата создания</DataList.Label>
                  <DataList.Value>
                    {dayjs(data.created_at)
                      .locale("ru")
                      .format("DD MMMM YYYY hh:mm")}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Услуга</DataList.Label>
                  <DataList.Value>
                    <Link href={`/services/${data.service.id}`}>
                      {data.service.name}
                    </Link>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Заказчик</DataList.Label>
                  <DataList.Value>
                    {data.requested_by.full_name}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Почта</DataList.Label>
                  <DataList.Value>
                    {data.requested_by.email}
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="center">
                  <DataList.Label minWidth="88px">Телефон</DataList.Label>
                  <DataList.Value>
                    {data.requested_by.contact || "-"}
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>

              {!data.comment && (
                <Callout.Root color="gray">
                  <Callout.Icon>
                    <Info className="w-5 h-5" />
                  </Callout.Icon>
                  <Callout.Text>
                    Нет комментария к заявке.
                  </Callout.Text>
                </Callout.Root>
              )}
              {data.comment && (
                <TextAreaField
                  label="Комментарий к заявке"
                  value={data.comment}
                  size="3"
                  readOnly
                  wrapperClassName="w-full"
                />
              )}
            </>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}