'use client';

import {Container, Flex, Link, Spinner, Table} from "@radix-ui/themes";
import {useAuth} from "@/providers/AuthProvider";
import ServieRequestBadge from "@/app/(dashboard)/(routes)/own-services/_components/service-request-status-badge";
import useServiceRequests from "@/hooks/service-request/useServiceRequests";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import {redirect} from "next/navigation";

const ListOwnServiceRequestsTable = () => {
  const {user, isLoginLoading} = useAuth();

  const {data, isLoading, isFetching} = useServiceRequests({
    requestedById: user?.id,
  })

  if ((!isLoginLoading && user?.role !== 'Client')) {
    redirect('services')
  }

  return (
    <Container>
      <Table.Root size="2">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Статус</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Услуга</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Организация</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Почта</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Телефон</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Дата создания заявки</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading || isFetching && (
            <Flex justify='center'>
              <Spinner my="9" size="3" />
            </Flex>
          )}
          {data?.items && data?.items.map((serviceRequest) => (
            <Table.Row key={serviceRequest.id}>
              <Table.RowHeaderCell>{`#${serviceRequest.id.slice(0, 4)}`}</Table.RowHeaderCell>
              <Table.Cell>
                <ServieRequestBadge status={serviceRequest.status} />
              </Table.Cell>
              <Table.Cell>
                <Link href={`/services/${serviceRequest.service.id}`} underline="hover">
                  {serviceRequest.service.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                 <Link href={`/organizations/${serviceRequest.service.organization.id}`} underline="hover">
                  {serviceRequest.service.organization.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{serviceRequest.service.organization.email}</Table.Cell>
              <Table.Cell>{serviceRequest.service.organization.contact}</Table.Cell>
              <Table.Cell>
                {dayjs(serviceRequest.created_at)
                  .locale("ru")
                  .format("DD MMMM YYYY hh:mm")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  )
}

export default ListOwnServiceRequestsTable;