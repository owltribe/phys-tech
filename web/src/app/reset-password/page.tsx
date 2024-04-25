import {Metadata} from "next";
import {Logo} from "@/app/(dashboard)/_components/logo";
import ResetPasswordForm from "@/app/reset-password/_components/reset-password-form";

export const metadata: Metadata = {
  title: "Восстановление пароля в science услуги",
  description: "Сброс пароля в science услуги",
};

export default function ResetPassword() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1524683745036-b46f52b8505a?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Logo />

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Добро пожаловать в Science Услуги 🔬
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Платформа предназначена для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям
            </p>
          </div>
        </section>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Logo className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20" />

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                 Добро пожаловать в Science Услуги 🔬
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Платформа предназначена для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям
              </p>
            </div>

            <ResetPasswordForm />
          </div>
        </main>
      </div>
    </section>
  )
}