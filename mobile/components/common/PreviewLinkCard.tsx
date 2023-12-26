import type { IconProps } from "@tamagui/helpers-icon";
import { useRouter } from "expo-router";
import { Avatar, Button, Card, H2, Paragraph, XStack } from "tamagui";

type ButtonProps = React.ComponentProps<typeof Button>;

interface LinkCardProps {
  title: string;
  description: string;
  theme: ButtonProps["theme"];
  Icon: React.NamedExoticComponent<IconProps>;
  link?: string;
}

const PreviewLinkCard = ({
  title,
  description,
  theme,
  Icon,
  link
}: LinkCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <Card
      animation="lazy"
      size="$4"
      width="100"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      p="$2"
      bordered
      borderRadius="$6"
      backgroundColor={`$${theme}2`}
    >
      <Card.Header padded>
        <XStack
          space
          mb="$4"
          alignItems="center"
        >
          <Avatar
            size="$5"
            backgroundColor={`$${theme}6`}
            bordered
            borderColor={`$${theme}8`}
            borderRadius="$5"
          >
            <Icon
              strokeWidth={1}
              size="$2"
              color={`$${theme}10`}
            />
          </Avatar>
          <H2 fontWeight="900">{title}</H2>
        </XStack>
        <Paragraph theme="alt2">{description}</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button
          theme={theme}
          borderRadius="$10"
          onPress={handlePress}
        >
          Перейти
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PreviewLinkCard;
