import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { MyButton } from "components/tamagui/MyButton";
import { MyTextInput } from "components/tamagui/MyTextInput";
import useCreateService from "hooks/services/useCreateService";
import { H3, Paragraph, Sheet, Spinner, YStack } from "tamagui";

import { MyTextArea } from "../tamagui/MyTextArea";

interface CreateServiceModalProps
  extends Pick<React.ComponentProps<typeof Sheet>, "open" | "onOpenChange"> {
  onClose: () => void;
}

interface FormValues {
  name: string;
  description: string | null;
  expected_result: string | null;
  cost: string;
}

const CreateServiceSheet = ({
  open,
  onOpenChange,
  onClose
}: CreateServiceModalProps) => {
  const createServiceMutation = useCreateService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      expected_result: "",
      cost: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const payload = {
      ...formValues,
      cost: Number(formValues.cost)
    };

    createServiceMutation.mutate(payload, {
      onError: (error) => {
        Toast.show({
          type: "success",
          text1: "Ошибка создания услуги",
          text2: `${error.response.data.detail}`
        });
      },
      onSuccess: (response) => {
        onClose();
        reset();
        Toast.show({
          type: "success",
          text1: "Услуга успешно создана",
          text2: `Услуга "${response.data.name}" создана.`
        });
      }
    });
  };

  return (
    <Sheet
      modal={true}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$3"
        space="$4"
      >
        <H3 fontWeight="600">Создание Услуги</H3>
        <YStack
          mt="$4"
          space="$2.5"
        >
          <YStack space="$0.5">
            {errors?.name && (
              <Paragraph
                color="$red9"
                mb="$2"
              >
                Поле названия услуги обязательное.
              </Paragraph>
            )}
            <Controller
              control={control}
              rules={{
                required: true
              }}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  placeholder="Название услуги"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              control={control}
              name="expected_result"
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  placeholder="Предполагаемый результат"
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
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextArea
                  placeholder="Описание"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors?.cost && (
              <Paragraph
                color="$red9"
                mb="$2"
              >
                Поле стоимости услуги обязательное.
              </Paragraph>
            )}
            <Controller
              control={control}
              rules={{
                required: true
              }}
              name="cost"
              render={({ field: { onChange, onBlur, value } }) => (
                <MyTextInput
                  placeholder="Стоимость в KZT"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  maxLength={10}
                />
              )}
            />
          </YStack>
          <MyButton
            mt="$4"
            icon={createServiceMutation.isPending ? <Spinner /> : undefined}
            disabled={createServiceMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Создать
          </MyButton>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default CreateServiceSheet;
