'use client'

import {Button, SegmentedControl} from "@radix-ui/themes";
import {useAuth} from "@/providers/AuthProvider";
import {useState} from "react";
import ClientForm from "@/app/register/_components/client-form";
import OrganizationForm from "@/app/register/_components/organization-form";

const RegistrationForm = () => {
  const {openLoginModal} = useAuth()

  const [formRole, setFormRole] = useState("Client")

  const Form = formRole === "Client" ? ClientForm : OrganizationForm

  return (
    <>
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
    </>
  )
}

export default RegistrationForm;