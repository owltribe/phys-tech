import { Atom, Calendar, HeartHandshake } from "@tamagui/lucide-icons";
import PreviewLinkCard from "components/common/PreviewLinkCard";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { H2, ScrollView } from "tamagui";

export default function Home() {
  return (
    <ScrollView>
      <MyStack>
        <H2 fontWeight="700">Главная</H2>
        <MyTextInput placeholder="Поиск" />

        <PreviewLinkCard
          title="Организации"
          description="Профили научных организаций с детальной информацией"
          theme="blue"
          Icon={Atom}
          link="/search?section=organization"
        />
        <PreviewLinkCard
          title="Услуги"
          description="Каталог научных услуг от каждой организации"
          theme="green"
          Icon={HeartHandshake}
          link="/search?section=service"
        />
        <PreviewLinkCard
          title="Мероприятия"
          description="Календарь семинаров, конференций и других мероприятий"
          theme="purple"
          Icon={Calendar}
          link="/search?section=event"
        />
      </MyStack>
    </ScrollView>
  );
}
