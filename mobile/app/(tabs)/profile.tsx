import { NamedExoticComponent, useState } from "react";
import {ChevronRight, HelpCircle, LogOut, Mail, Mailbox, PencilLine, Phone, ShieldCheck} from "@tamagui/lucide-icons";
import { MyStack } from "components/MyStack";
import { useAuth } from "providers/AuthProvider";
import {
  Anchor,
  Avatar,
  Button,
  ButtonProps,
  H2, H3,
  H5,
  Input,
  Label,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack
} from "tamagui";
import {IconProps} from "@tamagui/helpers-icon";


import { UserRead } from "types/generated";
interface ChevronButtonProps extends ButtonProps {
  title: string;
  isRed?: boolean;
  icon: NamedExoticComponent<IconProps>;
}

const ChevronButton = ({ title, onPress, isRed, icon: Icon }: ChevronButtonProps) => {
  return (
    <Button
      unstyled
      onPress={onPress}
    >
      <YStack space="$3">
        <Button unstyled>
          <XStack
            space="$6"
            justifyContent="space-between"
            alignItems="center"
          >
            <XStack alignItems="center" space="$3">
              <Icon size="$2" color={isRed ? "$red9" : "$blue9"} />
              <Paragraph size="$5" fontWeight="800" color={isRed ? "$red9": undefined}>{title}</Paragraph>
            </XStack>
            <Button.Icon>
              <ChevronRight
                color={isRed ? "$red9" : "$gray9"}
                size="$3"
              />
            </Button.Icon>
          </XStack>
        </Button>
      </YStack>
    </Button>
  );
};
export default function Profile() {
  const { user }: { user: UserRead } = useAuth();

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const handleOpenEdit = () => setIsEditSheetOpen(true);

  return (
    <>
      <MyStack>
        <YStack
          space="$4"
          maxWidth={600}
        >
          <XStack justifyContent="space-between">
            <H2>Профиль</H2>
            <Button.Icon>
              <PencilLine
                  color="$blue9"
                  size="$3"
              />
            </Button.Icon>
          </XStack>
          <Button
            unstyled
            onPress={handleOpenEdit}
          >
            <XStack
              space="$6"
              justifyContent="space-between"
              alignItems="center"
            >
              <XStack>
                <Avatar
                  size="$7"
                  marginRight={15}
                >
                  <Avatar.Image
                    borderRadius="$space.20"
                    accessibilityLabel="Cam"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                  />
                  <Avatar.Fallback
                    borderRadius="$space.20"
                    backgroundColor="$gray6"
                  />
                </Avatar>
                <YStack justifyContent="center">
                  <H3>{user.full_name}</H3>
                  <Paragraph color="$gray9">{user.email}</Paragraph>
                </YStack>
              </XStack>
            </XStack>
          </Button>
          <YStack>
            <XStack alignItems="center" space="$3">
              <Phone size={16} color="$gray9" />
              <Paragraph size="$5" color="$gray9">+628992344221</Paragraph>
            </XStack>
            <XStack alignItems="center" space="$3">
              <Mail size={16} color="$gray9" />
              <Paragraph size="$5" color="$gray9">{user.email}</Paragraph>
            </XStack>
          </YStack>
        </YStack>

        <Separator marginVertical={10} />

        <YStack space="$2.5">
          <Paragraph
            color="$gray8"
            size="$5"
          >
            О нас
          </Paragraph>
          <ChevronButton title="FAQ" icon={HelpCircle} />
          <ChevronButton title="Политика конфиденциальности" icon={ShieldCheck} />
          <ChevronButton title="Выйти" icon={LogOut} isRed />
        </YStack>
      </MyStack>

      <Sheet
        modal={true}
        open={isEditSheetOpen}
        onOpenChange={setIsEditSheetOpen}
        zIndex={100_000}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame
          padding="$3"
          space="$4"
        >
          <H2>Редактировать</H2>
          <YStack
            mt="$4"
            space="$2.5"
          >
            <YStack space="$0.5">
              <Label
                width={90}
                size="$5"
                htmlFor="first_name"
              >
                Имя:
              </Label>
              <Input
                size="$5"
                disabled
                id="first_name"
                defaultValue="Jonas"
              />
            </YStack>
            <YStack space="$0.5">
              <Label
                width={90}
                size="$5"
                htmlFor="last_name"
              >
                Фамилия:
              </Label>
              <Input
                size="$5"
                disabled
                id="last_name"
                defaultValue="Black"
              />
            </YStack>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
