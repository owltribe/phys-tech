import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sparkles } from "@tamagui/lucide-icons";
import { useQueryClient } from "@tanstack/react-query/build/modern/index";
import { MyStack } from "components/MyStack";
import { MyTextInput } from "components/MyTextInput";
import { MyButton } from "components/tamagui/MyButton";
import useLogin from "hooks/user/useLogin";
import { H2, Separator, Spinner, Theme, YStack } from "tamagui";

interface FormValues {
  username: string;
  password: string;
}

export default function Authorization() {
  const queryClient = useQueryClient();

  const loginMutation = useLogin();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    console.log("Ons");
    loginMutation.mutate(formValues, {
      onSuccess: async (response) => {
        await AsyncStorage.setItem("JWT", response.data.access_token);

        queryClient.invalidateQueries({
          queryKey: ["me"]
        });
      },
      onError: (e) => {
        console.error("Error", e);
      }
    });
  };

  return (
    <Theme name="blue">
      <MyStack
        backgroundColor="$color3"
        jc="center"
      >
        <YStack
          animation="lazy"
          y={0}
          enterStyle={{ scale: 0.8, y: -10, opacity: 0 }}
          exitStyle={{ scale: 0.8, y: -10, opacity: 0 }}
          opacity={1}
          scale={1}
          ai="center"
        >
          <Sparkles
            color="$color9"
            size={96}
          />
        </YStack>
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
          Science Услуги
        </H2>

        <YStack mt="$8">
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="username"
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

          <MyButton
            mt="$4"
            icon={loginMutation.isPending ? <Spinner /> : undefined}
            onPress={handleSubmit(onSubmit)}
          >
            Войти
          </MyButton>

          <Separator marginVertical={15} />

          <MyButton variant="outlined">Зарегистрироваться</MyButton>
        </YStack>
      </MyStack>
    </Theme>
  );
}