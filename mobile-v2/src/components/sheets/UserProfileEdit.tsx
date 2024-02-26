import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import Title from "components/typography/Title";
import useUpdateProfile from "hooks/auth/useUpdateProfile";
import { useAuth } from "providers/AuthProvider";
import { showToastWithGravity } from "utils/notifications";
import * as yup from "yup";

import DefaultActionSheet from "./DefaultActionSheet";

interface FormValues {
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  contact: yup
    .string()
    .matches(/^(\+7|8)7\d{9}$/, "Введите Казахстанский формат номера телефона")
    .required("Введите номер телефона"),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию")
});

const UserProfileEdit = ({ payload }: SheetProps<"UserProfileEdit">) => {
  const { refetchProfile } = useAuth();

  const updateProfileMutation = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      email: payload?.user.email,
      contact: payload?.user.contact || "",
      first_name: payload?.user.first_name,
      last_name: payload?.user.last_name
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateProfileMutation.mutate(formValues, {
      onError: (error) => {
        showToastWithGravity(String(error.response?.data.detail));
      },
      onSuccess: () => {
        reset();
        showToastWithGravity(`Профиль обновлен.`);
        refetchProfile();
        SheetManager.hide("UserProfileEdit");
      }
    });
  };

  return (
    <DefaultActionSheet>
      <Title>Редактирование профиля</Title>

      <Controller
        control={control}
        rules={{ required: true }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Электронная почта"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            disabled
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true
        }}
        name="contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Номер телефона"
            autoComplete="tel"
            inputMode="tel"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.contact?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="first_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Имя"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.first_name?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="last_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Фамилия"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.last_name?.message}
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <SolidButton
          title="Обновить"
          loading={updateProfileMutation.isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  timeFieldContainers: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginTop: 16
  }
});

export default UserProfileEdit;
