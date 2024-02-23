import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import { useAuth } from "providers/AuthProvider";
import { RegisterScreenProps } from "screens/types";
import { getFormattedError } from "utils/error-helper";
import {
  showToastWithGravity,
  showToastWithGravityAndOffset
} from "utils/notifications";
import * as yup from "yup";

interface FormValues {
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;
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
  last_name: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
});

const ClientForm = ({
  navigation
}: {
  navigation: RegisterScreenProps["navigation"];
}) => {
  const { onRegister, isRegisterLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      rePassword: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    onRegister(
      { ...formValues, role: "Client" },
      {
        onError: (error) => {
          showToastWithGravityAndOffset(
            getFormattedError(
              error.response?.data.detail || "Ошибка регистрации"
            )
          );
        },
        onSuccess: () => {
          navigation.navigate("Login");
          showToastWithGravity("Аккаунт успешно создан.");
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Электронная почта"
            autoComplete="email"
            inputMode="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
        rules={{
          required: true
        }}
        name="first_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Имя"
            autoComplete="name"
            inputMode="text"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.first_name?.message}
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
          <TextField
            mode="outlined"
            label="Фамилия"
            autoComplete="family-name"
            inputMode="text"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.last_name?.message}
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
          <TextField
            mode="outlined"
            label="Пароль"
            autoComplete="password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.password?.message}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
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
          <TextField
            mode="outlined"
            label="Повтроите пароль"
            autoComplete="password-new"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.rePassword?.message}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <SolidButton
          title="Зарегистрировать"
          loading={isRegisterLoading}
          onPress={handleSubmit((fv) => onSubmit(fv as FormValues))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6
  },
  buttonContainer: {
    marginTop: 16
  }
});

export default ClientForm;
