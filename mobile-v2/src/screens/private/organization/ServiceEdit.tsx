import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import ScreenWrapper from "components/ScreenWrapper";
import * as ImagePicker from "expo-image-picker";
import useDestroyServiceImage from "hooks/service-image/useDestroyServiceImage";
import useServiceImages from "hooks/services/useServiceImages";
import useUpdateService from "hooks/services/useUpdateService";
import useUploadServiceImage from "hooks/services/useUploadServiceImage";
import { Folder, Save, Trash2 } from "lucide-react-native";
import { ServiceEditScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { ServiceUpdate } from "types/generated";
import { mantineColors, white } from "utils/colors";
import { getFormattedError } from "utils/error-helper";
import {
  showToastWithGravity,
  showToastWithGravityAndOffset
} from "utils/notifications";

interface FormValues {
  name: string;
  description: string;
  expected_result: string;
  cost: string;
}

const ServiceEdit = ({
  navigation,
  route: {
    params: { service }
  }
}: ServiceEditScreenProps) => {
  const updateServiceMutation = useUpdateService(service.id);
  const uploadServiceImageMutation = useUploadServiceImage(service.id);
  const destroyServiceImageMutation = useDestroyServiceImage();

  const { data: serviceImagesData, isLoading } = useServiceImages(service.id);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: service.name,
      description: service.description || "",
      expected_result: service.expected_result || "",
      cost: String(service.cost) || ""
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (formValues) => {
    updateServiceMutation.mutate(
      { ...formValues, cost: Number(formValues.cost) } as ServiceUpdate,
      {
        onError: (error) => {
          showToastWithGravity(String(error.response?.data.detail));
        },
        onSuccess: () => {
          reset();
          showToastWithGravity(`Услуга обновлена.`);
          navigation.navigate("Service", { serviceId: service.id });
        }
      }
    );
  };

  const handleUploadServiceImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      const formData = new FormData();

      const image = {
        uri: result.assets[0].uri,
        type: "image/png",
        name: `service-image-${service.id}`
      };
      // @ts-ignore
      formData.append("image", image);

      uploadServiceImageMutation.mutate(formData, {
        onSuccess: () => {
          showToastWithGravityAndOffset("Изображение успешно загружено");
        },
        onError: (error) => {
          showToastWithGravityAndOffset(
            getFormattedError(
              error.response?.data.detail || "Не удалось загрузить изображение"
            )
          );
        }
      });
    }
  };

  const handleDestroyServiceImage = (serviceImageId: string) => {
    destroyServiceImageMutation.mutate(serviceImageId);
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Название услуги"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.name && "Поле названия услуги обязательное."}
            />
          )}
        />

        <Controller
          control={control}
          name="expected_result"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Предполагаемый результат"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || undefined}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Описание"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value || undefined}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="cost"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              mode="outlined"
              label="Стоимость в KZT"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              maxLength={10}
              error={errors?.cost && "Поле стоимости услуги обязательное."}
            />
          )}
        />

        {!!serviceImagesData?.data && !!serviceImagesData.data.length && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            persistentScrollbar
            style={styles.imagesScrollContainer}
          >
            {serviceImagesData.data.map((si) => (
              <TouchableOpacity
                key={si.id}
                style={styles.imageContainer}
                onPress={() => handleDestroyServiceImage(si.id)}
                disabled={
                  uploadServiceImageMutation.isPending ||
                  destroyServiceImageMutation.isPending ||
                  isLoading
                }
              >
                <>
                  {uploadServiceImageMutation.isPending ||
                  destroyServiceImageMutation.isPending ||
                  isLoading ? (
                    <ActivityIndicator
                      color={white}
                      style={styles.destroyImgButton}
                      size={28}
                    />
                  ) : (
                    <Trash2
                      color={mantineColors.red[6]}
                      size={28}
                      style={styles.destroyImgButton}
                    />
                  )}
                  <Image
                    source={{ uri: si.url }}
                    style={styles.image}
                  />
                </>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.buttonsContainer}>
          <OutlineButton
            title="Добавить изображение"
            Icon={Folder}
            disabled={
              updateServiceMutation.isPending ||
              destroyServiceImageMutation.isPending
            }
            loading={uploadServiceImageMutation.isPending || isLoading}
            onPress={handleUploadServiceImage}
          />
          <SolidButton
            title="Cохранить изменения"
            Icon={Save}
            loading={updateServiceMutation.isPending}
            disabled={
              uploadServiceImageMutation.isPending ||
              destroyServiceImageMutation.isPending
            }
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imagesScrollContainer: {
    paddingTop: 12,
    paddingBottom: 14
  },
  imageContainer: {
    flex: 1,
    height: 180,
    width: 180,
    marginRight: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  destroyImgButton: {
    zIndex: 15
  },
  buttonCloseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonsContainer: {
    flex: 1,
    marginTop: 16,
    gap: 8
  }
});

export default ServiceEdit;
