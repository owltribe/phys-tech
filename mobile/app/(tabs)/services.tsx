import { useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import EmptyStatement from "components/EmptyStatement";
import CreateServiceSheet from "components/sheets/CreateServiceSheet";
import { MyButton } from "components/tamagui/MyButton";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useRouter } from "expo-router";
import useServices from "hooks/services/useServices";
import {
  Card,
  H2,
  H3,
  H4,
  Image,
  Paragraph,
  ScrollView,
  XStack,
  YStack
} from "tamagui";

import SegmentedControl from "../../components/SegmentedControl";
import useServiceRequests from "../../hooks/service_requests/useServiceRequests";
import FlatList = Animated.FlatList;
import dayjs from "dayjs";

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

const SERVICES = "Services";
const SERVICE_REQUESTS = "ServiceRequests";

const options = [
  { label: "Услуги", value: SERVICES },
  { label: "Заявки", value: SERVICE_REQUESTS }
];

export default function Services() {
  const { data } = useServices();
  const { data: serviceRequestsData, isLoading: isServiceRequestsLoading } =
    useServiceRequests();

  const [selectedOption, setSelectedOption] = useState(SERVICES);

  const [isCreateSheetOpened, setIsCreateSheetOpened] = useState(false);

  const handleOpenCreateServiceSheet = () => {
    setIsCreateSheetOpened(true);
  };
  const handleCloseCreateServiceSheet = () => {
    setIsCreateSheetOpened(false);
  };

  return (
    <MyStack space="$5">
      <H2 fontWeight="700">Мои Услуги</H2>
      <SegmentedControl
        options={options}
        selectedOption={selectedOption}
        onOptionPress={setSelectedOption}
      />

      {selectedOption === SERVICES && (
        <>
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
        </>
      )}

      {selectedOption === SERVICE_REQUESTS && serviceRequestsData?.data && (
        <>
          <FlatList
            data={serviceRequestsData?.data.items}
            renderItem={({ item }) => (
              <Card>
                <Card.Header>
                  <H2>{item.service.name}</H2>
                  <Paragraph
                    fontWeight="600"
                    size="$5"
                    color="$gray9"
                  >
                    {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                  </Paragraph>
                </Card.Header>
                <Card.Footer padded>
                  <XStack
                    flex={1}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <H4>{item.status}</H4>
                    <MyButton borderRadius="$10">Принять</MyButton>
                  </XStack>
                </Card.Footer>
              </Card>
            )}
          />
        </>
      )}

      <CreateServiceSheet
        open={isCreateSheetOpened}
        onOpenChange={(open) => setIsCreateSheetOpened(open)}
        onClose={handleCloseCreateServiceSheet}
      />
    </MyStack>
  );
}
