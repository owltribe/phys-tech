import { Atom, Calendar, HeartHandshake } from "@tamagui/lucide-icons";
import PreviewLinkCard from "components/common/PreviewLinkCard";
import { MyStack } from "components/MyStack";
import { Input, ScrollView } from "tamagui";

export default function Home() {
  return (
    <ScrollView>
      <MyStack>
        <Input
          size="$5"
          placeholder="Search"
          borderRadius="$space.10"
          mb="$10"
        />

        <PreviewLinkCard
          title="Организации"
          description="Профили научных организаций с детальной информацией"
          theme="blue"
          Icon={Atom}
        />
        <PreviewLinkCard
          title="Услуги"
          description="Каталог научных услуг от каждой организации"
          theme="green"
          Icon={HeartHandshake}
        />
        <PreviewLinkCard
          title="Мероприятия"
          description="Календарь семинаров, конференций и других мероприятий"
          theme="purple"
          Icon={Calendar}
        />
      </MyStack>
    </ScrollView>
  );
}
