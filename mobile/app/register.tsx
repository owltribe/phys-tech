import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuth} from "providers/AuthProvider";
import {H2, SizeTokens, Spinner, Text, ToggleGroup, XStack, YStack} from "tamagui";
import {Category, OrganizationCreate, UserRole, UserWithOrganizationCreate} from "types/generated";
import {MultiStepView, StepInfo} from "../components/multi-step/MultiStepView";
import StepOne from "../components/auth/register/StepOne";
import StepTwo from "../components/auth/register/StepTwo";
import {MyButton} from "../components/tamagui/MyButton";
import {MyStack} from "../components/tamagui/MyStack";

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
      space="$4"
      mb="$4"
      width="100%"
    >

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

export default function Authorization() {
  const {
    onRegister,
    isRegisterLoading
  }: {
    onRegister: (payload: UserWithOrganizationCreate) => void;
    isRegisterLoading: boolean;
  } = useAuth();

  const [role, setRole] = useState<UserRole>("Organization");
  const [category, setCategory] = useState<Category>("Научная организация");

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
  return await trigger(["email", "first_name", "last_name", "password", "rePassword"]);
};

let steps: StepInfo[] = [
  {
    theme: "blue",
    validate: validateFirstStep,
    Content: () => (
        <MyStack backgroundColor="$color3" jc="center">
          <YStack mt="$4">
            <StepOne control={control} role={role} setRole={setRole} />
            {role === "Client" && (
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
            )}
          </YStack>
        </MyStack>
    )
  }
];

if (role === "Organization") {
  steps.push({
    theme: "blue",
    Content: () => (
        <MyStack backgroundColor="$color3" jc="center">
          <YStack mt="$1">
            <StepTwo
                control={control}
                category={category}
                setCategory={setCategory}
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
    )
  });
}

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
