import * as React from "react";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { RadioButton, TouchableRipple } from "react-native-paper";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import Title from "components/typography/Title";
import { commonStyles } from "styles/commonStyles";
import { organizationCategories } from "utils/enum-helpers";
import { fontSize } from "utils/font-helper";

import TextField, { TextFieldProps } from "./TextField";

interface OrganizationCategoriesSelectProps {
  textField: TextFieldProps;
  onSubmit: (v: string) => void;
}

const OrganizationCategoriesSelect = ({
  textField,
  onSubmit
}: OrganizationCategoriesSelectProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [value, setValue] = useState<string | undefined>(
    textField.value || undefined
  );

  const onOpen = () => {
    actionSheetRef.current?.show();
    setValue(textField.value);
  };
  const onClose = () => {
    actionSheetRef.current?.hide();
    setValue(textField.value);
  };

  const handleSubmit = () => {
    onClose();
    if (value) {
      onSubmit(value);
    }
  };

  const valueLabel = organizationCategories.find(
    (i) => i.value === textField.value
  )?.label;

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

      <ActionSheet
        id="OrganizationCategoriesSelect"
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25
        }}
        indicatorStyle={{
          width: 100
        }}
        onClose={onClose}
        gestureEnabled
      >
        <ScrollView contentContainerStyle={commonStyles.container}>
          <Title>Категория организации</Title>
          <View>
            {organizationCategories.map((i) => (
              <TouchableRipple
                key={i.value}
                onPress={() => setValue(i.value)}
              >
                <View style={styles.row}>
                  <RadioButton
                    value="normal"
                    status={value === i.value ? "checked" : "unchecked"}
                  />
                  <Text style={styles.text}>{i.label}</Text>
                </View>
              </TouchableRipple>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <SolidButton
              title="Подтвердить"
              onPress={handleSubmit}
              compact
            />
            <OutlineButton
              title="Отменить"
              onPress={onClose}
              color="red"
              compact
            />
          </View>
        </ScrollView>
      </ActionSheet>
    </>
  );
};

export default OrganizationCategoriesSelect;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: fontSize.medium,
    fontFamily: "GoogleSans-Regular"
  },

  buttonsContainer: {
    flex: 1,
    gap: 8,
    marginTop: 16
  }
});
