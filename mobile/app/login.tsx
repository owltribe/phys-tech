import React from "react";
// import { useForm } from "@mantine/form";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { blue } from "@tamagui/themes";
import { MyStack } from "components/MyStack";
import { router } from "expo-router";
import useLogin from "hooks/user/useLogin";
import {
  Button,
  Form,
  H2,
  Input,
  Paragraph,
  Spinner,
  Stack,
  XStack,
  YStack
} from "tamagui";

export default function Login() {
  const loginMutation = useLogin();

  // const form = useForm({
  //   initialValues: {
  //     username: "",
  //     password: false
  //   },
  //
  //   validate: {
  //     username: (value) =>
  //       /^\S+@\S+$/.test(value) ? null : "Неправильный формат почты"
  //   }
  // });

  const handleSubmit = () => {
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
    <Stack justifyContent="flex-start">
      <XStack
        justifyContent="space-between"
        alignItems="center"
        space="$2"
      >
        <ChevronLeft onPress={() => router.push("onboarding")} />
        <H2 fontWeight="800">Войти</H2>
        <Paragraph color={blue.blue9}>Рег</Paragraph>
      </XStack>
      <Form
        gap="$2"
        onSubmit={handleSubmit}
      >
        <Input
          size="$5"
          placeholder="Введите вашу почту"
        />
        <Input
          size="$5"
          placeholder="Введите пароль"
        />

        <Button
          mt="$8"
          size="$5"
          borderRadius="$8"
          theme="blue_active"
          onPress={handleSubmit}
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
          Войти
        </Button>
      </Form>
    </Stack>
  );
}
