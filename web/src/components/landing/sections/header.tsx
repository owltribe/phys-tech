import Link from "next/link";
import {Logo} from "@/app/(dashboard)/_components/logo";
import Button from "@/components/landing/Button";
import LoginButton from "../_components/login-button";


const Header = () => {
  return (
    <header>
      <nav className="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-2 gap-6 md:py-4 md:gap-0 relative">
            <input type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
              <div aria-label="logo" className="flex space-x-2 items-center">
                <Logo className="h-6" />
                <span className="text-2xl font-bold text-gray-900">Science Услуги</span>
              </div>

              <div className="flex items-center lg:hidden max-h-10">
                <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger"
                       className="relative  p-6 -mr-6">
                  <div aria-hidden="true" id="line"
                       className="m-auto h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                  <div aria-hidden="true" id="line2"
                       className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 transition duration-300"></div>
                </label>
              </div>
            </div>

            <div className="hidden absolute top-full transition translate-y-1 lg:peer-checked:translate-y-0 lg:translate-y-0 left-0
                  lg:top-0 lg:relative peer-checked:flex w-full
                  lg:flex lg:flex-row flex-col
                  flex-wrap justify-center lg:items-center
                  gap-6 p-6 rounded-xl
                  bg-white lg:gap-0
                  lg:p-0
                  lg:bg-transparent lg:w-7/12 drop-shadow-2xl">
              <div className="text-gray-600 lg:pr-4 lg:w-auto w-full lg:pt-0">
                <ul className="tracking-wide font-medium text-sm flex-col flex lg:flex-row gap-6 lg:gap-0">
                  <li>
                    <Link href="#" className="block md:px-4 transition hover:text-primary">
                      <span>О нас</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block md:px-4 transition hover:text-primary">
                      <span>Решение</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block md:px-4 transition hover:text-primary">
                      <span>Отзывы</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="block md:px-4 transition hover:text-primary">
                      <span>Ресурсы</span>
                    </Link>
                  </li>
                </ul>

                <div className="flex flex-col mt-8 lg:hidden gap-2">
                  <LoginButton />
                  <Button href='/register' variant="light">
                    Зарегистрироваться
                  </Button>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex gap-2">
              <LoginButton />
              <Button href='/register' variant="light">
                Зарегистрироваться
              </Button>
            </div>

          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;