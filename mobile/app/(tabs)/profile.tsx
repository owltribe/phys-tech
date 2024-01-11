import { NamedExoticComponent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IconProps } from "@tamagui/helpers-icon";
import {
  ChevronRight,
  HelpCircle,
  LogOut,
  Mail,
  Mailbox,
  PencilLine,
  Phone,
  ShieldCheck
} from "@tamagui/lucide-icons";
import { MyStack } from "components/MyStack";
import { MyTextInput } from "components/MyTextInput";
import { MyButton } from "components/tamagui/MyButton";
import useEditUser from "hooks/user/useEditUser";
import { useAuth } from "providers/AuthProvider";
import {
  Anchor,
  Avatar,
  Button,
  ButtonProps,
  H2,
  H3,
  Label,
  Paragraph,
  Separator,
  Sheet,
  XStack,
  YStack
} from "tamagui";
import { UserRead } from "types/generated";
interface ChevronButtonProps extends ButtonProps {
  title: string;
  isRed?: boolean;
  onPress?: () => void;
  icon: NamedExoticComponent<IconProps>;
}

interface FormValues {
  first_name: string;
}

const ChevronButton = ({
  title,
  onPress,
  isRed,
  icon: Icon
}: ChevronButtonProps) => {
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
            <XStack
              alignItems="center"
              space="$3"
            >
              <Icon
                size="$2"
                color={isRed ? "$red9" : "$blue9"}
              />
              <Paragraph
                size="$5"
                fontWeight="800"
                color={isRed ? "$red9" : undefined}
              >
                {title}
              </Paragraph>
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
  const { user, onLogout }: { user: UserRead; onLogout: () => void } =
    useAuth();

  const editUser = useEditUser();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      first_name: ""
    }
  });
  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    editUser.mutate(formValues, {
      onSuccess: () => {
        setIsEditSheetOpen(false);
      }
    });
  };

  const logout = () => {
    onLogout();
  };

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
            <PencilLine
              onPress={handleOpenEdit}
              color="$blue9"
              size="$3"
            />
          </XStack>
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
          <YStack>
            <XStack
              alignItems="center"
              space="$3"
            >
              <Phone
                size={16}
                color="$gray9"
              />
              <Paragraph
                size="$5"
                color="$gray9"
              >
                +628992344221
              </Paragraph>
            </XStack>
            <XStack
              alignItems="center"
              space="$3"
            >
              <Mail
                size={16}
                color="$gray9"
              />
              <Paragraph
                size="$5"
                color="$gray9"
              >
                {user.email}
              </Paragraph>
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
          <ChevronButton
            title="FAQ"
            icon={HelpCircle}
          />
          <ChevronButton
            title="Политика конфиденциальности"
            icon={ShieldCheck}
          />
          <ChevronButton
            title="Выйти"
            icon={LogOut}
            isRed
          />
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
              <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  name="first_name"
                  render={({ field: { onChange, onBlur, value } }) => (
                      <MyTextInput
                          placeholder="Имя"
                          autoComplete="name"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                      />
                  )}
              />
            </YStack>
            <MyButton
                mt="$4"
                onPress={handleSubmit(onSubmit)}
            >
              Изменить
            </MyButton>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
