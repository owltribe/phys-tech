'use client';

import useServices from "@/hooks/services/useServices";
import {Button, Container, Flex, TabNav} from "@radix-ui/themes";
import {useAuth} from "@/providers/AuthProvider";
import Link from "next/link";
import {redirect, useSearchParams} from "next/navigation";
import ListServiceRequestsTable from "@/app/(dashboard)/(routes)/own-services/_components/list-service-requests-table";
import ListServices from "@/app/(dashboard)/(routes)/services/_components/list-services";
import {PlusCircle} from "lucide-react";
import ServiceCreationDialog from "@/components/dialogs/create-service-dialog";
import {useState} from "react";

const ListOwnServiceWithTabs = () => {
  const searchParams = useSearchParams()
  const {user, isLoginLoading} = useAuth();

  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false)

  const {data, isSuccess, isLoading} = useServices({
    search: searchParams.get("search"),
    organizationId: user?.organization?.id,
  })

  const isServiceRequestsActive = searchParams?.get('tab') === 'service-requests'

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpened(true)
  }

  if (!isLoginLoading && user?.role !== "Organization") {
    redirect('/services')
  }

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
        <TabNav.Root>
          <TabNav.Link asChild active={!isServiceRequestsActive}>
            <Link href="/own-services">Мои услуги</Link>
          </TabNav.Link>
          <TabNav.Link asChild active={isServiceRequestsActive}>
            <Link href="/own-services?tab=service-requests">Заявки на услуги</Link>
          </TabNav.Link>
        </TabNav.Root>

        <Button onClick={handleOpenCreateDialog}>
          <PlusCircle className="h-4 w-4" />
          Добавить услугу
        </Button>
      </div>

      {!isServiceRequestsActive && <ListServices organizationId={user?.organization?.id} isEditable />}
      {isServiceRequestsActive && <ListServiceRequestsTable />}

      {isSuccess && data?.total === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          <p className="font-googleSans">Нет доступных услуг</p>
        </div>
      )}

      <ServiceCreationDialog open={isCreateDialogOpened} onOpenChange={setIsCreateDialogOpened} />
    </Container>
  )
}

export default ListOwnServiceWithTabs;