import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    Circle,
    Theme,
    ThemeName,
    useWindowDimensions,
    XStack,
    YStack
} from "tamagui";

import { MultiStepControls } from "./MultiStepControls";
import Toast from "react-native-toast-message";

export type StepInfo = {
    theme: ThemeName;
    Content: React.FC;
    validate?: () => Promise<boolean>;
};

export type MultiStepProps = {
    title?: React.ReactNode;
    autoSwipe?: boolean;
    steps: StepInfo[];
};

export const MultiStepView = ({ steps, title }: MultiStepProps) => {
    const dimensions = useWindowDimensions();
    const safeAreaInsets = useSafeAreaInsets();

    const [stepIdx, _setStepIdx] = useState(0);

    const [key, setKey] = useState(0);
    const currentStep = steps[stepIdx]!;
    const stepsCount = steps.length;

    const setStepIdx = (newIdx: number) => {
        if (stepIdx !== newIdx) {
            _setStepIdx(newIdx);
            setKey(key + 1);
        }
    };

    const changePage = async (newStepIdx: number) => {
        if (newStepIdx > stepIdx) {
            const isValid = currentStep.validate ? await currentStep.validate() : true; // Await the validation result
            if (!isValid) {
                return Toast.show({
                    type: "error",
                    text1: "Пожалуйста, заполните все поля",
                    text2: "Проверьте правильность введенных данных",
                });
            }
        }

        setStepIdx(newStepIdx);
    };

    return (
        <Theme name={currentStep.theme as ThemeName}>
            <YStack
                flex={1}
                backgroundColor="$color3"
                overflow="hidden"
                paddingBottom={safeAreaInsets.bottom}
                paddingRight={safeAreaInsets.right}
                paddingTop={safeAreaInsets.top}
                paddingLeft={safeAreaInsets.left}
            >

                <Background />

                {title}

                <YStack flex={1}>
                    <YStack
                        key={stepIdx}
                        width={dimensions.width - (safeAreaInsets.left + safeAreaInsets.right)}
                    >
                        <currentStep.Content />
                    </YStack>
                </YStack>
                {
                    <XStack
                        gap={10}
                        jc="center"
                        my="$4"
                    >
                        {Array.from(Array(stepsCount)).map((_, idx) => {
                            const isActive = idx === stepIdx;
                            return (
                                <Point
                                    key={idx}
                                    active={isActive}
                                    onPress={() => changePage(idx)}
                                />
                            );
                        })}
                    </XStack>
                }
                <MultiStepControls
                    currentIdx={stepIdx}
                    onChange={(val) => changePage(val)}
                    stepsCount={stepsCount}
                />
            </YStack>
        </Theme>
    );
};

const Point = ({
                   active,
                   onPress
               }: {
    active: boolean;
    onPress: () => void;
}) => {
    return (
        <YStack
            br="$10"
            width={active ? 30 : 10}
            height={10}
            onPress={onPress}
            backgroundColor={active ? "$color7" : "$color6"}
        />
    );
};

export const Background = () => {
    const { height } = useWindowDimensions();
    return (
        <YStack
            pos="absolute"
            left={0}
            right={0}
            top={0}
            bottom={0}
            jc="center"
            ai="center"
        >
            <Circle
                animation={"lazy"}
                x={0}
                y={0}
                opacity={1}
                scale={1}
                backgroundColor="$color3"
                enterStyle={{
                    scale: 0
                }}
                exitStyle={{
                    scale: 10,
                    opacity: 0
                }}
                width={height * 3}
                height={height * 3}
            />
        </YStack>
    );
};
