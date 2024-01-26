import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import theme from "styles/theme";

interface ApproveModalProps
  extends Pick<React.ComponentProps<typeof Dialog>, "visible" | "onDismiss"> {
  title: string;
  description: string;
  onConfirm: () => void;
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
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>{description}</Text>
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

export default ApproveModal;
