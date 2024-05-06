'use client'

import TextField from "@/components/ui/text-field";
import Button from "@/components/landing/Button";

export default function ContactUsForm() {
  return (
    <form className="flex flex-col gap-8 p-8 py-10 sm:p-10 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10">
      <div className="flex flex-col gap-4">
        <TextField
          label='Имя'
          placeholder="Введите ваше полное имя"
          radius="large"
          size="3"
          required
          labelProps={{
            size: "3"
          }}
        />
        <TextField
          label='Email'
          placeholder="Введите вашу электронную почту"
          radius="large"
          size="3"
          required
          labelProps={{
            size: "3"
          }}
        />
        <TextField
          label='Номер телефона'
          placeholder="Введите ваш номер телефона"
          radius="large"
          size="3"
          required
          labelProps={{
            size: "3"
          }}
        />
      </div>

      <div>
        <p className="mb-8 text-sm text-gray-600">
          Нажимая кнопку отправки ниже, вы соглашаетесь с обработкой ваших личных данных ScienceServices, как описано в Политике конфиденциальности.
        </p>

        <Button className="ml-auto mt-8">
          Отправить
        </Button>
      </div>
    </form>
  )
}