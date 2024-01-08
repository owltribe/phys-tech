import type { IconProps } from "@tamagui/helpers-icon";
import { ChevronRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Avatar, Button, Card, H2, Paragraph, XStack, YStack } from "tamagui";
import { neutral } from "utils/colors";

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
      width="100%"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      p="$2"
      bordered={false}
      borderWidth={0}
      borderRadius="$6"
      backgroundColor={`$${theme}2`}
      style={{
        shadowColor: neutral["400"],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 6
      }}
    >
      <Card.Header padded>
        <XStack
          space
          alignItems="center"
          justifyContent="space-between"
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

          <Button
            theme={theme}
            borderRadius="$10"
            circular
          >
            <ChevronRight
              size="$2"
              strokeWidth={2}
              color={neutral["600"]}
              onPress={handlePress}
            />
          </Button>
        </XStack>
      </Card.Header>
      <Card.Footer padded>
        <YStack space="$2">
          <H2 fontWeight="600">{title}</H2>
          <Paragraph theme="alt2">{description}</Paragraph>
        </YStack>
      </Card.Footer>
    </Card>
  );
};

export default PreviewLinkCard;
