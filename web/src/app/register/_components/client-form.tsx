'use client'

import TextField from "@/components/ui/text-field";
import PasswordField from "@/components/ui/password-field";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useAuth} from "@/providers/AuthProvider";
import {yupResolver} from "@hookform/resolvers/yup";
import {getFormattedError} from "@/lib/error-helper";
import toast from "react-hot-toast";
import {unformatPhoneNumber} from "@/lib/formatters";
import {InputMask} from "@react-input/mask";
import React from "react";
import {UserWithOrganizationCreate} from "@/types/generated";

interface FormValues {
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  contact: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона'),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
});

interface ClientFormProps {
  children: (isLoading: boolean) => React.ReactNode
}

const ClientForm = ({
  children,
}: ClientFormProps) => {
  const { openLoginModal, onRegister, isRegisterLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      rePassword: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    const payload = {
      ...formValues,
      contact: unformatPhoneNumber(formValues.contact),
      role: "Client" as UserWithOrganizationCreate['role'],
    }

    onRegister(
      payload,
      {
        onError: (error) => {
          toast.error(
            getFormattedError(
              error.response?.data.detail || "Ошибка регистрации"
            )
          );
        },
        onSuccess: () => {
          toast.success("Аккаунт успешно зарегистрирован.");
          openLoginModal()
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 grid grid-cols-6 gap-6"
    >
      <TextField
        label="Имя"
        placeholder="Введите свое имя"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.first_name?.message}
        {...register('first_name')}
      />
      <TextField
        label="Фамилия"
        placeholder="Введите свою фамилию"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.last_name?.message}
        {...register('last_name')}
      />
      <TextField
        type="email"
        label="Электронная почта"
        placeholder="Введите электронную почта"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputMask
        mask="+7 (___) ___-__-__"
        showMask
        replacement={{
          _: /\d/
        }}
        component={TextField}
        label="Номер телефона"
        placeholder="Введите контакный номер"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.contact?.message}
        {...register('contact')}
      />
      <PasswordField
        label="Пароль"
        placeholder="Введите надеждный пароль"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.password?.message}
        {...register('password')}
      />
      <PasswordField
        label="Повторите пароль"
        placeholder="Повторно введите пароль"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.rePassword?.message}
        {...register('rePassword')}
      />

      {children(isRegisterLoading)}
    </form>
  )
}

export default ClientForm