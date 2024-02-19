import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useUpdateService from "hooks/services/useUpdateService";
import { ServiceEditScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { ServiceUpdate } from "types/generated";
import { showToastWithGravity } from "utils/notifications";

interface FormValues {
  name: string;
  description: string;
  expected_result: string;
  cost: string;
}

const OrganizationEdit = ({
  navigation,
  route: {
    params: { service }
  }
}: ServiceEditScreenProps) => {
  const updateServiceMutation = useUpdateService(service.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: service.name,
      description: service.description || "",
      expected_result: service.expected_result || "",
      cost: String(service.cost) || ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateServiceMutation.mutate(
      { ...formValues, cost: Number(formValues.cost) } as ServiceUpdate,
      {
        onError: (error) => {
          showToastWithGravity(String(error.response?.data.detail));
        },
        onSuccess: () => {
          reset();
          showToastWithGravity(`Услуга обновлена.`);
          navigation.navigate("Services");
        }
      }
    );
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Название услуги"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.name && "Поле названия услуги обязательное."}
            />
          )}
        />

        <Controller
          control={control}
          name="expected_result"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Предполагаемый результат"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Описание"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || undefined}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="cost"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Стоимость в KZT"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={10}
              error={errors?.cost && "Поле стоимости услуги обязательное."}
            />
          )}
        />

        <View style={styles.buttonSubmit}>
          <PrimaryButton
            mode="contained"
            loading={updateServiceMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Редактировать
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  buttonCloseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonSubmit: {
    marginTop: 8
  }
});

export default OrganizationEdit;
