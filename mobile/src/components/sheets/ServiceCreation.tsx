import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { COLOR_TEXT_DEFAULT } from "react-native-onboard/lib/OnboardFlow/constants";
import { Switch, TouchableRipple } from "react-native-paper";
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

import { fontSize } from "../../utils/font-helper";

import DefaultActionSheet from "./DefaultActionSheet";

interface FormValues {
  name: string;
  description: string | null;
  expected_result: string | null;
  cost: string;
  technical_specifications: string | null;
  sample_preparation: string | null;
  has_certificate: boolean | null;
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
      cost: "",
      technical_specifications: null,
      sample_preparation: null,
      has_certificate: null
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

      <Controller
        control={control}
        name="has_certificate"
        render={({ field: { onChange, value } }) => (
          <TouchableRipple onPress={() => onChange(!value)}>
            <View style={styles.row}>
              <Text style={styles.switchLabel}>Есть сертификат</Text>
              <View pointerEvents="none">
                <Switch value={!!value} />
              </View>
            </View>
          </TouchableRipple>
        )}
      />
      <Controller
        control={control}
        name="technical_specifications"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Технические характеристики"
            placeholder="Введите технические характеристики если таковые имеются"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="sample_preparation"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Подготовка проб"
            placeholder="Введите какие пробы осуществляются если таковые имеются"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || undefined}
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
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    borderRadius: 16
  },
  switchLabel: {
    fontSize: fontSize.medium,
    fontFamily: "GoogleSans-Regular",
    color: COLOR_TEXT_DEFAULT
  }
});

export default ServiceCreation;
