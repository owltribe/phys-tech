'use client'

import {Container, Flex, Link, Table} from "@radix-ui/themes";
import useServiceRequests from "@/hooks/service-request/useServiceRequests";
import {useSearchParams} from "next/navigation";
import {useAuth} from "@/providers/AuthProvider";
import dayjs from "dayjs";

import "dayjs/locale/ru";
import ServiceRequestActions from "@/app/(dashboard)/(routes)/own-services/_components/service-request-actions";


const ListServiceRequestsTable = () => {
  const searchParams = useSearchParams()
  const {user} = useAuth()

  const isOrganization = user?.role === 'Organization'

  const {data, isLoading, isFetching} = useServiceRequests({
    search: searchParams.get("search"),
    organizationId: isOrganization ? user?.organization?.id : undefined,
  })

  return (
    <Container>
      <Table.Root size="2">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Услуга</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Заказчик</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Почта</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Телефон</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Дата создания заявки</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Действия</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.items.map((serviceRequest) => (
            <Table.Row key={serviceRequest.id}>
              <Table.RowHeaderCell>{`#${serviceRequest.id.slice(0, 4)}`}</Table.RowHeaderCell>
              <Table.Cell>
                <Link href={`/services/${serviceRequest.service.id}`}>
                  {serviceRequest.service.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{serviceRequest.requested_by.full_name}</Table.Cell>
              <Table.Cell>{serviceRequest.requested_by.email}</Table.Cell>
              <Table.Cell>{serviceRequest.requested_by.contact || '-'}</Table.Cell>
              <Table.Cell>
                {dayjs(serviceRequest.created_at)
                  .locale("ru")
                  .format("DD MMMM YYYY HH:MM")}
              </Table.Cell>
              <Table.Cell>
                <ServiceRequestActions serviceRequest={serviceRequest} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export default ListServiceRequestsTable;