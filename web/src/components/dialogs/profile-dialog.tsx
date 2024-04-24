"use client"

import React from "react";
import {DialogProps} from "@radix-ui/react-dialog";
import {useAuth} from "@/providers/AuthProvider";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {Button, Dialog, Flex, Text, Link} from "@radix-ui/themes";
import TextField from "@/components/ui/text-field";
import PasswordField from "@/components/ui/password-field";
import {usePathname, useRouter} from "next/navigation";
import {UserReadWithOrganization} from "@/types/generated";
import useUploadAvatar from "@/hooks/auth/useUploadAvatar";
import useUpdateProfile from "@/hooks/auth/useUpdateProfile";
import toast from "react-hot-toast";
import {getFormattedError} from "@/lib/error-helper";

interface FormValues {
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  contact: yup
    .string()
    .matches(/^(\+7|8)7\d{9}$/, "Введите Казахстанский формат номера телефона")
    .required("Введите номер телефона"),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию")
});


interface ProfileDialogProps extends Pick<DialogProps, 'open' | 'onOpenChange'> {
  user: UserReadWithOrganization
}

export default function ProfileDialog({
  open,
  onOpenChange,
  user,
}: ProfileDialogProps) {
  const updateProfileMutation = useUpdateProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      contact: user.contact || "",
      first_name: user.first_name,
      last_name: user.last_name
    },

    resolver: yupResolver(schema),
  });


  const handleOnOpenChange = (o: boolean) => {
    onOpenChange?.(o)
    reset()
  }

  const onSubmit = (formValues: FormValues) => {
     updateProfileMutation.mutate(formValues, {
       onError: (error) => {
         toast.error('Ошибка обновления профиля', getFormattedError(error.response?.data.detail))
       },
       onSuccess: () => {
         toast.success('Профиль успешно обновлен')
         onOpenChange?.(false)
       }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange} forceMount={false}>
      <Dialog.Content size="4" >
        <Dialog.Title size="6">
          Профиль пользователя
        </Dialog.Title>
        <Dialog.Description size="2" mb="6">
          Нажмите обновить чтобы сохранить изменения.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField
              type="email"
              label="Электронная почта"
              placeholder='Электронная почта'
              error={errors.email?.message}
              {...register('email')}
            />
            <TextField
              type="tel"
              label="Номер телефона"
              placeholder='Введите номер телефона'
              error={errors.contact?.message}
              {...register('contact')}
            />
            <TextField
              label="Имя"
              placeholder='Введите имя'
              error={errors.first_name?.message}
              {...register('first_name')}
            />
            <TextField
              label="Фамилия"
              placeholder='Введите фамилию'
              error={errors.last_name?.message}
              {...register('last_name')}
            />

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" disabled={updateProfileMutation.isPending}>
                  Отмена
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={updateProfileMutation.isPending}>
                Обновить
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}