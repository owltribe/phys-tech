import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Divider, SegmentedButtons } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import Header from "components/typography/Header";
import { useAuth } from "providers/AuthProvider";
import { RegisterScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";
import {
  OrganizationCategory,
  OrganizationCreate,
  UserRole
} from "types/generated";
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
    .required("Пожалуйста, введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Пожалуйста, введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .required("Пожалуйста, подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),

  organization_data: yup.object().shape({
    name: yup.string(),
    bin: yup.string(),
    address: yup.string(),
    contact: yup.string(),
    email: yup
      .string()
      .nullable()
      .email("Некорректный формат адреса электронной почты"),
    description: yup.string().nullable(),
    category: yup
      .string()
      .nullable()
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

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { onRegister, isRegisterLoading } = useAuth();

  const [role, setRole] = useState<UserRole>("Client");
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);

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
        description: " ",
        category: "Scientific Organization"
      }
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    onRegister(
      { ...formValues, role: role },
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
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Header>Создайте аккаунт</Header>

        <SegmentedButtons
          density="regular"
          value={role}
          onValueChange={(v) => setRole(v as UserRole)}
          buttons={[
            {
              value: "Organization",
              label: "Организация",
              style: styles.role,
              showSelectedCheck: true
            },
            {
              value: "Client",
              label: "Клиент",
              style: styles.role,
              showSelectedCheck: true
            }
          ]}
        />

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

        {role === "Organization" && (
          <>
            <Divider />

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
                <DropDown
                  label="Категория Организации"
                  mode="outlined"
                  visible={showCategoryDropDown}
                  showDropDown={() => setShowCategoryDropDown(true)}
                  onDismiss={() => setShowCategoryDropDown(false)}
                  value={value}
                  setValue={(v) => onChange(v)}
                  list={organizationCategories}
                />
              )}
            />
          </>
        )}

        <PrimaryButton
          mode="contained"
          loading={isRegisterLoading}
          onPress={handleSubmit((fv) => onSubmit(fv as FormValues))}
        >
          Зарегистрировать
        </PrimaryButton>

        <View style={styles.row}>
          <Text style={styles.label}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Войти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  role: { flex: 1 },
  label: {
    color: theme.colors.secondary
  },
  button: {
    marginTop: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    alignSelf: "center"
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default RegisterScreen;
