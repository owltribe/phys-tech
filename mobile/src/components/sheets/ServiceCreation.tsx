import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import Title from "components/typography/Title";
import useCreateService from "hooks/services/useCreateService";
import { getFormattedError } from "utils/error-helper";
import {
  showToastWithGravity,
  showToastWithGravityAndOffset
} from "utils/notifications";

import DefaultActionSheet from "./DefaultActionSheet";

interface FormValues {
  name: string;
  description: string | null;
  expected_result: string | null;
  cost: string;
}

const ServiceCreation = () => {
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
      onError: (e) => {
        showToastWithGravityAndOffset(
          getFormattedError(e.response?.data.detail || "")
        );
      },
      onSuccess: (response) => {
        SheetManager.hide("ServiceCreation");
        reset();
        showToastWithGravity(`Услуга "${response.data.name}" создана.`);
      }
    });
  };

  return (
    <DefaultActionSheet>
      <Title>Создание услуги</Title>

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

      <View style={styles.buttonsContainer}>
        <SolidButton
          title="Добавить"
          loading={createServiceMutation.isPending}
          onPress={handleSubmit(onSubmit)}
        />
        <OutlineButton
          title="Отменить"
          onPress={() => SheetManager.hide("ServiceCreation")}
          disabled={createServiceMutation.isPending}
          color="red"
        />
      </View>
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    gap: 8,
    marginTop: 16
  }
});

export default ServiceCreation;
