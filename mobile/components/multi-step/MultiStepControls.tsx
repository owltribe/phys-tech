import { ChevronRight } from "@tamagui/lucide-icons";
import { Button, XStack, Text } from "tamagui";

export type MultiStepControlsProps = {
    currentIdx: number;
    onChange: (newIdx: number) => void;
    stepsCount: number;
};

export const MultiStepControls = ({
                                       currentIdx,
                                       onChange,
                                       stepsCount,
                                   }: MultiStepControlsProps) => {
    const handleGoNext = () => {
        if (currentIdx + 1 > stepsCount - 1) {
            return;
        }
        onChange(currentIdx + 1);
    };

    const handleGoPrev = () => {
        if (currentIdx - 1 < 0) {
            return;
        }
        onChange(currentIdx - 1);
    };

    return (
        <XStack
            jc="space-between"
            ai="center"
            p="$5"
            gap="$5"
        >
            <Button
                chromeless
                color="$color"
                pressStyle={{
                    backgroundColor: "$color6"
                }}
                borderRadius="$10"
                onPress={() => handleGoPrev()}
            >
                Назад
            </Button>
            {(currentIdx + 1 < stepsCount) && (
                <Button
                    pressStyle={{
                        backgroundColor: "$color6",
                        borderColor: "$color6"
                    }}
                    chromeless
                    bordered
                    borderColor="$color"
                    f={1}
                    borderRadius="$10"
                    color="$color"
                    onPress={() => handleGoNext()}
                    iconAfter={ChevronRight}
                    disabled={currentIdx + 1 > stepsCount - 1}
                >
                    Далее
                </Button>
            )}
        </XStack>
    );
};
