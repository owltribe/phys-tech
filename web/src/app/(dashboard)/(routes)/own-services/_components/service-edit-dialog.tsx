'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from "@/components/ui/text-field";
import {Button, Card, Dialog, Flex, ScrollArea} from "@radix-ui/themes";
import TextAreaField from "@/components/ui/text-area-field";
import toast from "react-hot-toast";
import useUpdateService from "@/hooks/services/use-update-service";
import {ServiceRead} from "@/types/generated";
import ImageCarousel from "@/components/image-carousel";
import {Instagram} from "lucide-react";

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

interface ServiceEditDialogProps extends Pick<Dialog.RootProps, 'open' | 'onOpenChange'>{
  service: ServiceRead
}

export default function ServiceEditDialog({
  open,
  onOpenChange,
  service,
}: ServiceEditDialogProps) {

  const updateServiceMutation = useUpdateService(service.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
     defaultValues: {
       name: service.name,
       description: service.description || '',
       expected_result: service.expected_result || '',
       cost: service.cost,
     },
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: FormValues) => {
    updateServiceMutation.mutate(formValues, {
      onError: () => {
        toast.error('Ошибка обновления услуги.')
      },
      onSuccess: () => {
        toast.success('Услуга успешно обновлена.')
        reset();
        onOpenChange?.(false);
      }
    })
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="4">
        <Dialog.Title size="6">Обновление услуги</Dialog.Title>
        <Dialog.Description size="2" mb="6">Нажмите сохранить чтобы применить изменения к услуге.</Dialog.Description>

        <Card size="3" className="aspect-video overflow-hidden h-full mb-4">
          <div className="absolute inset-y-0 inset-x-0 w-full">
            {!!service.service_images?.length ? (
              <ImageCarousel images={service.service_images} />
            ) : (
              <div className="bg-gray-100 flex w-full h-full justify-center items-center">
                <Instagram className="h-10 w-10" />
              </div>
            )}
           </div>
        </Card>

        <Flex justify="center" mb="6">
          <Button variant="soft">
            <Instagram className="h-5 w-5" />
            Добавить изображение
          </Button>
        </Flex>

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
              <Dialog.Close disabled={updateServiceMutation.isPending}>
                <Button color="gray">
                  Закрыть
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={updateServiceMutation.isPending}>
                Сохранить
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
