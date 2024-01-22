import React from "react";
import {Control, Controller} from "react-hook-form";
import { Spinner, YStack } from "tamagui";

import { MyStack } from "../../tamagui/MyStack";
import { MyTextInput } from "../../tamagui/MyTextInput";
import SegmentedControl from "../../SegmentedControl";
import {UserRole} from "../../../types/generated";

const StepOne = ({ control, role, setRole }: { control: Control<any, any>, role: UserRole, setRole: (role: UserRole) => void }) => {
    const options: { label: string; value: UserRole }[] = [
        { label: "Организация", value: "Organization" },
        { label: "Клиент", value: "Client" }
    ];

    return (
        <>
            <SegmentedControl
                options={options}
                selectedOption={role}
                onOptionPress={setRole as (p: UserRole) => void}
            />
            <Controller
                control={control}
                rules={{
                    required: true
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <MyTextInput
                        mt="$4"
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
        </>
    );
};

export default StepOne;
