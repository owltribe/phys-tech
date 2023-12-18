import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { blue } from "@tamagui/themes";
import { MyStack } from "components/MyStack";
import { router } from "expo-router";
import useLogin from "hooks/user/useLogin";
import {
  Button,
  H2,
  Input,
  Label,
  Paragraph,
  RadioGroup,
  SizeTokens,
  Spinner,
  Text,
  XStack,
  YStack
} from "tamagui";

export default function Register() {
  const loginMutation = useLogin();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    loginMutation.mutate(
      {
        username: "asd",
        password: "asd"
      },
      {
        onSuccess: () => {
          console.log("Success");
        },
        onError: (error) => {
          console.log("Error", error.response.data.detail);
        }
      }
    );
  };

  return (
    <MyStack justifyContent="flex-start">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        space="$2"
      >
        <ChevronLeft onPress={() => router.push("onboarding")} />
        <H2 fontWeight="800">Регистрация</H2>
        <Paragraph
          color={blue.blue9}
          onPress={() => router.push("/login")}
        >
          Войти
        </Paragraph>
      </XStack>
      <YStack space="$4">
        <Input
          size="$5"
          placeholder="Введите вашу почту"
        />
        <Input
          size="$5"
          placeholder="Введите надежный пароль"
        />
        <Input
          size="$5"
          placeholder="Повторите пароль"
        />

        <Button
          mt="$8"
          size="$5"
          borderRadius="$8"
          theme="blue_active"
          onPress={handleSubmit(onSubmit)}
          disabled={loginMutation.isPending}
          iconAfter={
            loginMutation.isPending ? (
              <Spinner
                size="large"
                color="$blue5"
              />
            ) : undefined
          }
        >
          Зарегистрироваться
        </Button>
      </YStack>
    </MyStack>
  );
}
