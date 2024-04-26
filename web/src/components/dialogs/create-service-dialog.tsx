'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from "@/components/ui/text-field";
import {Button, Dialog, Flex} from "@radix-ui/themes";
import TextAreaField from "@/components/ui/text-area-field";
import useCreateService from "@/hooks/services/useCreateService";
import toast from "react-hot-toast";

const schema = yup.object().shape({
 name: yup.string().required('Название обязательно'),
 description: yup.string().required('Описание обязательно'),
 expected_result: yup.string().required('Ожидаемый результат обязательно'),
 cost: yup.number().required('Стоимость обязательна').positive('Стоимость должна быть положительной'),
});

interface FormValues {
 name: string;
 description: string;
 expected_result: string;
 cost: number;
}

interface ServiceCreateDialogProps extends Pick<Dialog.RootProps, 'open' | 'onOpenChange'>{

}

export default function ServiceCreationDialog({
  open,
  onOpenChange
}: ServiceCreateDialogProps) {

  const createServiceMutation = useCreateService()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
     defaultValues: {
       name: '',
       description: '',
       expected_result: '',
       cost: 0,
     },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: FormValues) => {
    createServiceMutation.mutate(formValues, {
      onError: () => {
        toast.error('Ошибка создания услуги.')
      },
      onSuccess: () => {
        toast.success('Услуга успешно создана.')
        reset();
        onOpenChange?.(false);
      }
    })
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="4">
        <Dialog.Title size="6">Создание услуги</Dialog.Title>
        <Dialog.Description size="2" mb="6">Введите информацию о новой услуге.</Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField
              type="text"
              label="Название"
              placeholder="Введите название"
              error={errors.name?.message}
              {...register('name')}
            />
            <TextAreaField
              label="Описание"
              placeholder="Введите описание"
              error={errors.description?.message}
              {...register('description')}
            />
            <TextField
              type="text"
              label="Ожидаемый результат"
              placeholder="Введите ожидаемый результат"
              error={errors.expected_result?.message}
              {...register('expected_result')}
            />
            <TextField
              type="number"
              label="Стоимость"
              placeholder="Введите стоимость"
              error={errors.cost?.message}
              {...register('cost')}
            />

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close disabled={createServiceMutation.isPending}>
                <Button color="gray">
                  Закрыть
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={createServiceMutation.isPending}>Создать</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
