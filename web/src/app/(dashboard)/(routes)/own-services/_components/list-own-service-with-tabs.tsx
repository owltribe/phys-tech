'use client';

import ServiceCard from "@/app/(dashboard)/(routes)/services/_components/service-card";
import useServices from "@/hooks/services/useServices";
import {Container, TabNav} from "@radix-ui/themes";
import CardListLoader from "@/components/loaders/card-list-loader";
import {useAuth} from "@/providers/AuthProvider";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import ListServiceRequestsTable from "@/app/(dashboard)/(routes)/own-services/_components/list-service-requests-table";
import ListServices from "@/app/(dashboard)/(routes)/services/_components/list-services";

const ListOwnServiceWithTabs = () => {
  const searchParams = useSearchParams()
  const {user} = useAuth();

  const {data, isSuccess, isLoading} = useServices({
    search: searchParams.get("search"),
    organizationId: user?.organization?.id,
  })

  const isServiceRequestsActive = searchParams?.get('tab') === 'service-requests'

  return (
    <Container>
      <TabNav.Root mb="4">
        <TabNav.Link asChild active={!isServiceRequestsActive}>
          <Link href="/own-services">Мои услуги</Link>
        </TabNav.Link>
        <TabNav.Link asChild active={isServiceRequestsActive}>
          <Link href="/own-services?tab=service-requests">Заявки на услуги</Link>
        </TabNav.Link>
      </TabNav.Root>

      {!isServiceRequestsActive && <ListServices organizationId={user?.organization?.id} />}
      {isServiceRequestsActive && <ListServiceRequestsTable />}

      {isSuccess && data?.total === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p className="font-googleSans">Нет доступных услуг</p>
        </div>
      )}
    </Container>
  )
}

export default ListOwnServiceWithTabs;