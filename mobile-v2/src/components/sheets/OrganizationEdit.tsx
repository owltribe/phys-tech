import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import SolidButton from "components/buttons/SolidButton";
import DialogWithRadioBtns from "components/fields/DialogWithRadioBtns";
import TextField from "components/fields/TextField";
import Title from "components/typography/Title";
import useUpdateOrganization from "hooks/organization/useUpdateOrganization";
import { OrganizationCategory } from "types/generated";
import { organizationCategories } from "utils/enum-helpers";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravity } from "utils/notifications";

import DefaultActionSheet from "./DefaultActionSheet";

interface FormValues {
  id: string;
  name: string;
  bin: string;
  address: string;
  contact: string;
  email: string;
  description: string;
  category: OrganizationCategory | null;
}

const OrganizationEdit = ({ payload }: SheetProps<"OrganizationEdit">) => {
  const updateOrganization = useUpdateOrganization(payload?.organization.id);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: payload?.organization.id,
      name: payload?.organization.name,
      bin: payload?.organization.bin || "",
      address: payload?.organization.address || "",
      contact: payload?.organization.contact || "",
      email: payload?.organization.email,
      description: payload?.organization.description,
      category: payload?.organization.category || undefined
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateOrganization.mutate(formValues, {
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
            value={value || undefined}
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
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Номер телефона"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
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
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="category"
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

      <View style={styles.buttonSubmit}>
        <SolidButton
          title="Сохранить"
          loading={updateOrganization.isPending}
          onPress={handleSubmit(onSubmit)}
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
