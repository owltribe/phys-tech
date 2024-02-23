import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import DialogWithRadioBtns from "components/fields/DialogWithRadioBtns";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useUpdateOrganization from "hooks/organization/useUpdateOrganization";
import { OrganizationEditScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { OrganizationCategory } from "types/generated";
import { organizationCategories } from "utils/enum-helpers";
import { showToastWithGravity } from "utils/notifications";

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

const OrganizationEdit = ({
  navigation,
  route: {
    params: { organization }
  }
}: OrganizationEditScreenProps) => {
  const updateOrganization = useUpdateOrganization(organization.id);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: organization.id,
      name: organization.name,
      bin: organization.bin || "",
      address: organization.address || "",
      contact: organization.contact || "",
      email: organization.email,
      description: organization.description,
      category: organization.category || undefined
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateOrganization.mutate(formValues, {
      onError: (error) => {
        showToastWithGravity(String(error.response?.data.detail));
      },
      onSuccess: () => {
        reset();
        showToastWithGravity(`Организация обновлена.`);
        navigation.navigate("Profile");
      }
    });
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
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
          <PrimaryButton
            mode="contained"
            loading={updateOrganization.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            Сохранить
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
