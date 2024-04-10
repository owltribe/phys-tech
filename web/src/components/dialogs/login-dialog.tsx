"use client"

import React from "react";
import {DialogProps} from "@radix-ui/react-dialog";
import {useAuth} from "@/providers/AuthProvider";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {Button, Dialog, Flex, Separator, Text, TextField} from "@radix-ui/themes";

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
    onLogin(formValues)
    onOpenChange?.(false)
    reset()
  };

  const handleOnOpenChange = (o: boolean) => {
    onOpenChange?.(o)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOnOpenChange}>
      <Dialog.Content size="4" maxWidth="400px">
        <Dialog.Title>
          Войти
        </Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Авторизуйтесь для взаимодействия с контентом.
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Электронная почта
              </Text>
              <TextField.Root
                  placeholder='Электронная почта'
                  {...register('username')}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Пароль
              </Text>
              <TextField.Root
                  size="2"
                  placeholder='Пароль'
                  {...register('password')}
              />
            </label>

            <Separator title="Или" my="3" size="4" />

            <Text size="1">
              Нет аккаунта? Зарегистрироваться
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