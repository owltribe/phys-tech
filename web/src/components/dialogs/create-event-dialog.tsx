import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from "@/components/ui/text-field";
import {Button, Dialog, Flex} from "@radix-ui/themes";
import useCreateEvent from "@/hooks/events/useCreateEvent";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string().required('Название обязательно'),
  description: yup.string().required('Описание обязательно'),
  start_date: yup.string().required('Дата начала обязательна'),
  start_time: yup.string().required('Время начала обязательно'),
  duration: yup.number().required('Продолжительность обязательна').positive('Продолжительность должна быть положительной'),
  location: yup.string().required('Место проведения обязательно'),
});

interface FormValues {
  name: string;
  description: string;
  start_date: string;
  start_time: string;
  duration: number;
  location: string;
}

interface EventCreateDialogProps extends Pick<Dialog.RootProps, 'open' | 'onOpenChange'> {}

export default function EventCreateDialog({ open, onOpenChange }: EventCreateDialogProps) {
  const createEventMutation = useCreateEvent();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: FormValues) => {
    createEventMutation.mutate(formValues, {
      onError: () => {
        toast.error('Ошибка создания события.')
      },
      onSuccess: () => {
        toast.success('Событие успешно создано.')
        reset();
        onOpenChange?.(false);
      }
    })
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="4">
        <Dialog.Title size="6">Создание события</Dialog.Title>
        <Dialog.Description size="2" mb="6">Введите информацию о новом событии.</Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField
              type="text"
              label="Название"
              placeholder="Введите название"
              error={errors.name?.message}
              {...register('name')}
            />
            <TextField
              type="text"
              label="Описание"
              placeholder="Введите описание"
              error={errors.description?.message}
              {...register('description')}
            />
            <TextField
              type="date"
              label="Дата начала"
              placeholder="Выберите дату начала"
              error={errors.start_date?.message}
              {...register('start_date')}
            />
            <TextField
              type="time"
              label="Время начала"
              placeholder="Выберите время начала"
              error={errors.start_time?.message}
              {...register('start_time')}
            />
            <TextField
              type="number"
              label="Продолжительность"
              placeholder="Введите продолжительность в часах"
              error={errors.duration?.message}
              {...register('duration')}
            />
            <TextField
              type="text"
              label="Место проведения"
              placeholder="Введите место проведения"
              error={errors.location?.message}
              {...register('location')}
            />

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close disabled={createEventMutation.isPending}>
                <Button color="gray">
                  Закрыть
                </Button>
              </Dialog.Close>
              <Button type="submit">
                Создать
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}