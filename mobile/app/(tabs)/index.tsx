import {
    Card, CardProps,
    H2,
    ScrollView,
    XStack,
    YStack,
    Image, H3, Paragraph, Input, H4,
} from "tamagui";

import { MyStack } from "../../components/MyStack";
import EventCard from "../../components/EventCard";
export const ServiceCard = ({title, description, imageUrl} : {title: string, description: string, imageUrl: string}) => {
    return (
        <YStack >
            <Image
                source={{ uri: imageUrl }}
                style={{ width: 160, height: 140}}
                borderRadius={8}
            />
            <YStack>
                <H3>{title}</H3>
                <Paragraph>{description}</Paragraph>
            </YStack>
        </YStack>

    )
}

export const ScienceOrganizationCard = ({title, description, imageUrl, ...props}: CardProps & {title: string, description: string, imageUrl: string}) => {
  return (
      <Card elevate bordered size="$4" {...props} width={150} height={250}>
        <Card.Header padded style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
          <H3 color='white'>{title}</H3>
          <Paragraph color='white'>{description}</Paragraph>
        </Card.Header>
        <Card.Background>
            <Image
                source={{ uri: imageUrl }}
                style={{ width: '100%', height: '100%' }}
                borderRadius={8}
            />
        </Card.Background>
      </Card>
  )
}

export default function Home() {

  return (
    <MyStack>
        <ScrollView showsVerticalScrollIndicator={false}>
            <YStack space="$3"  >
                  <YStack
                      space="$2.5"
                  >
                      <Input size="$4" placeholder="Search" borderRadius='$space.10'  />
                      <H2>Научные Организаций</H2>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal space="$5" mt="$space.2">
                      <ScienceOrganizationCard title="PhysTech" description="Description of the org" imageUrl="https://media.istockphoto.com/id/1270632735/photo/model-of-atom-and-elementary-particles-physics-concept-3d-rendered-illustration.jpg?s=612x612&w=0&k=20&c=n-Y_YPN6MtUS6OZf74oW2Bn68snhi6J2WI5ua3w0Skg=" />
                      <ScienceOrganizationCard title="BioTech" description="Description of the org" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeavdP9LMP2O_5PlsdSSCOM3nbt0fsLjPNVA&usqp=CAU" />
                    </ScrollView>
                  </YStack>

                  <YStack>
                      <H2>Уcлуги</H2>
                      <ScrollView showsHorizontalScrollIndicator={false} horizontal space="$5" mt="$space.2">
                        <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                        <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />
                        <ServiceCard title="Service" description="Description of Service" imageUrl="https://www.enterpriseappstoday.com/wp-content/uploads/2023/05/Clinical-Laboratory-Services-market.jpg" />

                      </ScrollView>
                  </YStack>

                  <YStack>
                    <H2>Мероприятия</H2>
                    <ScrollView showsVerticalScrollIndicator={false} space="$3" mt="$space.2">
                        <EventCard title="Service" description="Description of Service" />
                        <EventCard title="Service" description="Description of Service" />
                        <EventCard title="Service" description="Description of Service" />
                    </ScrollView>
                  </YStack>
            </YStack>
        </ScrollView>
    </MyStack>
  );
}
