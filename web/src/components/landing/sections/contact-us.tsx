import ContactUsForm from "@/components/landing/_components/contact-us-form";

export default function ContactUs(){
  return (
    <section
      id="contact"
      className="relative before:absolute before:inset-0 before:h-px before:w-96 before:bg-gradient-to-r before:from-purple-300 before:via-sky-400 before:to-transparent"
    >
      <div className="py-10">
        <div className="relative mx-auto px-6 md:max-w-full md:px-12 lg:max-w-6xl xl:px-0">
          <div className="items-center justify-between md:flex">
            <div className="h-max py-16 md:w-6/12 xl:w-5/12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 md:w-max md:text-4xl xl:text-5xl">
                  Остались вопросы?
                </h2>
                <p className="mb-8 mt-6 text-gray-600">
                  Оставьте свои контактные данные, чтобы получить дополнительную информацию.
                  Мы будем рады ответить на все ваши вопросы и рассказать подробнее о том, как наше приложение может помочь вам.
                </p>
              </div>
            </div>

            <div className="md:w-[42%] lg:w-1/2">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}