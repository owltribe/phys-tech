import Button from "@/components/landing/Button";
import Image from "next/image";

export default function About() {
  return (
    <div className="py-16">
      <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
        <div
          className="lg:bg-gray-50 lg:p-16 rounded-[4rem] space-y-6 md:flex md:gap-12 justify-center md:space-y-0 lg:items-center">
          <div className="md:5/12 lg:w-1/2">
            <img
              height=""
              width=""
              alt="web-app-services"
              src="/screenshots/web-app-own-services.png"
              className="object-cover rounded-xl border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10"
              loading="lazy"
            />
          </div>
          <div className="md:7/12 lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Science Услуги
            </h2>
            <p className="my-8 text-gray-600">
              Мобильное и веб приложения, инициированные и разработанные Институтом ФизТех, предназначены для создания
              динамичной платформы, которая направлена на облегчение прямой связи между научными организациями и
              пользователями, ищущими научные услуги.
            </p>

            <Button>
              Начать исследовать
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}