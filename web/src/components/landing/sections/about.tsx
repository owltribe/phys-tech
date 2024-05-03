import Button from "@/components/landing/Button";

export default function About() {
  return (
    <div className="py-16">
      <div className="xl:container m-auto px-6 text-gray-600 md:px-12 xl:px-16">
        <div
          className="lg:bg-gray-50 lg:p-16 rounded-[4rem] space-y-6 md:flex md:gap-6 justify-center md:space-y-0 lg:items-center">
          <div className="md:5/12 lg:w-1/2">
            {/*<img src="images/pie.svg" alt="image" loading="lazy" width="" height="">*/}
          </div>
          <div className="md:7/12 lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Science Услуги
            </h2>
            <p className="my-8 text-gray-600">
              Мобильное приложение, инициированное и разработанное Институтом ФизТех, предназначено для создания
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