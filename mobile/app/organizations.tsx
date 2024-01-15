import { MyStack } from "components/tamagui/MyStack";
import { useRouter } from "expo-router";
import { Card, H2, H4, Input, Paragraph, ScrollView, Stack } from "tamagui";

// import { ScienceOrganizationCard } from "./index";

export default function Organizations() {
  const router = useRouter();

  return (
    <MyStack>
      <H2>Организации</H2>
      <Input
        size="$4"
        placeholder="Поиск Организаций"
        borderRadius="$space.10"
      />
      <ScrollView>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap={10}
        >
          {Array.from(Array(5)).map((_, i) => (
            <Card
              key={i}
              animation="lazy"
              size="$4"
              width="48%"
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
              p="$2"
              bordered
              borderRadius="$6"
              backgroundColor="$blue2"
              onPress={() => router.push("organization/1")}
            >
              <Card.Header padded>
                <H4>BioTech</H4>
                <Paragraph theme="alt2">Описание организаций</Paragraph>
              </Card.Header>
            </Card>
          ))}
        </Stack>
      </ScrollView>
    </MyStack>
  );
}
