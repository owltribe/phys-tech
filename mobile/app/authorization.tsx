import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Sparkles } from "@tamagui/lucide-icons";
import { MyButton } from "components/tamagui/MyButton";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useRouter } from "expo-router";
import { useAuth } from "providers/AuthProvider";
import { H2, Separator, Spinner, Theme, YStack } from "tamagui";

import PrimaryButton from "../components/UI/buttons/PrimaryButton";
import PasswordField from "../components/UI/fields/PasswordField";
import { black } from "../utils/colors";

interface FormValues {
  username: string;
  password: string;
}

export default function Authorization() {
  const router = useRouter();
  const { onLogin, isLoginLoading } = useAuth();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    onLogin(formValues);
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
              <PasswordField
                placeholder="Пароль"
                autoComplete="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                autoCorrect={false}
              />
            )}
          />

          <MyButton
            mt="$4"
            color="$color1"
            backgroundColor="$color9"
            icon={isLoginLoading ? <Spinner /> : undefined}
            disabled={isLoginLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Войти
          </MyButton>

          <PrimaryButton label="Войти" />

          <Separator marginVertical={15} />

          <Theme name="blue">
            <MyButton
              pressStyle={{
                borderColor: "$dark6"
              }}
              chromeless
              bordered
              borderColor="$color"
              style={{ color: black }}
              onPress={() => router.push("/register")}
            >
              Зарегистрироваться
            </MyButton>
          </Theme>
        </YStack>
      </MyStack>
    </Theme>
  );
}
