import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import TextField from "components/fields/TextField";
import useCreateServiceRequest from "hooks/service_requests/useCreateServiceRequest";
import { getFormattedError } from "utils/error-helper";
import { showToastWithGravityAndOffset } from "utils/notifications";

import DefaultActionSheet from "./DefaultActionSheet";

const ServiceRequestCreation = ({
  payload
}: SheetProps<"ServiceRequestCreation">) => {
  const createServiceRequestMutation = useCreateServiceRequest();

  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (payload?.serviceId) {
      createServiceRequestMutation.mutate(
        { service_id: payload.serviceId, comment: comment ? comment : null },
        {
          onSuccess: () => {
            showToastWithGravityAndOffset(
              "Заявка на услугу была создана. Переключитесь на вкладку заявки, чтобы посмотреть актуальный статус."
            );
            SheetManager.hide("ServiceRequestCreation");
          },
          onError: (e) => {
            showToastWithGravityAndOffset(
              `Ошибка создания заявки на услугу. ${getFormattedError(
                e.response?.data.detail || ""
              )}`
            );
          }
        }
      );
    }
  };

  return (
    <DefaultActionSheet>
      <TextField
        label="Комментарий к заявке"
        multiline
        numberOfLines={6}
        onChangeText={setComment}
      />

      <View style={styles.buttonsContainer}>
        <SolidButton
          title="Отправить заявку на услугу"
          loading={createServiceRequestMutation.isPending}
          onPress={handleSubmit}
        />
        <OutlineButton
          title="Отменить"
          onPress={() => SheetManager.hide("ServiceRequestCreation")}
          disabled={createServiceRequestMutation.isPending}
          color="red"
        />
      </View>
    </DefaultActionSheet>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    gap: 8,
    marginTop: 16
  }
});

export default ServiceRequestCreation;
