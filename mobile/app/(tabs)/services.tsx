import { useRouter } from "expo-router";
import {
    Paragraph,
} from "tamagui";

import { MyStack } from "../../components/MyStack";

export default function Services() {
    const router = useRouter();

    return (
        <MyStack>
            <Paragraph>Hello world IT IS Services</Paragraph>
        </MyStack>
    );
}
