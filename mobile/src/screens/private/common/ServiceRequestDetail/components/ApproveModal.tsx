import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import theme from "styles/theme";
import { white } from "utils/colors";
import { fontSize } from "utils/font-helper";

interface ApproveModalProps
  extends Pick<React.ComponentProps<typeof Dialog>, "visible" | "onDismiss"> {
  title: string;
  description: string;
  onConfirm: () => void;
  onDismiss: () => void;
  isLoading: boolean;
}

const ApproveModal = ({
  visible,
  onDismiss,
  title,
  description,
  onConfirm,
  isLoading
}: ApproveModalProps) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        dismissable={false}
        dismissableBackButton
        style={styles.dialog}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.description}>{description}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onDismiss}
            textColor={theme.colors.error}
            disabled={isLoading}
          >
            Отменить
          </Button>
          <Button
            onPress={onConfirm}
            loading={isLoading}
          >
            Подтвердить
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: white
  },
  title: {
    fontFamily: "GoogleSans-Medium"
  },
  description: {
    fontFamily: "GoogleSans-Regular",
    fontSize: fontSize.medium
  }
});

export default ApproveModal;
