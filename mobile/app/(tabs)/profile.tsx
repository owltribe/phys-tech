import { useRouter } from "expo-router";
import {
    Anchor,
    Avatar, Button, ButtonProps, H1,
    H2, H3, Input, Label,
    Paragraph, Separator, Sheet, YStack, XStack
} from "tamagui";

import { MyStack } from "../../components/MyStack";
import {ChevronRight} from "@tamagui/lucide-icons";
import {useState} from "react";

interface ChevronButtonProps extends ButtonProps {
    title: string;
}

const ChevronButton = ({ title, onPress }: ChevronButtonProps) => {
    return (
        <Button unstyled onPress={onPress}>
            <YStack space="$3">
                <Button unstyled>
                    <XStack space="$6" justifyContent="space-between" alignItems="center">
                        <H3>{title}</H3>
                        <Button.Icon>
                            <ChevronRight color="$gray9" size="$3" />
                        </Button.Icon>
                    </XStack>
                </Button>
            </YStack>
        </Button>
    );
};
export default function Profile() {
    const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
    const handleOpenEdit = () => setIsEditSheetOpen(true);

    return (
        <>
        <MyStack>
            <YStack
                space="$4"
                maxWidth={600}
            >
                <H2>Profile</H2>
                <Button unstyled onPress={handleOpenEdit}>
                    <XStack space="$6" justifyContent="space-between" alignItems="center">
                        <XStack>
                            <Avatar size="$7" marginRight={15}>
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
                                <H3>Jonas Black</H3>
                                <Paragraph  color="$gray9">@jonasblack</Paragraph>
                            </YStack>
                        </XStack>
                        <Button.Icon>
                            <ChevronRight color="$gray9" size="$3" />
                        </Button.Icon>
                    </XStack>
                </Button>
            </YStack>

            <Separator marginVertical={10} />

            <YStack space="$2.5">
                <Paragraph color="$gray8" size="$5">About Us</Paragraph>
                <ChevronButton title="FAQ" />
                <ChevronButton title="Privacy Policy" />
            </YStack>

            <Separator marginVertical={10} />

            <YStack>
                <Anchor size="$6" color="red">Logout</Anchor>
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
                <Sheet.Frame padding="$3" space="$4">
                    <H2>Edit Profile</H2>
                    <YStack mt="$space.4" alignItems="center" space="$2.5">
                        <XStack space="$4">
                            <Label width={90}  size='$5' htmlFor="first_name">First Name:</Label>
                            <Input size='$5' disabled id="first_name" defaultValue="Jonas" />
                        </XStack>
                        <XStack space="$4">
                            <Label width={90}  size='$5' htmlFor="last_name">Last Name:</Label>
                            <Input size='$5' disabled id="last_name" defaultValue="Black" />
                        </XStack>
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}
