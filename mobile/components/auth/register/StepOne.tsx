import React from "react";
import {Control, Controller} from "react-hook-form";
import { Spinner, YStack } from "tamagui";

import { MyStack } from "../../tamagui/MyStack";
import { MyTextInput } from "../../tamagui/MyTextInput";

const StepOne = ({ control }: { control: Control<any, any>}) => {
    return (
        <MyStack backgroundColor="$color3" jc="center">
            <YStack mt="$4">
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Электронная почта"
                            autoComplete="email"
                            inputMode="email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
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
                            inputMode="text"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="last_name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Фамилия"
                            autoComplete="family-name"
                            inputMode="text"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Пароль"
                            autoComplete="password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="rePassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Повтроите пароль"
                            autoComplete="password-new"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
            </YStack>
        </MyStack>
    );
};

export default StepOne;
