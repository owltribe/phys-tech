import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
    KeyboardAvoidingView,
    Modal,
    ModalProps,
    StyleSheet,
    View
} from "react-native";
import {Button, IconButton, Text, Avatar, MD3Colors} from "react-native-paper";
import TextField from "components/fields/TextField";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import { commonStyles } from "styles/commonStyles";
import { showToastWithGravity } from "utils/notifications";

import * as ImagePicker from 'expo-image-picker';
import useUpdateOrganization from "../../../../../hooks/organization/useUpdateOrganization";
import {Category, OrganizationRead} from "../../../../../types/generated";
import DropDown from "react-native-paper-dropdown";
import React, {useState} from "react";
import theme from "../../../../../styles/theme";

interface AddServiceModalProps extends Pick<ModalProps, "visible"> {
    onClose: () => void;
}

interface FormValues {
    name: string;
    bin: string;
    address: string;
    contact: string;
    email: string;
    description: string;
    category: (Category | null);

    photo: any | null;
}

interface UpdateOrganizationModelProps extends Pick<ModalProps, "visible"> {
    onClose: () => void;
    organization: OrganizationRead;
}

const UpdateOrganizationModel = ({ visible, onClose, organization }: UpdateOrganizationModelProps) => {
    const updateOrganization = useUpdateOrganization();
    const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<FormValues>({
        defaultValues: {
            name: organization.name,
            bin: organization.bin || '',
            address: organization.address || '',
            contact: organization.contact || '',
            email: organization.email,
            description: organization.description,
            category: organization.category || 'Научная организация',
            photo: null,
        }
    });


    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && Array.isArray(result?.assets)) {
            setValue('photo', result.assets[0]);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = (formValues) => {
        const payload = {
            organizationId: organization.id,
            updatedOrganization: {id: organization.id, ...formValues},
            photo: formValues.photo || null
        };

        updateOrganization.mutate(payload, {
            onError: (error) => {
                showToastWithGravity(String(error.response?.data.detail));
            },
            onSuccess: (response) => {
                onClose();
                reset();
                showToastWithGravity(`Организация обновлена.`);
            }
        });
    };

    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
            presentationStyle="formSheet"
        >
            <ScreenWrapper withScrollView={false}>
                <KeyboardAvoidingView style={commonStyles.container}>
                    <View style={styles.buttonClose}>
                        <Text
                            variant="headlineMedium"
                            style={{ fontWeight: "800" }}
                        >
                            Обновление организации
                        </Text>

                        <IconButton
                            mode="contained-tonal"
                            icon="close"
                            size={22}
                            onPress={onClose}
                        />
                    </View>

                    {getValues('photo') ? (
                        <Avatar.Image size={24} source={{ uri: getValues('photo').uri }} />
                    ): (
                        <Avatar.Text
                            style={{
                                backgroundColor: theme.colors.primary,
                                marginRight: 16,
                                marginTop: 8,
                                marginHorizontal: 'auto'
                            }}
                            label={'O'}
                            color={MD3Colors.primary100}
                            size={60}
                        />
                    )
                    }
                    <Button mode="contained" onPress={openImagePicker}>Загрузить фото</Button>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="Название организации"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="bin"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="БИН"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value || undefined}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="address"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="Адрес"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value || undefined}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="contact"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="Контактная информация"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value || undefined}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="Почта"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="description"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                mode="outlined"
                                label="Описание организаций"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        name="category"
                        render={({ field: { onChange, value } }) => (
                            <DropDown
                                label="Категория Организации"
                                mode="outlined"
                                visible={showCategoryDropDown}
                                showDropDown={() => setShowCategoryDropDown(true)}
                                onDismiss={() => setShowCategoryDropDown(false)}
                                value={value}
                                setValue={(v) => onChange(v)}
                                list={[
                                    {
                                        label: "Научная организация",
                                        value: "Научная организация"
                                    },
                                    { label: "Вуз", value: "Вуз" },
                                    { label: "Технопарк", value: "Технопарк" },
                                    {
                                        label: "Лаборатория",
                                        value: "Коммерческая Лабораторная компания"
                                    }
                                ]}
                            />
                        )}
                    />
                    <View style={styles.buttonSubmit}>
                        <PrimaryButton
                            mode="contained"
                            loading={updateOrganization.isPending}
                            onPress={handleSubmit(onSubmit)}
                        >
                            Обновить Организацию
                        </PrimaryButton>
                    </View>
                </KeyboardAvoidingView>
            </ScreenWrapper>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonClose: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    buttonSubmit: {
        marginTop: 8
    }
});

export default UpdateOrganizationModel;
