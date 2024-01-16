import { useState } from "react";
import { TouchableOpacity } from "react-native";
import EmptyStatement from "components/EmptyStatement";
import CreateServiceSheet from "components/sheets/CreateServiceSheet";
import { MyButton } from "components/tamagui/MyButton";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useRouter } from "expo-router";
import useServices from "hooks/services/useServices";
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
  const { data } = useServices();

  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);

  const handleOpenCreateServiceSheet = () => {
    setIsCreateSheetOpened(true);
  };
  const handleCloseCreateServiceSheet = () => {
    setIsCreateSheetOpened(false);
  };

  return (
    <MyStack>
      <H2 fontWeight="700">Мои Услуги</H2>
      <MyTextInput placeholder="Поиск" />

      <ScrollView>
        {data?.data ? (
          <YStack>
            {data?.data.items.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.name}
                description={service.description}
                imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg"
              />
            ))}
          </YStack>
        ) : (
          <EmptyStatement description="У вас нет текущих услуг" />
        )}
      </ScrollView>

      <MyButton onPress={handleOpenCreateServiceSheet}>
        Добавить Услугу
      </MyButton>

      <CreateServiceSheet
        open={isCreateSheetOpened}
        onOpenChange={(open) => setIsCreateSheetOpened(open)}
        onClose={handleCloseCreateServiceSheet}
      />
    </MyStack>
  );
}
