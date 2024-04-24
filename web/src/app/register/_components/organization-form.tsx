'use client'

import TextField from "@/components/ui/text-field";
import PasswordField from "@/components/ui/password-field";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {useAuth} from "@/providers/AuthProvider";
import {yupResolver} from "@hookform/resolvers/yup";
import {getFormattedError} from "@/lib/error-helper";
import toast from "react-hot-toast";
import {OrganizationCategory} from "@/types/generated";
import {Separator} from "@radix-ui/themes";
import TextAreaField from "@/components/ui/text-area-field";
import OrganizationCategorySelect from "@/components/selects/organization-category-select";

interface FormValues {
  email: string;
  contact: string;
  first_name: string;
  last_name: string;
  password: string;
  rePassword: string;

  organization_name: string;
  organization_bin: string;
  organization_address: string;
  organization_contact: string;
  organization_email: string;
  organization_description: string;
  organization_category: OrganizationCategory;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Введите адрес электронной почты")
    .email("Некорректный формат адреса электронной почты"),
  contact: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^(\+7|8)7\d{9}$/, "Введите Казахстанский формат номера телефона"),
  first_name: yup.string().required("Введите свое имя"),
  last_name: yup.string().required("Введите свою фамилию"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
  rePassword: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),

  organization_name: yup.string().required("Введите название организации"),
  organization_bin: yup
    .string()
    .matches(
      /^\d{12}/,
      "Некорректный формат БИН. Пример корректного: 123456789012"
    )
    .required("Введите БИН организации"),
  organization_address: yup.string().required("Введите адрес организации"),
  organization_contact: yup
    .string()
    .required("Введите номер телефона")
    .matches(/^(\+7|8)7\d{9}$/, "Введите Казахстанский формат номера телефона"),
  organization_email: yup
    .string()
    .required("Введите рабочую электронную почту организации")
    .email("Некорректный формат адреса электронной почты"),
  organization_description: yup
    .string()
    .required("Опешите род деятельность организации"),
  organization_category: yup
    .string()
    .oneOf<OrganizationCategory>(
      ["Scientific Institute", "University", "Company"],
      "Выберите категорию организации"
    )
});

interface OrganizationFormProps {
  children: (isLoading: boolean) => React.ReactNode
}

const OrganizationForm = ({
  children,
}: OrganizationFormProps) => {
  const { onRegister, isRegisterLoading, openLoginModal } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      rePassword: "",

      organization_name: "",
      organization_bin: "",
      organization_address: "",
      organization_contact: "",
      organization_email: "",
      organization_description: "",
      organization_category: "Scientific Institute"
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (formValues: FormValues) => {
    const {
      organization_name,
      organization_bin,
      organization_address,
      organization_contact,
      organization_email,
      organization_description,
      organization_category,
      ...registerValues
    } = formValues;

    onRegister(
      {
        ...registerValues,
        role: "Organization",
        organization_data: {
          name: organization_name,
          bin: organization_bin,
          address: organization_address,
          contact: organization_contact,
          email: organization_email,
          description: organization_description,
          category: organization_category
        }
      },
      {
        onError: (error) => {
          toast.error(
            getFormattedError(
              error.response?.data.detail || "Ошибка регистрации"
            )
          );
        },
        onSuccess: () => {
          toast.success("Аккаунт с организацией успешно зарегистрированы.");
          openLoginModal()
        }
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(formValues => onSubmit(formValues as FormValues))}
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
      <TextField
        type="tel"
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

      <Separator size="4" className="col-span-6" />

      <TextField
        label="Название организации"
        placeholder="Введите название организации"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.organization_name?.message}
        {...register('organization_name')}
      />
      <TextField
        label="БИН"
        placeholder="Введите БИН"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.organization_bin?.message}
        {...register('organization_bin')}
      />

      <Controller
        render={({ field }) => (
          <OrganizationCategorySelect
            label="Выберите категорию организации"
            value={field.value}
            error={errors.organization_category?.message}
            onValueChange={field.onChange}
            className="w-full"
            wrapperClassName="col-span-6"
          />
        )}
        control={control}
        name="organization_category"
      />
      <TextField
        type="email"
        label="Электронная почта организации"
        placeholder="Введите электронную почту организации"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.organization_email?.message}
        {...register('organization_email')}
      />
      <TextField
        type="tel"
        label="Контактный телефон организации"
        placeholder="Введите контакный номер организации"
        wrapperClassName="col-span-6 sm:col-span-3"
        error={errors.organization_contact?.message}
        {...register('organization_contact')}
      />
      <TextAreaField
        label="Описание организации"
        placeholder="Добавьте описание организации"
        wrapperClassName="col-span-6"
        error={errors.organization_description?.message}
        {...register('organization_bin')}
      />

      {children(isRegisterLoading)}
    </form>
  )
}

export default OrganizationForm