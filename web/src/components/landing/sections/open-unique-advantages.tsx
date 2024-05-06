import {CircleCheckBig, Eye, Gavel, Hourglass} from "lucide-react";
import Card from "@/components/landing/_components/card";

export default function OpenUniqueAdvantages() {
  return (
    <section id="advantages" className="py-16">
      <div className="container m-auto space-y-16 px-6 md:px-12 lg:px-20">
        <div>
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-800 md:text-4xl text-pretty">
            Откройте для себя уникальные
            <br />
            <span className="text-blue-600">преимущества.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:-mx-8 lg:grid-cols-4">
          <Card icon={<CircleCheckBig />} title="Эффективность" description="Повышение эффективности взаимодействия" />
          <Card icon={<Hourglass />} title="Менеджмент" description="Экономия времени" />
          <Card icon={<Eye />} title="Прозрачность" description="Организации получают лучшую видимость и доступность" />
          <Card icon={<Gavel />} title="Демонстрация" description="Демонстрация специализации и возможности оборудования организаций" />
        </div>
      </div>
    </section>
  )
}