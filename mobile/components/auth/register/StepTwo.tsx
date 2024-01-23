import React from "react";
import {Control, Controller} from "react-hook-form";
import { MyTextInput } from "../../tamagui/MyTextInput";
import { Category } from "../../../types/generated";
import SegmentedControl from "../../SegmentedControl";

const StepTwo = (
    {
        control,
        category,
        setCategory
    }: {
        control: Control<any, any>,
        category: Category,
        setCategory: (category: Category) => void
}) => {

    const options: { label: string; value: Category }[] = [
        { label: "Научная орг.", value: "Научная организация" },
        { label: "Вуз", value: "Вуз" },
        { label: "Технопарк", value: "Технопарк" },
        { label: "Лаборатория", value: "Коммерческая Лабораторная компания" }
    ];

    return (
        <>
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
            <SegmentedControl
                options={options}
                selectedOption={category}
                onOptionPress={setCategory as (p: Category) => void}
            />
        </>
    );
};

export default StepTwo;
