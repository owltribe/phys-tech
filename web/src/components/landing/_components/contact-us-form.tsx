'use client'

import TextField from "@/components/ui/text-field";
import Button from "@/components/landing/Button";
import toast from "react-hot-toast";
import useCreateContactRequest from "@/hooks/landing/useCreateContactRequest";
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputMask} from "@react-input/mask";

const schema = yup.object().shape({
  fullName: yup.string().required('Поле имя обязательно'),
  email: yup
    .string()
    .required('Поле email обязательно')
    .email('Введите действительный адрес электронной почты'),
  phone: yup
    .string()
    .required('Поле номера телефона обязательно')
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный номер телефона')
});

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

export default function ContactUsForm() {
  const createContactRequestMutation = useCreateContactRequest()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formValues: FormValues) => {
    createContactRequestMutation.mutate(formValues, {
      onError: (error) => {
        console.error(error, "landing-callback-creation-error", new Date())
        toast.error("Ошибка отправления заявки. Проверьте ваше подключение с интернетом.")
      },
      onSuccess: () => {
        toast.success("Ваша заявка на обратный звонок успешно создана.")
        reset()
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 p-8 py-10 sm:p-10 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10"
    >
      <div className="flex flex-col gap-4">
        <TextField
          label='Имя'
          placeholder="Введите ваше полное имя"
          radius="large"
          size="3"
          labelProps={{
            size: "3"
          }}
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <TextField
          label='Email'
          placeholder="Введите вашу электронную почту"
          radius="large"
          size="3"
          labelProps={{
            size: "3"
          }}
          {...register('email')}
          error={errors.email?.message}
        />
        <InputMask
          mask="+7 (___) ___-__-__"
          replacement={{
            _: /\d/
          }}
          component={TextField}
          label='Номер телефона'
          placeholder="Введите ваш номер телефона"
          radius="large"
          size="3"
          labelProps={{
            size: "3"
          }}
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      <div>
        <p className="mb-8 text-sm text-gray-600">
          Нажимая кнопку отправки ниже, вы соглашаетесь с обработкой ваших личных данных ScienceServices, как описано в Политике конфиденциальности.
        </p>

        <Button
          className="ml-auto mt-8"
          isLoading={createContactRequestMutation.isPending}
        >
          Отправить
        </Button>
      </div>
    </form>
  )
}