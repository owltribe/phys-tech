import * as React from "react";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  TouchableRipple
} from "react-native-paper";

import TextField, { TextFieldProps } from "./TextField";

type CheckedState = "normal" | "first" | "second" | "third" | "fourth";

interface DialogWithRadioBtnsProps {
  textField: TextFieldProps;
  items: { label: string; value: string }[];
  onSubmit: (v: string) => void;
}

const DialogWithRadioBtns = ({
  textField,
  items,
  onSubmit
}: DialogWithRadioBtnsProps) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string | undefined>(
    textField.value || undefined
  );

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const valueLabel = items.find((i) => i.value === textField.value)?.label;
  return (
    <>
      <TextField
        {...textField}
        value={valueLabel}
        mode="outlined"
        caretHidden={true}
        onPressIn={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }}
        autoFocus={false}
        showSoftInputOnFocus={false}
      />

      <Portal>
        <Dialog
          onDismiss={onClose}
          visible={visible}
        >
          <Dialog.Title>{textField?.label || "Выберите опцию"}</Dialog.Title>
          <Dialog.ScrollArea style={styles.container}>
            <ScrollView persistentScrollbar>
              <View>
                {items.map((i) => (
                  <TouchableRipple
                    key={i.value}
                    onPress={() => setValue(i.value)}
                  >
                    <View style={styles.row}>
                      <View pointerEvents="none">
                        <RadioButton
                          value="normal"
                          status={value === i.value ? "checked" : "unchecked"}
                        />
                      </View>
                      <Text
                        variant="bodyLarge"
                        style={styles.text}
                      >
                        {i.label}
                      </Text>
                    </View>
                  </TouchableRipple>
                ))}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={onClose}>Отмена</Button>
            <Button
              onPress={() => {
                onClose();
                if (value) {
                  onSubmit(value);
                }
              }}
            >
              Подтвердить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default DialogWithRadioBtns;

const styles = StyleSheet.create({
  container: {
    maxHeight: 170,
    paddingHorizontal: 0
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    paddingLeft: 8
  }
});
