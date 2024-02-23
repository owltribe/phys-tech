import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import SolidButton from "components/buttons/SolidButton";
import DialogWithRadioBtns from "components/fields/DialogWithRadioBtns";
import TextField from "components/fields/TextField";
import { useAuth } from "providers/AuthProvider";
import { RegisterScreenProps } from "screens/types";
import { OrganizationCategory, OrganizationCreate } from "types/generated";
import { organizationCategories } from "utils/enum-helpers";
import { getFormattedError } from "utils/error-helper";
import {
  showToastWithGravity,
  showToastWithGravityAndOffset
} from "utils/notifications";
import * as yup from "yup";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;

  organization_data: OrganizationCreate | null;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Повторите пароль"),
  organization_data: yup.object().shape({
    name: yup.string().required("Введите название организации"),
    bin: yup.string().required("Введите БИН организации"),
    address: yup.string().required("Введите адрес организации"),
    contact: yup.string().required("Введите контакты номер телефона"),
    email: yup
      .string()
      .required()
      .email("Некорректный формат адреса электронной почты"),
    description: yup.string().required("Опешите род деятельность организации"),
    category: yup
      .string()
      .oneOf<OrganizationCategory>(
        [
          "Scientific Organization",
          "University",
          "Technopark",
          "Commercial Laboratory Company"
        ],
        "Выберите категорию организации"
      )
  })
});

const OrganizationForm = ({
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
      rePassword: "",

      organization_data: {
        name: "",
        bin: "",
        address: "",
        contact: "",
        email: "",
        description: "",
        category: "Scientific Organization"
      }
    },

    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    onRegister(
      { ...formValues, role: "Organization" },
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

      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Название организации"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.bin"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="БИН"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Адрес"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Контактная информация"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Почта"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Описание организаций"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_data.category"
        render={({ field: { onChange, value } }) => (
          <DialogWithRadioBtns
            textField={{
              label: "Категория Организации",
              value: value || undefined
            }}
            items={organizationCategories}
            onSubmit={(v) => onChange(v)}
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

export default OrganizationForm;
