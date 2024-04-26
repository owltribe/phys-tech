import {Button, DropdownMenu} from "@radix-ui/themes";
import {ServiceRequestRead} from "@/types/generated";
import ServiceRequestActionsAlert from "./service-request-actions-alert";
import {useState} from "react";

interface ServiceRequestActionsProps {
  serviceRequest: ServiceRequestRead
}

const ServiceRequestActions = ({serviceRequest}: ServiceRequestActionsProps) => {
  const [approveAlertOpened, setApprovedAlertOpened] = useState(false)
  const [rejectAlertOpened, setRejectAlertOpened] = useState(false)
  const [completeAlertOpened, setCompleteAlertOpened] = useState(false)

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button>
            Действия
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>
            Детали
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

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
    </>
  )
}

export default ServiceRequestActions