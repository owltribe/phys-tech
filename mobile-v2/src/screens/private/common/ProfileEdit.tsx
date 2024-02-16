import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useUpdateProfile from "hooks/auth/useUpdateProfile";
import { ProfileEditScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { showToastWithGravity } from "utils/notifications";

interface FormValues {
  email: string;
  first_name: string;
  last_name: string;
}

const ProfileEdit = ({
  navigation,
  route: {
    params: { user }
  }
}: ProfileEditScreenProps) => {
  const updateProfileMutation = useUpdateProfile();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateProfileMutation.mutate(formValues, {
      onError: (error) => {
        showToastWithGravity(String(error.response?.data.detail));
      },
      onSuccess: () => {
        reset();
        showToastWithGravity(`Профиль обновлен.`);
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
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Электронная почта"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              disabled
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
            />
          )}
        />

        <View style={styles.buttonSubmit}>
          <PrimaryButton
            mode="contained"
            loading={updateProfileMutation.isPending}
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
  buttonSubmit: {
    marginTop: 8
  }
});

export default ProfileEdit;
