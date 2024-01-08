import { TouchableOpacity } from "react-native";
import EmptyStatement from "components/EmptyStatement";
import { MyStack } from "components/MyStack";
import { MyTextInput } from "components/MyTextInput";
import { useRouter } from "expo-router";
import { H2, H3, Image, Paragraph, ScrollView, YStack } from "tamagui";

export const ServiceCard = ({
  title,
  description,
  imageUrl
}: {
  title: string;
  description: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/service/1")}>
      <YStack width="100%">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 140 }}
          borderRadius={8}
        />
        <YStack p="$space.2">
          <H3>{title}</H3>
          <Paragraph>{description}</Paragraph>
        </YStack>
      </YStack>
    </TouchableOpacity>
  );
};

export default function Services() {
  return (
    <MyStack>
      <H2 fontWeight="700">Мои Услуги</H2>
      <MyTextInput placeholder="Поиск" />

      <ScrollView>
        <EmptyStatement description="У вас нет текущих услуг" />
        {/*<YStack>*/}
        {/*  {Array.from(Array(10)).map((i, ii) => (*/}
        {/*    <ServiceCard*/}
        {/*      key={ii}*/}
        {/*      title="Название услуги"*/}
        {/*      description="Описание услуги"*/}
        {/*      imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"*/}
        {/*    />*/}
        {/*  ))}*/}
        {/*</YStack>*/}
      </ScrollView>
    </MyStack>
  );
}
