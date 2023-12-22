import {
    H2,
    H3,
    Input,
    ScrollView, Stack, YStack,
} from "tamagui";

import { MyStack } from "../../components/MyStack";
import EventCard from "../../components/EventCard";

export default function Events() {

    return (
        <MyStack>
            <YStack space="$3">
                <YStack
                    space="$2.5"
                >
                    <H2>Мероприятия</H2>
                    <Input size="$4" placeholder="Искать Мероприятия" borderRadius='$space.10'  />
                    <ScrollView mt="$space.2">
                        <YStack space="$4">
                            <EventCard title="Service" description="Description of Service" />
                            <EventCard title="Service" description="Description of Service" />
                            <EventCard title="Service" description="Description of Service" />
                            <EventCard title="Service" description="Description of Service" />
                        </YStack>
                    </ScrollView>
                </YStack>

            </YStack>
        </MyStack>
    );
}
