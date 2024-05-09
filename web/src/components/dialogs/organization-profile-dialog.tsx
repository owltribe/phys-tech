import React, { useState } from 'react';
import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from "@/components/ui/text-field";
import {Avatar, Button, Dialog, Flex, IconButton, Spinner, Tooltip} from "@radix-ui/themes";
import { Check, Pencil } from "lucide-react";
import { getNonCachingImgUrl } from "@/lib/utils";
import toast from "react-hot-toast";
import {OrganizationCategory, OrganizationRead} from "@/types/generated";
import useUpdateOrganization from "@/hooks/organization/useUpdateOrganization";
import useUploadOrganizationAvatar from "@/hooks/organization/useUploadOrganizationAvatar";
import OrganizationCategorySelect from "@/components/selects/organization-category-select";
import {getFormattedError} from "@/lib/error-helper";
import {InputMask} from "@react-input/mask";
import {formatPhoneNumber, unformatPhoneNumber} from "@/lib/formatters";


const schema = yup.object().shape({
  name: yup.string().required("Пожалуйста, введите название организации."),
  bin: yup
    .string()
    .matches(/^\d{12}$/, "БИН должен состоять из 12 цифр. Пример корректного БИН: 123456789012")
    .required("Пожалуйста, введите БИН организации."),
  address: yup.string().required("Пожалуйста, введите адрес организации."),
  contact: yup
    .string()
    .required("Пожалуйста введите номер телефона.")
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона'),
  email: yup
    .string()
    .required("Пожалуйста, введите адрес электронной почты.")
    .email("Адрес электронной почты введен некорректно. Пожалуйста, проверьте его."),
  description: yup.string().required("Пожалуйста, опишите деятельность организации."),
   category: yup
    .mixed<OrganizationCategory>()
    .oneOf(['Scientific Institute', 'University', 'Company'] as const, "Пожалуйста, выберите категорию организации из предложенных вариантов.")
    .required(),
});

interface FormValues {
  name: string;
  bin: string;
  address: string;
  contact: string;
  email: string;
  description: string;
  category: OrganizationCategory;
}

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: OrganizationRead;
}

export default function OrganizationProfileDialog({ open, onOpenChange, organization }: ProfileDialogProps) {
  const updateOrganizationMutation = useUpdateOrganization(organization.id);
  const uploadAvatarMutation = useUploadOrganizationAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: organization.name,
      bin: organization.bin || "",
      address: organization.address || "",
      contact: organization.contact ? formatPhoneNumber(organization.contact) : "",
      email: organization.email,
      description: organization.description,
      category: organization.category,
    },
    resolver: yupResolver(schema),
  });

  const [avatarImage, setAvatarImage] = useState<File | null>(null);

  const localAvatarImageUrl = !!avatarImage ? URL.createObjectURL(avatarImage) : undefined
  const preventCachingAvatarImageUrl = getNonCachingImgUrl(organization.photo)


  const handleOnOpenChange = (o: boolean) => {
    onOpenChange(o);
    reset();
  };

  const onSubmit = (formValues: FormValues) => {
    const payload = {
      ...formValues,
      contact: unformatPhoneNumber(formValues.contact)
    }
    updateOrganizationMutation.mutate(payload, {
      onError: (error) => {
        toast.error(`Ошибка обновления профиля. ${getFormattedError(error.response?.data.detail)}`)
      },
      onSuccess: () => {
        toast.success('Профиль успешно обновлен')
        onOpenChange?.(false)
      }
   });
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImage(e.target.files[0]);
    }
  };

  const handleUploadAvatar = () => {
    const formData = new FormData();
    formData.append("photo", avatarImage as Blob);

    uploadAvatarMutation.mutate(formData, {
      onError: () => {
        toast.error('Ошибка загрузки фото профиля.')
      },
      onSuccess: () => {
        toast.success('Успешная загрузка фото профиля.')
        setAvatarImage(null)
      }
    })
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange}>
      <Dialog.Content size="4">
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
                <>
                  {!uploadAvatarMutation.isPending && (
                    <Tooltip content="Сохранить фото профиля">
                      <IconButton
                        variant="solid"
                        color="green"
                        radius="full"
                        onClick={handleUploadAvatar}
                      >
                        <Check className="h-4 w-4"/>
                      </IconButton>
                    </Tooltip>
                  )}

                  {uploadAvatarMutation.isPending && (
                    <Tooltip content="Загрузка фото">
                      <IconButton
                        variant="solid"
                        color="gray"
                        radius="full"
                      >
                        <Spinner />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
            </div>

            <Avatar
              radius="full"
              size="8"
              src={localAvatarImageUrl || preventCachingAvatarImageUrl}
              fallback={`${organization.name[0]}${organization.name[1]}`}
            />
          </div>
        </Flex>

        <Dialog.Title size="6" mt="6" align='center'>
          Профиль организации
        </Dialog.Title>
        <Dialog.Description size="2" mb="6" align='center'>
          Нажмите обновить чтобы сохранить изменения.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField
              type="text"
              label="Название"
              placeholder='Название'
              error={errors.name?.message}
              {...register('name')}
            />
            <TextField
              type="text"
              label="БИН"
              placeholder='БИН'
              error={errors.bin?.message}
              {...register('bin')}
            />
            <TextField
              type="text"
              label="Адрес"
              placeholder='Адрес'
              error={errors.address?.message}
              {...register('address')}
            />
            <InputMask
              mask="+7 (___) ___-__-__"
              showMask
              replacement={{
                _: /\d/
              }}
              component={TextField}
              label="Контакт"
              placeholder='Контакт'
              error={errors.contact?.message}
              {...register('contact')}
            />
            <TextField
              type="email"
              label="Электронная почта"
              placeholder='Электронная почта'
              error={errors.email?.message}
              {...register('email')}
            />
            <TextField
              type="text"
              label="Описание"
              placeholder='Описание'
              error={errors.description?.message}
              {...register('description')}
            />
            <Controller
              render={({ field }) => (
                <OrganizationCategorySelect
                  label="Категория"
                  value={field.value}
                  error={errors.category?.message}
                  onValueChange={field.onChange}
                  className="w-full"
                />
              )}
              control={control}
              name="category"
            />
          </Flex>

          <Flex gap="3" mt="6" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" disabled={updateOrganizationMutation.isPending}>
                Закрыть
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={updateOrganizationMutation.isPending}>
              Обновить
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
