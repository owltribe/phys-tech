import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import SolidButton from "components/buttons/SolidButton";
import MaskedTextField from "components/fields/MaskedTextField";
import OrganizationCategoriesSelect from "components/fields/OrganizationCategoriesSelect";
import TextField from "components/fields/TextField";
import Title from "components/typography/Title";
import useUpdateOrganization from "hooks/organization/useUpdateOrganization";
import { OrganizationCategory } from "types/generated";
import { getFormattedError } from "utils/error-helper";
import { phoneNumberMask } from "utils/masks";
import { showToastWithGravity } from "utils/notifications";
import * as yup from "yup";

import DefaultActionSheet from "./DefaultActionSheet";

const schema = yup.object().shape({
  name: yup.string().required("Введите название организации"),
  bin: yup
    .string()
    .matches(
      /^\d{12}/,
      "Некорректный формат БИН. Пример корректного: 123456789012"
    )
    .required("Введите БИН организации"),
  address: yup.string().required("Введите адрес организации"),
  contact: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^7\d{10}/, "Неверный формат номера телефона"),
  email: yup
    .string()
    .required()
    .email("Некорректный формат адреса электронной почты"),
  description: yup.string().required("Опешите род деятельность организации"),
  category: yup
    .string()
    .oneOf<OrganizationCategory>(
      ["Scientific Institute", "University", "Company"],
      "Выберите категорию организации"
    )
});

interface FormValues {
  id: string;
  name: string;
  bin: string;
  address: string;
  contact: string;
  email: string;
  description: string;
  category: OrganizationCategory;
}

const OrganizationEdit = ({ payload }: SheetProps<"OrganizationEdit">) => {
  const updateOrganization = useUpdateOrganization(payload?.organization.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: payload?.organization.name,
      bin: payload?.organization.bin || "",
      address: payload?.organization.address || "",
      contact: payload?.organization.contact || "",
      email: payload?.organization.email,
      description: payload?.organization.description,
      category: payload?.organization.category || undefined
    },

    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateOrganization.mutate(formValues as FormValues, {
      onError: (e) => {
        showToastWithGravity(
          getFormattedError(
            e.response?.data.detail || "Ошибка обновления профиля"
          )
        );
      },
      onSuccess: () => {
        reset();
        showToastWithGravity(`Организация обновлена.`);
        SheetManager.hide("OrganizationEdit");
      }
    });
  };

  return (
    <DefaultActionSheet>
      <View>
        <Title>Редактирование организации</Title>
      </View>

      <Controller
        control={control}
        rules={{ required: true }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Название организации"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="bin"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="БИН"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.bin?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="address"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Адрес"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.address?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <MaskedTextField
            mask={phoneNumberMask}
            label="Номер телефона организации"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            contextMenuHidden={false}
            maxLength={15}
            error={errors.contact?.message}
            value={value}
            onBlur={onBlur}
            onChangeText={(_, unmasked) => {
              onChange(unmasked);
            }}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Почта"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            inputMode="email"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Описание организаций"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.description?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="category"
        render={({ field: { onChange, value } }) => (
          <OrganizationCategoriesSelect
            textField={{
              label: "Категория Организации",
              value: value || undefined,
              error: errors.category?.message
            }}
            onSubmit={(v) => onChange(v)}
          />
        )}
      />

      <View style={styles.buttonSubmit}>
        <SolidButton
          title="Сохранить"
          loading={updateOrganization.isPending}
          onPress={handleSubmit((formValues) =>
            onSubmit(formValues as FormValues)
          )}
        />
      </View>
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    marginTop: 16
  }
});

export default OrganizationEdit;
