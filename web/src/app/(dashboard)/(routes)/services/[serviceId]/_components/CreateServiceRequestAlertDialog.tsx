import React, {useState} from "react";
import {AlertDialog, Button, Flex, Strong, TextArea} from "@radix-ui/themes";
import {ServiceRead} from "@/types/generated";
import {useAuth} from "@/providers/AuthProvider";
import useCreateServiceRequest from "@/hooks/service-request/useCreateServiceRequest";
import toast from "react-hot-toast";
import {getFormattedError} from "@/lib/error-helper";

interface CreateServiceRequestAlertDialogProps {
  service: ServiceRead,
  children: React.ReactNode
}

const CreateServiceRequestAlertDialog = ({
  service,
  children,
}: CreateServiceRequestAlertDialogProps) => {
  const {user, openLoginModal} = useAuth()

  const createServiceRequestMutation = useCreateServiceRequest()

  const [isOpened, setIsOpened] = useState(false)
  const [comment, setComment] = useState<string>('')

  const handleSubmit = () => {
    if (!!user) {
      const payload = {
        service_id: service.id,
        comment: comment || null
      }

      createServiceRequestMutation.mutate(payload,
        {
          onError: (e) => {
            toast.error(`Ошибка создания заявки на услугу. ${getFormattedError(e.response?.data.detail)}`);
          },
          onSuccess: () => {
            toast.success("Заявка на услугу была создана. Переключитесь на вкладку заявки, чтобы посмотреть актуальный статус.");
            setIsOpened(false)
            setComment('')
          }
        }
      );
    } else {
      // Handle unauthorized users
      openLoginModal()
    }
  }

  return (
    <AlertDialog.Root open={isOpened} onOpenChange={setIsOpened}>
      <AlertDialog.Trigger>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Заявка на услугу</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Создание заявки на услугу <Strong>{service.name}</Strong>.
          После того как заявка будет рассмотрена организация свяжется с вами для уточнения деталей.
        </AlertDialog.Description>

        <TextArea
          value={comment}
          onChange={e => setComment(e.currentTarget.value)}
          placeholder="Комментарий к заявке"
          mt="6"
          size="3"
        />

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel disabled={createServiceRequestMutation.isPending}>
            <Button variant="soft" color="gray">
              Отменить
            </Button>
          </AlertDialog.Cancel>
          <Button
            variant="solid"
            color="green"
            onClick={handleSubmit}
            loading={createServiceRequestMutation.isPending}
          >
            Подтвердить
          </Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default CreateServiceRequestAlertDialog;