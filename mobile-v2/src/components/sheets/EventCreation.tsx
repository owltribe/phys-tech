import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
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
  start_time: {
    hours: number;
    minutes: number;
  };
  duration: number;
  location: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Поле не может быть пустым"),
  description: yup.string().required("Поле не может быть пустым"),
  start_date: yup.date().required("Поле не может быть пустым"),
  start_time: yup.object().shape({
    hours: yup.number().default(12),
    minutes: yup.number().default(0)
  }),
  duration: yup.number().required("Поле не может быть пустым").default(0),
  location: yup.string().required("Поле не может быть пустым")
});

const todayDate = dayjs();

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
      start_time: {
        hours: 12,
        minutes: 0
      },
      duration: 0,
      location: ""
    },
    resolver: yupResolver(schema)
  });

  const createEventMutation = useCreateEvent();

  const onDismissStatTime = () => {
    setStartTimeModalOpened(false);
  };
  const onConfirmStartTime = (
    {
      hours,
      minutes
    }: {
      hours: number;
      minutes: number;
    },
    onChange: (value: { hours: number; minutes: number }) => void
  ) => {
    setStartTimeModalOpened(false);
    onChange({ hours, minutes });
  };

  const onDismissStartDate = () => {
    setStartDateModalOpened(false);
  };
  const onConfirmStartDate = (
    params: { date: CalendarDate },
    onChange: (value: Date | undefined) => void
  ) => {
    setStartDateModalOpened(false);
    onChange(params.date);
  };

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    createEventMutation.mutate(
      {
        ...formValues,
        start_date: dayjs(formValues.start_date).format("YYYY-MM-DD"),
        start_time: dayjs()
          .hour(formValues.start_time.hours)
          .minute(formValues.start_time.minutes)
          .format("HH:mm")
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

            <DatePickerModal
              locale="ru"
              mode="single"
              visible={startDateModalOpened}
              onDismiss={onDismissStartDate}
              date={value}
              onConfirm={(params) => onConfirmStartDate(params, onChange)}
              validRange={{
                startDate: todayDate.toDate(),
                endDate: todayDate.add(2, "months").toDate()
              }}
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
                value={
                  value
                    ? dayjs()
                        .hour(value.hours)
                        .minute(value.minutes)
                        .format("HH:mm")
                    : undefined
                }
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

            <TimePickerModal
              locale="ru"
              use24HourClock
              visible={startTimeModalOpened}
              onDismiss={onDismissStatTime}
              onConfirm={(time) => onConfirmStartTime(time, onChange)}
              hours={value.hours}
              minutes={value.minutes}
              defaultInputType="keyboard"
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

      <SolidButton
        title="Добавить мероприятие"
        loading={createEventMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      />
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  timeFieldContainers: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default EventCreation;
