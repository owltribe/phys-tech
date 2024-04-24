"use client"

import React, {useState} from "react";
import {DialogProps} from "@radix-ui/react-dialog";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {Button, Dialog, Flex, Avatar, IconButton, Tooltip} from "@radix-ui/themes";
import TextField from "@/components/ui/text-field";
import {UserReadWithOrganization} from "@/types/generated";
import useUploadAvatar from "@/hooks/auth/useUploadAvatar";
import useUpdateProfile from "@/hooks/auth/useUpdateProfile";
import toast from "react-hot-toast";
import {getFormattedError} from "@/lib/error-helper";
import {Check, Pencil} from "lucide-react";
import {getNonCachingImgUrl} from "@/lib/utils";

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
  const uploadAvatarMutation = useUploadAvatar()

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

  const [avatarImage, setAvatarImage] = useState<string>();

  const localAvatarImageUrl = !!avatarImage ? URL.createObjectURL(avatarImage) : undefined
  const preventCachingAvatarImageUrl = getNonCachingImgUrl(user.avatar)

  const isOrganization = user.role === 'Organization';
  const roleColor = isOrganization ? 'green' : 'blue';

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

  const handleChangeAvatar = (e: React.ChangeEventHandler<HTMLInputElement>) => {
    setAvatarImage(e.target.files[0]);
  }

  const handleUploadAvatar = () => {
    const formData = new FormData();
    formData.append("image", avatarImage);

    uploadAvatarMutation.mutate(formData, {
      onError: () => {
        toast.error('Ошибка загрузки фото профиля.')
      },
      onSuccess: () => {
        toast.success('Успешная загрузка фото профиля.')
        setAvatarImage(undefined)
      }
    })
  }


  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange}>
      <Dialog.Content size="4" >
        <Flex justify='center'>
          <div className="relative">
            <div className="absolute right-1 bottom-1 z-10">
              {!avatarImage && (
                <Tooltip content="Обновить фото профиля">
                  <IconButton variant="solid" highContrast radius="full">
                    <Pencil className="h-4 w-4" />
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={handleChangeAvatar}
                    />
                  </IconButton>
                </Tooltip>
              )}
              {!!avatarImage && (
                <Tooltip content="Сохранить фото профиля">
                  <IconButton variant="solid" color="green" radius="full" onClick={handleUploadAvatar}>
                    <Check className="h-4 w-4" />
                  </IconButton>
                </Tooltip>
              )}
            </div>

            <Avatar
              radius="full"
              size="8"
              src={localAvatarImageUrl || preventCachingAvatarImageUrl}
              fallback={`${user.first_name[0]}${user.last_name[0]}`}
              color={roleColor}
            />
          </div>
        </Flex>

        <Dialog.Title size="6" mt="6" align='center'>
          Профиль пользователя
        </Dialog.Title>
        <Dialog.Description size="2" mb="6" align='center'>
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
                  Закрыть
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