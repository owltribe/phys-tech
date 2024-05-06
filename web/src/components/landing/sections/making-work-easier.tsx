function Card({
  index,
  title,
  description,
  img,
}: {
  index: number;
  title: string;
  description: string;
  img?: string;
}) {
  return (
    <div className="p-8 py-10 sm:p-10 rounded-3xl bg-white border border-gray-100 bg-opacity-50 shadow-2xl shadow-gray-600/10">
      <div className="space-y-16">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50"
        >
          <span className="font-bold text-green-600">
            {index}
          </span>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 transition">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        {img && (
          <img
            src={img}
            className="w-16"
            width="512"
            height="512"
            alt="burger illustration"
          />
        )}
      </div>
    </div>
  )
}

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
            index={1}
            title="Организации"
            description="Просмотр информации об организации, контактных данных и их услуг."
          />
          <Card
            index={2}
            title="Услуги"
            description="Список услуг организаций, запрос услуг у организаций."
          />
          <Card
            index={3}
            title="Заявки"
            description="Обработка заявки организацией и запрос услуг клиентами."
          />
          <Card
            index={3}
            title="Мероприятия"
            description="Создание мероприятий от организаций."
          />
        </div>
      </div>
    </div>
  )
}