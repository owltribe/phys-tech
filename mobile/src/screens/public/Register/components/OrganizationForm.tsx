import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import SolidButton from "components/buttons/SolidButton";
import OrganizationCategoriesSelect from "components/fields/OrganizationCategoriesSelect";
import TextField from "components/fields/TextField";
import { useAuth } from "providers/AuthProvider";
import { RegisterScreenProps } from "screens/types";
import { OrganizationCategory } from "types/generated";
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

  organization_name: string;
  organization_bin: string;
  organization_address: string;
  organization_contact: string;
  organization_email: string;
  organization_description: string;
  organization_category: OrganizationCategory;
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
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Повторите пароль"),

  organization_name: yup.string().required("Введите название организации"),
  organization_bin: yup
    .string()
    .matches(
      /^\d{12}/,
      "Некорректный формат БИН. Пример корректного: 123456789012"
    )
    .required("Введите БИН организации"),
  organization_address: yup.string().required("Введите адрес организации"),
  organization_contact: yup
    .string()
    .matches(/^(\+7|8)7\d{9}$/, "Введите Казахстанский формат номера телефона")
    .required("Введите номер телефона"),
  organization_email: yup
    .string()
    .required()
    .email("Некорректный формат адреса электронной почты"),
  organization_description: yup
    .string()
    .required("Опешите род деятельность организации"),
  organization_category: yup
    .string()
    .oneOf<OrganizationCategory>(
      ["Scientific Institute", "University", "Company"],
      "Выберите категорию организации"
    )
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

      organization_name: "",
      organization_bin: "",
      organization_address: "",
      organization_contact: "",
      organization_email: "",
      organization_description: "",
      organization_category: "Scientific Institute"
    },

    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    const {
      organization_name,
      organization_bin,
      organization_address,
      organization_contact,
      organization_email,
      organization_description,
      organization_category,
      ...registerValues
    } = formValues;

    onRegister(
      {
        ...registerValues,
        role: "Organization",
        organization_data: {
          name: organization_name,
          bin: organization_bin,
          address: organization_address,
          contact: organization_contact,
          email: organization_email,
          description: organization_description,
          category: organization_category
        }
      },
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

      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Название организации"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.organization_name?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_bin"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="БИН"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.organization_bin?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Адрес"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.organization_address?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Номер телефона организации"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="tel"
            error={errors?.organization_contact?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Почта"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
            error={errors?.organization_email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Описание организаций"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.organization_description?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="organization_category"
        render={({ field: { onChange, value } }) => (
          <OrganizationCategoriesSelect
            textField={{
              label: "Категория Организации",
              value: value,
              error: errors?.organization_category?.message
            }}
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
