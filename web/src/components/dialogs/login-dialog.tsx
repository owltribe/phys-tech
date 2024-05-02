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

interface FormValues {
 username: string;
 password: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .email("Введите почту корректно")
    .required("Введите электронную почту"),
  password: yup.string().required("Введите пароль")
});


interface LoginDialogProps extends Pick<DialogProps, 'open' | 'onOpenChange'>{

}

export default function LoginDialog({
  open,
  onOpenChange,
}: LoginDialogProps) {
  const pathname = usePathname()
  const router = useRouter()
  const {onLogin, isLoginLoading} = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: FormValues) => {
    const onSuccess = () => {
      reset()
      onOpenChange?.(false)

      if (pathname === '/' || pathname === '/register') {
        router.replace('/services')
      }
    }

    onLogin(
      formValues,
      {
        onSuccess,
      }
    )
  };

  const handleOnOpenChange = (o: boolean) => {
    onOpenChange?.(o)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange}>
      <Dialog.Content size="4" maxWidth="400px">
        <Dialog.Title size="6">
          Войти
        </Dialog.Title>
        <Dialog.Description size="2" mb="6">
          Авторизуйтесь для взаимодействия с контентом.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <TextField
              type="email"
              label="Электронная почта"
              placeholder='Электронная почта'
              variant="classic"
              error={errors.username?.message}
              {...register('username')}
            />
            <PasswordField
              label="Пароль"
              placeholder='Пароль'
              variant="classic"
              error={errors.password?.message}
              {...register('password')}
            />

            <Text my="4" size="1" align='center'>
              Нет аккаунта?
              {' '}
              <Link href="/register" weight="medium">
                Зарегистрироваться
              </Link>
            </Text>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Отмена
                </Button>
              </Dialog.Close>
              <Button type="submit" loading={isLoginLoading}>Войти</Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}