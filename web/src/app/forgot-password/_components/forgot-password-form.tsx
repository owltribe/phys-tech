'use client'

import React, {useState} from "react";
import {AlertDialog, Button, Flex, Heading} from "@radix-ui/themes";
import {useAuth} from "@/providers/AuthProvider";
import useForgotPassword from "@/hooks/auth/useForgotPassword";
import TextField from "@/components/ui/text-field";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

interface FormValues {
  email: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
})

const ForgotPasswordForm = () => {
  const {openLoginModal} = useAuth()

  const forgotPasswordMutation = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema)
  });

  const [isSuccessAlertOpened, setIsSuccessAlertOpened] = useState(false)

  const onSubmit = (formValues: FormValues) => {
    forgotPasswordMutation.mutate(formValues, {
      onError: (error) => {
        toast.error("Ошибка сброса пароля");
      },
      onSuccess: () => {
        toast.success("Успешно. Письмо с ссылкой на восстановление пароля отправлено.");
        setIsSuccessAlertOpened(true)
      }
    })
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <Heading size="8" className="col-span-6">
          Восстановления пароля
        </Heading>

        <TextField
          type="email"
          label="Электронная почта"
          placeholder="Введите электронную почта"
          wrapperClassName="col-span-6"
          size="3"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4 mt-4">
          <Button
            type='submit'
            size="3"
            loading={forgotPasswordMutation.isPending}
          >
            Отправить письмо
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

      <AlertDialog.Root open={isSuccessAlertOpened} onOpenChange={setIsSuccessAlertOpened}>
        <AlertDialog.Content size="4" maxWidth="450px">
          <AlertDialog.Title size="7" align="center">Успешно</AlertDialog.Title>
          <AlertDialog.Description size="4" align="center">
            Письмо с ссылкой на восстановление пароля отправлено на вашу почту. Для восстановления пароля, пожалуйста, перейдите по ссылке в письме.
          </AlertDialog.Description>

          <Flex gap="3" mt="6" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Закрыть
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default ForgotPasswordForm;