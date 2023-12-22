import {
    H2,
    H3,
    Image, Input,
    Paragraph, ScrollView, Stack, YStack,
} from "tamagui";

import { MyStack } from "../../components/MyStack";

export const ServiceCard = ({title, description, imageUrl} : {title: string, description: string, imageUrl: string}) => {
    return (
        <YStack>
            <Image
                source={{ uri: imageUrl }}
                style={{ width: 180, height: 140}}
                borderRadius={8}
            />
            <YStack p="$space.2">
                <H3>{title}</H3>
                <Paragraph>{description}</Paragraph>
            </YStack>
        </YStack>

    )
};

export default function Services() {

    return (
        <MyStack>
                <YStack space="$3">
                    <YStack
                        space="$2.5"
                    >
                        <H2>Услуги</H2>
                        <Input size="$4" placeholder="Искать Услуги" borderRadius='$space.10'  />
                        <ScrollView mt="$space.2">
                            <Stack flexDirection='row' flexWrap="wrap" justifyContent="space-between" rowGap={10}>
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                                <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                            </Stack>
                        </ScrollView>
                    </YStack>

                </YStack>
        </MyStack>
    );
}
