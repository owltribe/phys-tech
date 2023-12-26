import { MyStack } from "components/MyStack";
import { useRouter } from "expo-router";
import {
  Card,
  H2,
  H3,
  H4,
  Image,
  Input,
  Paragraph,
  ScrollView,
  Stack,
  YStack
} from "tamagui";

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
              {/*<Card.Background>*/}
              {/*  <Image*/}
              {/*    resizeMode="cover"*/}
              {/*    alignSelf="center"*/}
              {/*    source={{*/}
              {/*      width: 300,*/}
              {/*      height: 300,*/}
              {/*      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeavdP9LMP2O_5PlsdSSCOM3nbt0fsLjPNVA&usqp=CAU"*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</Card.Background>*/}
            </Card>
          ))}
        </Stack>
      </ScrollView>
    </MyStack>
  );
}
