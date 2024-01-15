import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { MyButton } from "components/tamagui/MyButton";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useAuth } from "providers/AuthProvider";
import {
  H2,
  H5,
  Separator,
  SizableText,
  SizeTokens,
  Spinner,
  Tabs,
  Text,
  Theme,
  ToggleGroup,
  XStack,
  YStack
} from "tamagui";

import { UserRole } from "../types/generated";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;
  role: UserRole | null;
}

function ToggleGroupComponent(props: {
  size: SizeTokens;
  type: "single" | "multiple";
  orientation: "vertical" | "horizontal";
}) {
  const id = `switch-${props.size.toString().slice(1)}-${props.type}`;
  return (
    <XStack
      flexDirection={props.orientation === "horizontal" ? "row" : "column"}
      // alignItems="center"
      // justifyContent="center"
      space="$4"
      mb="$4"
      width="100%"
    >
      {/*<Label*/}
      {/*  paddingRight="$0"*/}
      {/*  justifyContent="flex-end"*/}
      {/*  size={props.size}*/}
      {/*  htmlFor={id}*/}
      {/*>*/}
      {/*  {props.type === "single" ? "Single" : "Multiple"}*/}
      {/*</Label>*/}

      <ToggleGroup
        orientation={props.orientation}
        id={id}
        type={props.type}
        size={props.size}
        disableDeactivation={props.type === "single" ? true : undefined}
        flexGrow={1}
        width="100%"
      >
        <ToggleGroup.Item
          value="left"
          aria-label="Left aligned"
        >
          <Text width="100%">Организация</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="center"
          aria-label="Center aligned"
        >
          <Text width="100%">Клиент</Text>
        </ToggleGroup.Item>
        {/*<ToggleGroup.Item*/}
        {/*  value="right"*/}
        {/*  aria-label="Right aligned"*/}
        {/*>*/}
        {/*  <AlignRight />*/}
        {/*</ToggleGroup.Item>*/}
      </ToggleGroup>
    </XStack>
  );
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

        <Tabs
          defaultValue="tab1"
          orientation="horizontal"
          flexDirection="column"
          borderRadius="$4"
          borderWidth="$0.25"
          overflow="hidden"
          borderColor="$borderColor"
        >
          <Tabs.List
            separator={<Separator vertical />}
            disablePassBorderRadius="bottom"
            aria-label="Manage your account"
          >
            <Tabs.Tab
              flex={1}
              value="tab1"
            >
              <Text>Организация</Text>
            </Tabs.Tab>
            <Tabs.Tab
              flex={1}
              value="tab2"
            >
              <Text>Клиент</Text>
            </Tabs.Tab>
          </Tabs.List>
          <Separator />
          <Tabs.Content value="tab1">
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
          </Tabs.Content>

          <Tabs.Content value="tab2">
            <H5>Клиент</H5>
          </Tabs.Content>
        </Tabs>
      </MyStack>
    </Theme>
  );
}
