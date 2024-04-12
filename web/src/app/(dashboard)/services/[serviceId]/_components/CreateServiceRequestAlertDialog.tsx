import React from "react";
import {AlertDialog, Button, Flex, Strong, TextArea} from "@radix-ui/themes";
import {ServiceRead} from "@/types/generated";

interface CreateServiceRequestAlertDialogProps {
  service: ServiceRead,
  children: React.ReactNode
}

const CreateServiceRequestAlertDialog = ({
  service,
  children,
}: CreateServiceRequestAlertDialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Заявка на услугу</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Создание заявки на услугу <Strong>{service.name}</Strong>.
          После того как заявка будет рассмотрена организация свяжется с вами для уточнения деталей.
        </AlertDialog.Description>

        <TextArea mt="6" size="3" placeholder="Комментарий к заявке" />

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Отменить
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Подтвердить
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default CreateServiceRequestAlertDialog;