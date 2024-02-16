import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  StyleSheet,
  View
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useUpdateOrganization from "hooks/organization/useUpdateOrganization";
import { commonStyles } from "styles/commonStyles";
import { OrganizationCategory, OrganizationRead } from "types/generated";
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

interface UpdateOrganizationModelProps extends Pick<ModalProps, "visible"> {
  onClose: () => void;
  organization: OrganizationRead;
}

const UpdateOrganizationModel = ({
  visible,
  onClose,
  organization
}: UpdateOrganizationModelProps) => {
  const updateOrganization = useUpdateOrganization(organization.id);

  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm<FormValues>({
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
        onClose();
        reset();
        showToastWithGravity(`Организация обновлена.`);
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="formSheet"
    >
      <ScreenWrapper withScrollView={false}>
        <KeyboardAvoidingView style={commonStyles.container}>
          <View style={styles.buttonCloseContainer}>
            <Text
              variant="headlineMedium"
              style={{ fontWeight: "800" }}
            >
              Редактирование организации
            </Text>

            <IconButton
              mode="contained-tonal"
              icon="close"
              size={22}
              onPress={onClose}
            />
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
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Почта"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonClose: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonSubmit: {
    marginTop: 8
  }
});

export default UpdateOrganizationModel;
