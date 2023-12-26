import { Card, H4, Paragraph, XStack } from "tamagui";

export default function EventCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <Card
      bordered
      size="$4"
      height={100}
      backgroundColor="white"
    >
      <Card.Header padded>
        <XStack justifyContent="space-between">
          <H4>{title}</H4>
          <H4>8:00 - 9:00</H4>
        </XStack>
        <XStack justifyContent="space-between">
          <Paragraph>{description}</Paragraph>
          <Paragraph>12/10/2023</Paragraph>
        </XStack>
      </Card.Header>
    </Card>
  );
}
