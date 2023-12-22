import {
    Button,
    H2,
    H3,
    Image, Input,
    Paragraph, ScrollView, Stack, YStack,
} from "tamagui";
import React from "react";
import {MyStack} from "../../components/MyStack";
import {useRouter} from "expo-router";
import {ArrowLeftCircle} from "@tamagui/lucide-icons";

const data = ['Измерение морфологии поверхности методом АСМ. ',`Получение трехмерного изображения (топографии) и локальных характеристик материала с высоким разрешением;`]

export default function Service() {
    const router = useRouter();

    return (
        <MyStack p="$4">
            <YStack space="$3">
                <Image
                    source={{ uri: "https://sev.severance.healthcare/_res/yuhs/sev-en/img/ihc/medical-service/img-medical-service.jpg" }}
                    width='100%'
                    height={200}
                    borderRadius="$space.4"
                />
                <H2 mt="$2">Лаборатория инновационных материалов:</H2>
            </YStack>
            <ScrollView mt="$space.2">
                <YStack px='$2' space="$3">
                    {data.map((item) => <Paragraph size="$5">{"\u2022 "}{item}</Paragraph>)}
                </YStack>

                <YStack space="$3">
                    <H3>Дополнительный возможности:</H3>
                    <Button size='sm' maxWidth={100}>FAQ</Button>
                </YStack>
            </ScrollView>
            <Button
                size="lg"
                position="absolute"
                bottom={20}
                left={12}
                right={12}
                theme="blue"
            >
                Записаться
            </Button>
            <Button
                size="$2"
                position="absolute"
                top={30}
                left={25}
                onPress={() => router.back()}>
                <ArrowLeftCircle size={24} />
            </Button>
        </MyStack>
    );
}
