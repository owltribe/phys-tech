import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MyStack } from "components/MyStack";
import { MyTextInput } from "components/MyTextInput";
import { MyButton } from "components/tamagui/MyButton";
import { useAuth } from "providers/AuthProvider";
import { H2, Spinner, Theme, YStack } from "tamagui";

import { UserRole } from "../types/generated";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;
  role: UserRole | null;
}

export default function Authorization() {
  const { onRegister, isRegisterLoading } = useAuth();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      rePassword: "",
      role: "Organization"
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    onRegister({ ...formValues });
  };

  return (
    <Theme name="blue">
      <MyStack
        backgroundColor="$color3"
        jc="center"
      >
        <H2
          mt="$5"
          animation="bouncy"
          y={0}
          enterStyle={{ scale: 0.95, y: 4, opacity: 0 }}
          exitStyle={{ scale: 0.95, y: 4, opacity: 0 }}
          opacity={1}
          scale={1}
          size="$10"
          color="$color9"
          selectable={false}
          textAlign="center"
          $md={{
            size: "$10",
            mt: "$4"
          }}
        >
          Регистрация
        </H2>

        <YStack mt="$4">
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <MyTextInput
                placeholder="Электронная почта"
                autoComplete="email"
                inputMode="email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="first_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <MyTextInput
                placeholder="Имя"
                autoComplete="name"
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="last_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <MyTextInput
                placeholder="Фамилия"
                autoComplete="family-name"
                inputMode="text"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <MyTextInput
                placeholder="Пароль"
                autoComplete="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="rePassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <MyTextInput
                placeholder="Повтроите пароль"
                autoComplete="password-new"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <MyButton
            mt="$4"
            color="$color1"
            backgroundColor="$color9"
            icon={isRegisterLoading ? <Spinner /> : undefined}
            disabled={isRegisterLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Зарегистрироваться
          </MyButton>
        </YStack>
      </MyStack>
    </Theme>
  );
}
