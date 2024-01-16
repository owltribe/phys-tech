import React from "react";
import { ArrowLeftCircle } from "@tamagui/lucide-icons";
import { MyStack } from "components/tamagui/MyStack";
import { useRouter } from "expo-router";
import {
  Button,
  H2,
  H3,
  Image,
  Paragraph,
  ScrollView,
  Stack,
  YStack
} from "tamagui";

import { ServiceCard } from "../(tabs)/services";

export default function Service() {
  const router = useRouter();

  return (
    <MyStack p="$4">
      <ScrollView mt="$2">
        <YStack space="$3">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeavdP9LMP2O_5PlsdSSCOM3nbt0fsLjPNVA&usqp=CAU"
            }}
            width="100%"
            height={200}
            borderRadius="$space.4"
          />
        </YStack>
        <YStack
          space="$1"
          mt="$2"
        >
          <H2>Описание</H2>
          <Paragraph size="$5">
            ТОО «Физико-технический институт» обладает современным оборудованием
            и специалистами для проведения качественных и количественных
            исследований, и предоставляет следующие виды услуг:
          </Paragraph>
        </YStack>
        <YStack
          space="$1"
          mt="$2"
        >
          <H3>Об Организаций</H3>
          <Stack space="$1">
            <Paragraph size="$5">Address: Baizakov 180, Almaty</Paragraph>
            <Paragraph size="$5">Contact Person: Tunyk Tunykovna</Paragraph>
            <Paragraph size="$5">Contact Number: +7 777 777 77 77</Paragraph>
          </Stack>
        </YStack>
        <YStack
          space="$1"
          mt="$2"
        >
          <H3>Сервисы</H3>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            space="$5"
            mt="$3"
          >
            <ServiceCard
              title="Service"
              description="Description of Service"
              imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"
            />
            <ServiceCard
              title="Service"
              description="Description of Service"
              imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"
            />
            <ServiceCard
              title="Service"
              description="Description of Service"
              imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"
            />
          </ScrollView>
        </YStack>
      </ScrollView>
      <Button
        size="$2"
        position="absolute"
        top={30}
        left={25}
        onPress={() => router.back()}
      >
        <ArrowLeftCircle size={24} />
      </Button>
    </MyStack>
  );
}
