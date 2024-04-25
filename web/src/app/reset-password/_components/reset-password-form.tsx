'use client'

import React, {useState} from "react";
import {AlertDialog, Button, Flex, Heading} from "@radix-ui/themes";
import {useAuth} from "@/providers/AuthProvider";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import useResetPassword from "@/hooks/auth/useResetPassword";
import PasswordField from "@/components/ui/password-field";
import {useRouter, useSearchParams} from "next/navigation";

interface FormValues {
  email: string;
  password: string;
  rePassword: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
})

const ResetPasswordForm = () => {
  const {openLoginModal} = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()

  const resetPasswordMutation = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: "",
      rePassword: "",
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    const token = searchParams.get("token")

    if (token) {
      const payload = {
        ...formValues,
        token: token,
      }

      resetPasswordMutation.mutate(payload, {
        onError: () => {
          toast.error("Ошибка сброса пароля. Возможно ваш токен истек.");
        },
        onSuccess: () => {
          toast.success("Пароль успешно обновлен.");
          router.push('/services')
        }
      })
    } else {
      toast.error("Ошибка сброса пароля. Ваш токен недействителен.")
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 grid grid-cols-6 gap-6"
    >
      <Heading size="8" className="col-span-6">
        Обновить пароля
      </Heading>

      <PasswordField
        label="Новый пароль"
        placeholder="Введите надеждный пароль"
        wrapperClassName="col-span-6"
        size="3"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordField
        label="Повторите новый пароль"
        placeholder="Повторно введите новый пароль"
        wrapperClassName="col-span-6"
        size="3"
        error={errors.rePassword?.message}
        {...register('rePassword')}
      />

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-4">
        <Button
          type='submit'
          size="3"
          loading={resetPasswordMutation.isPending}
        >
          Установить новый пароль
        </Button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Уже есть аккаунт?
          {' '}
          <button
            type="button"
            className="text-gray-700 underline"
            onClick={openLoginModal}
          >
            Войти
          </button>.
        </p>
      </div>
    </form>
  )
}

export default ResetPasswordForm;