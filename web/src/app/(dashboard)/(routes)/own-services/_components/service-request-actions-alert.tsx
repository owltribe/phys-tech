'use client'

import React, {useState} from "react";
import toast from "react-hot-toast";
import {AlertDialog, Button, ButtonProps, Flex, Strong, TextArea} from "@radix-ui/themes";
import {ServiceRequestRead, ServiceRequestStatus} from "@/types/generated";
import useUpdateServiceRequest from "@/hooks/service-request/useUpdateServiceRequest";

type StatusUpdateTo = Exclude<ServiceRequestStatus, 'Pending'>;

interface ServiceRequestActionsAlertProps extends Pick<AlertDialog.RootProps, 'open' | 'onOpenChange'>{
  serviceRequest: ServiceRequestRead;
  statusUpdateTo: StatusUpdateTo;
}

const ServiceRequestActionsAlert = ({
  serviceRequest,
  statusUpdateTo,
  open,
  onOpenChange
}: ServiceRequestActionsAlertProps) => {

  const updateServiceRequestMutation = useUpdateServiceRequest(serviceRequest.id)

  const contentByStatusUpdateToMap: Record<StatusUpdateTo, {title: string; description: JSX.Element}> = {
    Approved: {
      title: "Утвердить заявку",
      description: (
        <>
          Вы согласовали вашу услугу c заказчиком и уверены что хотите обновить статус на
          {" "}
          <Strong>
            Утверждено
          </Strong>
          ?
        </>
      )
    },
    Rejected: {
      title: "Отклонить заявку",
      description: (
         <>
           Вы уверенны что хотите поменять статус на
           {" "}
           <Strong>
             Отклонить
           </Strong>
           ? Данное действия не обратимо.
        </>
      )
    },
    Completed: {
      title: "Завершить заявку",
      description: (
       <>
         Вы выполнили вашу услугу и вы уверенны что хотите поменять статус на
         {" "}
         <Strong>
           Выполнено
         </Strong>
         ?
       </>
      )
    },
  }

  const actionButtonColor: Record<StatusUpdateTo, ButtonProps['color']> = {
    Approved: "blue",
    Rejected: "red",
    Completed: "green",
  }

  const errorMessageByStatusUpdateToMap: Record<StatusUpdateTo, string> = {
    Approved: "Ошибка утверждения заявки",
    Rejected: "Ошибка отклонения заявки",
    Completed: "Ошибка завершения заявки",
  }
  const successMessageByStatusUpdateToMap: Record<StatusUpdateTo, string> = {
    Approved: "Заявка утверждена",
    Rejected: "Заявка отклонена",
    Completed: "Заявка завершена",
  }

  const handleSubmit = () => {
    updateServiceRequestMutation.mutate(
      {
        status: statusUpdateTo,
        requested_by_id: serviceRequest.requested_by.id,
        service_id: serviceRequest.service.id
      },
      {
        onError: () => {
          toast.error(`${errorMessageByStatusUpdateToMap[statusUpdateTo]}`);
        },
        onSuccess: () => {
          toast.success(successMessageByStatusUpdateToMap[statusUpdateTo]);
          onOpenChange?.(false)
        },
      }
    );
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>
          {contentByStatusUpdateToMap[statusUpdateTo].title}
        </AlertDialog.Title>
        <AlertDialog.Description size="2">
          {contentByStatusUpdateToMap[statusUpdateTo].description}
        </AlertDialog.Description>

        <Flex gap="3" mt="6" justify="end">
          <AlertDialog.Cancel disabled={updateServiceRequestMutation.isPending}>
            <Button variant="soft" color="gray">
              Отменить
            </Button>
          </AlertDialog.Cancel>
          <Button
            variant="solid"
            color={actionButtonColor[statusUpdateTo]}
            onClick={handleSubmit}
            loading={updateServiceRequestMutation.isPending}
          >
            Подтвердить
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default ServiceRequestActionsAlert;