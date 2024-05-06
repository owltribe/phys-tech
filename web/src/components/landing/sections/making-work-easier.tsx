import Card from "@/components/landing/_components/card";
import {Bolt, BookDown, Building2, Calendar} from "lucide-react";

export default function MakingWorkEasier() {
  return (
    <div className="py-16">
      <div className="container m-auto space-y-16 px-6 md:px-12 lg:px-20">
        <div>
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-800 md:text-4xl">
            Как мы облегчаем вашу работу
          </h2>
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
    </div>
  )
}