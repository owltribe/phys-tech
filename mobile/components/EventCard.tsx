import {Card, H4, Paragraph, XStack} from "tamagui";

export default function EventCard({title, description} : {title: string, description: string }) {
    return (
        <Card elevate bordered size="$4" height={100} backgroundColor='transparent'>
            <Card.Header padded>
                <XStack justifyContent="space-between">
                    <H4>{title}</H4>
                    <H4>9am - 6pm</H4>
                </XStack>
                <XStack justifyContent="space-between">
                    <Paragraph>{description}</Paragraph>
                    <Paragraph>Dec 16</Paragraph>
                </XStack>
            </Card.Header>
        </Card>
    )
};
