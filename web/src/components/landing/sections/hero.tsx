import {Badge} from "@radix-ui/themes";
import Button from "@/components/landing/Button";

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
      </div>

      <div className="relative container m-auto px-6 md:px-12 lg:px-7">
        <div className="py-40 ml-auto">
          <div className="lg:w-2/3 text-center mx-auto">
            <div>
              <Badge variant="surface" size="3" color="teal" radius="full" mb="4" className="w-fit mx-auto">
                <span className="flex items-center text-balance">
                  Все научные услуги Казахстана в одном месте

                  <span className="text-xl leading-3 ml-2">🇰🇿</span>
                </span>
              </Badge>
            </div>
            <h1 className="text-center text-balance text-gray-900 font-bold text-4xl md:text-6xl lg:text-4xl xl:text-6xl">
              Оптимизируйте ваш путь <span className="text-blue-600">исследования.</span>
            </h1>

            <p className="mt-8 text-gray-700 text-center text-balance">
              Платформа, упрощающая процесс сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям.
            </p>

            <div className="flex mx-auto items-center mt-16 flex-col gap-2 md:flex-row md:w-max ">
              <Button className="w-full py-3 px-6 text-center rounded-full transition sm:w-max" href="/services">
                Начать исследовать
              </Button>
              <Button variant="light" className="w-full py-3 px-6 text-center rounded-full transition sm:w-max" href="#about">
                Изучить детальнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}