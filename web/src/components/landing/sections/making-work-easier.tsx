import Card from "@/components/landing/_components/card";
import {Bolt, BookDown, Building2, Calendar} from "lucide-react";

export default function MakingWorkEasier() {
  return (
    <section id="solution" className="py-16">
      <div className="container m-auto space-y-16 px-6 md:px-12 lg:px-20">
        <div>
          <h2 className="mt-4 text-center text-3xl font-bold text-gray-800 md:text-4xl text-pretty">
            Как мы <span className="font-bold text-blue-600">облегчаем</span> вашу работу
          </h2>
          <p className="my-8 text-center text-gray-600 text-balance">
            Приложение решает проблемы, предлагая удобную платформу, где организации могут предоставлять свои услуги,
            а пользователи - легко просматривать и запрашивать эти услуги.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:-mx-8 lg:grid-cols-4">
          <Card
            icon={<Building2 />}
            title="Организации"
            description="Просмотр информации об организации, контактных данных и их услуг."
          />
          <Card
            icon={<Bolt />}
            title="Услуги"
            description="Список услуг организаций, запрос услуг у организаций."
          />
          <Card
            icon={<BookDown />}
            title="Заявки"
            description="Обработка заявки организацией и запрос услуг клиентами."
          />
          <Card
            icon={<Calendar />}
            title="Мероприятия"
            description="Создание мероприятий от организаций."
          />
        </div>
      </div>
    </section>
  )
}