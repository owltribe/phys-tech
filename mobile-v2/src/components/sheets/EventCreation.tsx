import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/src/Date/Calendar";
import { yupResolver } from "@hookform/resolvers/yup";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import Title from "components/typography/Title";
import dayjs from "dayjs";
import useCreateEvent from "hooks/events/useCreateEvent";
import { commonStyles } from "styles/commonStyles";
import { EventCreate } from "types/generated";
import { showToastWithGravity } from "utils/notifications";
import * as yup from "yup";

import DefaultActionSheet from "./DefaultActionSheet";

interface FormValues {
  name: string;
  description: string;
  start_date: Date | undefined;
  start_time: Date | undefined;
  duration: number;
  location: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Поле не может быть пустым"),
  description: yup.string().required("Поле не может быть пустым"),
  start_date: yup.date().required("Поле не может быть пустым"),
  start_time: yup.date().required("Поле не может быть пустым"),
  duration: yup.number().required("Поле не может быть пустым").default(0),
  location: yup.string().required("Поле не может быть пустым")
});

const EventCreation = () => {
  const [startDateModalOpened, setStartDateModalOpened] = useState(false);
  const [startTimeModalOpened, setStartTimeModalOpened] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      start_date: undefined,
      start_time: undefined,
      duration: 0,
      location: ""
    },
    resolver: yupResolver(schema)
  });

  const createEventMutation = useCreateEvent();

  const onCancelStatTime = () => {
    setStartTimeModalOpened(false);
  };
  const onConfirmStartTime = (
    selectedDate: Date,
    onChange: (value: Date) => void
  ) => {
    setStartTimeModalOpened(false);
    onChange(selectedDate);
  };

  const onCancelStartDate = () => {
    setStartDateModalOpened(false);
  };
  const onConfirmStartDate = (
    selectedDate: Date,
    onChange: (value: Date | undefined) => void
  ) => {
    setStartDateModalOpened(false);
    onChange(selectedDate);
  };

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    createEventMutation.mutate(
      {
        ...formValues,
        start_date: dayjs(formValues.start_date).format("YYYY-MM-DD"),
        start_time: dayjs(formValues.start_time).format("HH:MM")
      } as EventCreate,
      {
        onError: (error) => {
          showToastWithGravity(String(error.response?.data.detail));
        },
        onSuccess: () => {
          reset();
          showToastWithGravity(`Мероприятье создано.`);
          SheetManager.hide("EventCreation");
        }
      }
    );
  };

  return (
    <DefaultActionSheet>
      <View>
        <Title>Создание мероприятия</Title>
      </View>

      <Controller
        control={control}
        rules={{ required: true }}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Название"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors?.name?.message}
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
            label="Описание"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={3}
            error={errors?.description?.message}
          />
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="start_date"
        render={({ field: { onChange, value } }) => (
          <View
            style={[styles.timeFieldContainers, commonStyles.defaultListGap]}
          >
            <TextField
              label="Дата"
              value={value ? dayjs(value).format("DD/MM/YYYY") : undefined}
              mode="outlined"
              readOnly
              containerStyle={{ width: "50%" }}
              error={errors?.start_date?.message}
            />

            <OutlineButton
              title="Выбрать дату"
              onPress={() => setStartDateModalOpened(true)}
              compact
            />

            <DateTimePickerModal
              locale="ru"
              mode="date"
              isVisible={startDateModalOpened}
              date={value}
              onCancel={onCancelStartDate}
              onConfirm={(selectedDate) =>
                onConfirmStartDate(selectedDate, onChange)
              }
              // validRange={{
              //   startDate: todayDate.toDate(),
              //   endDate: todayDate.add(2, "months").toDate()
              // }}
            />
          </View>
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="start_time"
        render={({ field: { onChange, value } }) => (
          <>
            <View
              style={[styles.timeFieldContainers, commonStyles.defaultListGap]}
            >
              <TextField
                label="Время"
                value={value ? dayjs(value).format("HH:mm") : undefined}
                mode="outlined"
                readOnly
                containerStyle={{ width: "50%" }}
                error={errors?.start_time?.message}
              />

              <OutlineButton
                title="Выбрать время"
                onPress={() => setStartTimeModalOpened(true)}
                compact
              />
            </View>

            <DateTimePickerModal
              locale="ru"
              mode="time"
              isVisible={startTimeModalOpened}
              onCancel={onCancelStatTime}
              onConfirm={(selectedDate) =>
                onConfirmStartTime(selectedDate, onChange)
              }
              // hours={value.hours}
              // minutes={value.minutes}
              // defaultInputType="keyboard"
            />
          </>
        )}
      />

      <Controller
        control={control}
        rules={{ required: true }}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Место проведения"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.location?.message}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name="duration"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            mode="outlined"
            label="Продолжительность в минутах"
            onBlur={onBlur}
            onChangeText={(text) => onChange(Number(text))}
            value={String(value)}
            error={errors.duration?.message}
            keyboardType="numeric"
          />
        )}
      />

      <View style={styles.buttonContainer}>
        <SolidButton
          title="Создать"
          loading={createEventMutation.isPending}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  timeFieldContainers: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonContainer: {
    marginTop: 16
  }
});

export default EventCreation;
