import { MyStack } from "components/MyStack";
import { H2, Input, ScrollView, Stack, YStack } from "tamagui";

// import { ScienceOrganizationCard } from "./index";

export default function Organizations() {
  return (
    <MyStack>
      <YStack space="$3">
        <YStack space="$2.5">
          <H2>Организации</H2>
          <Input
            size="$4"
            placeholder="Поиск Организаций"
            borderRadius="$space.10"
          />
          <ScrollView mt="$space.2">
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
              rowGap={10}
            >
              {/*{Array.from(Array(5)).map((i) => (*/}
              {/*  <ScienceOrganizationCard*/}
              {/*    key={i}*/}
              {/*    width={190}*/}
              {/*    title="BioTech"*/}
              {/*    description="Description of the org"*/}
              {/*    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeavdP9LMP2O_5PlsdSSCOM3nbt0fsLjPNVA&usqp=CAU"*/}
              {/*  />*/}
              {/*))}*/}
            </Stack>
          </ScrollView>
        </YStack>
      </YStack>
    </MyStack>
  );
}
