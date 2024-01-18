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
import { UserWithOrganizationCreate, UserRole, OrganizationCreate } from "types/generated";
import { MultiStepView, StepInfo } from "../components/multi-step/MultiStepView";
import StepOne from "../components/auth/register/StepOne";
import StepTwo from "../components/auth/register/StepTwo";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;
  role: UserRole | null;

  organization_data: OrganizationCreate | null;
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
      </ToggleGroup>
    </XStack>
  );
}

const options: { label: string; value: UserRole }[] = [
  { label: "Организация", value: "Organization" },
  { label: "Клиент", value: "Client" }
];

export default function Authorization() {
  const {
    onRegister,
    isRegisterLoading
  }: {
    onRegister: (payload: UserWithOrganizationCreate) => void;
    isRegisterLoading: boolean;
  } = useAuth();

  const [role, setRole] = useState<UserRole>("Organization");

  const { control, handleSubmit, trigger } = useForm<FormValues>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      rePassword: "",

      organization_data: {
        name: "",
        bin: "",
        address: "",
        contact: "",
        email: "",
        description: "",
        category: "Научная организация",
      }
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    onRegister({ ...formValues, role: role });
  };

const validateFirstStep = async () => {
    const result = await trigger(["email", "first_name", "last_name", "password", "rePassword"]);
    return result;
};

const categorySelectItems = [{ name: "Научная " }, { name: "Вуз" }, { name: "Технопарк" }, { name: "Коммерческая Лабораторная компания" }];


const steps: StepInfo[] = [
{
  theme: "blue",
  validate: validateFirstStep,
  Content: () => (
      <StepOne control={control} />
  )
},
  {
      theme: "blue",
      Content: () => (
          <StepTwo
              control={control}
              isRegisterLoading={isRegisterLoading}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
          />
  )
  },
];

  return (
        <MultiStepView
            autoSwipe
            steps={steps}
            title={
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
        }
        />
  );
}
