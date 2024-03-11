import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  StyleSheet,
  View
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import useCreateService from "hooks/services/useCreateService";
import { commonStyles } from "styles/commonStyles";
import { showToastWithGravity } from "utils/notifications";

interface AddServiceModalProps extends Pick<ModalProps, "visible"> {
  onClose: () => void;
}

interface FormValues {
  name: string;
  description: string | null;
  expected_result: string | null;
  cost: string;
}

const AddServiceModal = ({ visible, onClose }: AddServiceModalProps) => {
  const createServiceMutation = useCreateService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      expected_result: "",
      cost: ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    const payload = {
      ...formValues,
      cost: Number(formValues.cost)
    };

    createServiceMutation.mutate(payload, {
      onError: (error) => {
        showToastWithGravity(String(error.response?.data.detail));
      },
      onSuccess: (response) => {
        onClose();
        reset();
        showToastWithGravity(`Услуга "${response.data.name}" создана.`);
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
          <View style={styles.buttonClose}>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "700", lineHeight: 42 }}
            >
              Создание сервиса
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
            rules={{
              required: true
            }}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Название услуги"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.name && "Поле названия услуги обязательное."}
              />
            )}
          />

          <Controller
            control={control}
            name="expected_result"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Предполагаемый результат"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Описание"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || undefined}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="cost"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                mode="outlined"
                label="Стоимость в KZT"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={10}
                error={errors?.cost && "Поле стоимости услуги обязательное."}
              />
            )}
          />

          <View style={styles.buttonSubmit}>
            <PrimaryButton
              mode="contained"
              loading={createServiceMutation.isPending}
              onPress={handleSubmit(onSubmit)}
            >
              Добавить
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

export default AddServiceModal;
