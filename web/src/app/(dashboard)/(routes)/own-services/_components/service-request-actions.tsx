import {Button, DropdownMenu} from "@radix-ui/themes";
import {ServiceRequestRead} from "@/types/generated";
import ServiceRequestActionsAlert from "./service-request-actions-alert";
import {useState} from "react";
import ServiceRequestDialog from "@/app/(dashboard)/(routes)/own-services/_components/service-request-dialog";

interface ServiceRequestActionsProps {
  serviceRequest: ServiceRequestRead
}

const ServiceRequestActions = ({serviceRequest}: ServiceRequestActionsProps) => {
  const [approveAlertOpened, setApprovedAlertOpened] = useState(false)
  const [rejectAlertOpened, setRejectAlertOpened] = useState(false)
  const [completeAlertOpened, setCompleteAlertOpened] = useState(false)
  const [detailOpened, setDetailOpened] = useState(false)

  return (
    <>
      <DropdownMenu.Root modal>
        <DropdownMenu.Trigger>
          <Button>
            Действия
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => setDetailOpened(true)}>
            Детали
          </DropdownMenu.Item>

          {serviceRequest.status === "Pending" && (
            <>
              <DropdownMenu.Item onClick={() => setApprovedAlertOpened(true)} color="blue">
                Утвердить
              </DropdownMenu.Item>
              <DropdownMenu.Item color="red" onClick={() => setRejectAlertOpened(true)}>
                Отклонить
              </DropdownMenu.Item>
            </>
          )}
          {serviceRequest.status === "Approved" && (
            <DropdownMenu.Item color="green" onClick={() => setCompleteAlertOpened(true)}>
              Завершить
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ServiceRequestActionsAlert
        serviceRequest={serviceRequest}
        statusUpdateTo="Approved"
        open={approveAlertOpened}
        onOpenChange={setApprovedAlertOpened}
      />
      <ServiceRequestActionsAlert
        serviceRequest={serviceRequest}
        statusUpdateTo="Rejected"
        open={rejectAlertOpened}
        onOpenChange={setRejectAlertOpened}
      />
      <ServiceRequestActionsAlert
        serviceRequest={serviceRequest}
        statusUpdateTo="Completed"
        open={completeAlertOpened}
        onOpenChange={setCompleteAlertOpened}
      />
      <ServiceRequestDialog
        open={detailOpened}
        onOpenChange={setDetailOpened}
        serviceRequestId={serviceRequest.id}
      />
    </>
  )
}

export default ServiceRequestActions