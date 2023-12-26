import { Atom, Calendar, HeartHandshake } from "@tamagui/lucide-icons";
import PreviewLinkCard from "components/common/PreviewLinkCard";
import { MyStack } from "components/MyStack";
import { H2, Input, ScrollView } from "tamagui";

import { neutral } from "../../utils/colors";

export default function Home() {
  return (
    <ScrollView>
      <MyStack>
        <H2 fontWeight="800">Главная</H2>
        <Input
          size="$5"
          placeholder="Поиск"
          borderRadius="$space.10"
          mb="$10"
        />

        <PreviewLinkCard
          title="Организации"
          description="Профили научных организаций с детальной информацией"
          theme="blue"
          Icon={Atom}
          link="/organizations"
        />
        <PreviewLinkCard
          title="Услуги"
          description="Каталог научных услуг от каждой организации"
          theme="green"
          Icon={HeartHandshake}
          link="/services"
        />
        <PreviewLinkCard
          title="Мероприятия"
          description="Календарь семинаров, конференций и других мероприятий"
          theme="purple"
          Icon={Calendar}
          link="/events"
        />
      </MyStack>
    </ScrollView>
  );
}
