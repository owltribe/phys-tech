'use client'

import {useEffect, useState} from "react";
import {Button, SegmentedControl} from "@radix-ui/themes";
import ClientForm from "./_components/client-form";
import OrganizationForm from "./_components/organization-form";
import {Logo} from "@/app/(dashboard)/_components/logo";
import {useAuth} from "@/providers/AuthProvider";
import {useRouter} from "next/navigation";

export default function Register() {
  const { push } = useRouter();
  const {user, openLoginModal} = useAuth()

  const [formRole, setFormRole] = useState("Client")

  const Form = formRole === "Client" ? ClientForm : OrganizationForm

  useEffect(() => {
    if (!!user) {
     push('/services')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!user]);

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <Logo />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl text-balance">
              Добро пожаловать в Science Услуги 🔬
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 text-pretty">
              Платформа предназначена для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям
            </p>

            <SegmentedControl.Root
              value={formRole}
              onValueChange={setFormRole}
              radius="large"
              size="2"
              mt="4"
              className='w-full'
            >
              <SegmentedControl.Item value="Client">Клиент</SegmentedControl.Item>
              <SegmentedControl.Item value="Organization">Организация</SegmentedControl.Item>
            </SegmentedControl.Root>

            <Form>
              {(isLoading) => (
                <>
                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      Созданием аккаунта вы соглашаетесь с
                      {' '}
                      <a href="#" className="text-gray-700 underline">положением</a>
                      {' '}
                      и
                      {' '}
                      <a href="#" className="text-gray-700 underline">
                        политикой конфиденциальности
                      </a>.
                    </p>
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <Button
                      type='submit'
                      size="3"
                      loading={isLoading}
                    >
                      Зарегистрироваться
                    </Button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Уже есть аккаунт?
                      {' '}
                      <button
                        type="button"
                        className="text-gray-700 underline"
                        onClick={openLoginModal}
                      >
                        Войти
                      </button>.
                    </p>
                  </div>
                </>
              )}
            </Form>

          </div>
        </main>
      </div>
    </section>
  )
}