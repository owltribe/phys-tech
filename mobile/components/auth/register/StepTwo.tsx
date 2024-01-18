import React from "react";
import {Control, Controller} from "react-hook-form";
import {MyStack} from "../../tamagui/MyStack";
import {MyTextInput} from "../../tamagui/MyTextInput";
import {MyButton} from "../../tamagui/MyButton";
import {Spinner, YStack} from "tamagui";
import SelectCustom from "../../SelectCustom";

const StepTwo = (
    {
        control,
        isRegisterLoading,
        handleSubmit,
        onSubmit
    }: {
        control: Control<any, any>,
        isRegisterLoading: boolean,
        handleSubmit: any,
        onSubmit: (data: any) => void
}) => {

    const categorySelectItems = [{ name: "Научная " }, { name: "Вуз" }, { name: "Технопарк" }, { name: "Коммерческая Лабораторная компания" }];

    return (
        <MyStack backgroundColor="$color3" jc="center">
            <YStack mt="$4">
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Название организации"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.bin"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="БИН"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.address"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Адрес"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.contact"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Контактная информация"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Почта"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <MyTextInput
                            placeholder="Описание организаций"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    name="organization_data.category"
                    render={({ field: { onChange, value } }) => (
                        <SelectCustom
                            placeholder="Категория"
                            label="Категория"
                            items={categorySelectItems}
                            value={value}
                            onValueChange={onChange}
                        />
                    )}
                />
                <MyButton
                    mt="$4"
                    color="$color1"
                    backgroundColor="$color9"
                    icon={isRegisterLoading ? <Spinner /> : undefined}
                    disabled={isRegisterLoading}
                    onPress={handleSubmit(onSubmit)}
                >
                    Зарегистрироваться
                </MyButton>
            </YStack>
        </MyStack>
    );
};

export default StepTwo;
