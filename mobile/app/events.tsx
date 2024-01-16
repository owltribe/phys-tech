import EventCard from "components/EventCard";
import { MyStack } from "components/tamagui/MyStack";
import { H2, Input, ScrollView } from "tamagui";

export default function Events() {
  return (
    <ScrollView mt="$space.2">
      <MyStack>
        <H2>Мероприятия</H2>
        <Input
          size="$4"
          placeholder="Поиск мероприятия"
          borderRadius="$space.10"
          mb="$5"
        />
        {Array.from(Array(5)).map((i) => (
          <EventCard
            key={i}
            title="Услуга"
            description="Описание услуги"
          />
        ))}
      </MyStack>
    </ScrollView>
  );
}
