import {Logo} from "@/app/(dashboard)/_components/logo";
import Image from "next/image";
import Link from "next/link";
import {googlePlayAppLink} from "@/lib/links";

export default function Footer() {
  return (
    <footer>
      <svg xmlns="http://www.w3.org/2000/svg" className="-mb-0.5 w-full" viewBox="0 0 1367.743 181.155">
        <path className="fill-current text-gray-100" id="wave" data-name="wave"
              d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
              transform="translate(1.743 66.155)"></path>
      </svg>
      <div className="bg-gradient-to-b from-gray-100 to-transparent pt-1">
        <div className="container m-auto space-y-8 px-6 text-gray-600 md:px-12 lg:px-20">
          <div className="grid grid-cols-8 gap-6 md:gap-0">
            <div className="col-span-8 border-r border-gray-100 md:col-span-2 lg:col-span-3">
              <div
                className="flex items-center justify-between gap-6 border-b border-white py-6 md:block md:space-y-6 md:border-none md:py-0">
                <div aria-label="logo" className="flex space-x-2 items-center">
                  <Logo className="h-6" />
                  <span className="text-lg font-bold text-gray-900">Science Услуги</span>
                </div>
                <div className="flex gap-6">
                  <Link
                    href={googlePlayAppLink}
                    className="hover:shadow-sm transition bg-white overflow-hidden border rounded-lg p-4 mt-auto"
                  >
                    <Image
                      height={40}
                      width={100}
                      alt="logo"
                      src="/google-play.svg"
                    />
                  </Link>
                  {/*<a href="#" target="blank" aria-label="github" className="hover:text-cyan-600">*/}
                  {/*  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"*/}
                  {/*       className="bi bi-github" viewBox="0 0 16 16">*/}
                  {/*    <path*/}
                  {/*      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>*/}
                  {/*  </svg>*/}
                  {/*</a>*/}
                {/*  <a href="#" target="blank" aria-label="twitter" className="hover:text-cyan-600">*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"*/}
                {/*         className="bi bi-twitter" viewBox="0 0 16 16">*/}
                {/*      <path*/}
                {/*        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>*/}
                {/*    </svg>*/}
                {/*  </a>*/}
                {/*  <a href="#" target="blank" aria-label="medium" className="hover:text-cyan-600">*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"*/}
                {/*         className="bi bi-medium" viewBox="0 0 16 16">*/}
                {/*      <path*/}
                {/*        d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z"></path>*/}
                {/*    </svg>*/}
                {/*  </a>*/}
                </div>
              </div>
            </div>
            <div className="col-span-8 md:col-span-6 lg:col-span-5">
              <div className="grid grid-cols-2 gap-6 pb-16 sm:grid-cols-3 md:pl-16">
                <div>
                  <Link className="text-lg font-medium text-gray-800 hover:text-cyan-600" href="#about">О нас</Link>
                  <ul className="mt-4 list-inside space-y-4">
                    <li>
                      <Link
                        href="#solution"
                        className="transition hover:text-cyan-600"
                      >
                        Решения
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#testimonials"
                        className="transition hover:text-cyan-600"
                      >
                        Отзывы
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#contact"
                        className="transition hover:text-cyan-600"
                      >
                        Контакты
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-lg font-medium text-gray-800">Сервисы</h6>
                  <ul className="mt-4 list-inside space-y-4">
                    <li>
                      <Link href="/services" className="transition hover:text-cyan-600">
                        Услуги
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/organizations"
                        className="transition hover:text-cyan-600"
                      >
                        Организации
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/events"
                        className="transition hover:text-cyan-600"
                      >
                        Мероприятия
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-lg font-medium text-gray-800">Контакты</h6>
                  <ul className="mt-4 list-inside space-y-4">
                    <li>
                      <Link
                        href="tel:+77777777777"
                        className="transition hover:text-cyan-600"
                      >
                        +7 (777) 777-77-77
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="mailto:owl@owltribe.com"
                        className="transition hover:text-cyan-600"
                      >
                        owl@owltribe.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-100 py-4 pb-8 md:pl-16">
                <span>© 2024 Science Services</span>
                <span>Все права зарезервированы</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}