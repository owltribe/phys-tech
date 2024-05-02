import {Badge, Text} from "@radix-ui/themes";
import Button from "@/components/landing/Button";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] h-full flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center max-w-4xl gap-8">
          <Badge size="3" color="yellow" radius="full">
              Все научные услуги Казахстана в одном сервисе
          </Badge>
          <h1 className={`text-4xl md:text-7xl text-center font-normal text-balance`}>
            Оптимизируйте ваш исследовательский путь
          </h1>
          <Text color='gray' align='center' className="text-balance">
            Платформа, упрощающая процесс сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям.
          </Text>

          <Button>
            Начать исследование
          </Button>
        </div>
      </main>
    </>
  );
}
