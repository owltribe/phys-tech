import { ChevronRight } from "@tamagui/lucide-icons";
import { Button, XStack } from "tamagui";

export type OnboardingControlsProps = {
  currentIdx: number;
  onChange: (newIdx: number) => void;
  stepsCount: number;
  /**
   * native only
   */
  onFinish?: () => void;
};

export const OnboardingControls = ({
  currentIdx,
  onChange,
  stepsCount,
  onFinish
}: OnboardingControlsProps) => {
  const handleGoNext = () => {
    if (currentIdx + 1 > stepsCount - 1) {
      onFinish?.();
      return;
    }
    onChange(currentIdx + 1);
  };

  const handleSkip = () => {
    onFinish?.();
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
        onPress={() => handleSkip()}
      >
        Авторизоваться
      </Button>

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
      >
        Далее
      </Button>
    </XStack>
  );
};
