import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
  ViewStyle
} from "react-native";
import MaskInput from "react-native-mask-input";
import { HelperText } from "react-native-paper";
import { mantineColors } from "utils/colors";
import { fontPixel, fontSize } from "utils/font-helper";

export interface MaskedTextFieldProps
  extends React.ComponentProps<typeof MaskInput> {
  label?: string;
  description?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  iconRight?: JSX.Element;
}

const MaskedTextField = ({
  label,
  description,
  iconRight,
  onFocus,
  onBlur,
  error,
  ...props
}: MaskedTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError
        ]}
      >
        <MaskInput
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
          // placeholderTextColor={Colors.GreyText}
        />
        {iconRight && (
          <View style={styles.iconRightContainer}>{iconRight}</View>
        )}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
      {!!error && (
        <HelperText
          type="error"
          padding="none"
          visible={!!error}
        >
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    // fontFamily: "Circe-Medium",
    // color: Colors.Dark,
    fontSize: fontSize.small,
    marginBottom: 8
  },
  description: {
    // fontFamily: "Circe-Medium",
    // color: Colors.Gray2,
    fontSize: fontSize.mini,
    marginTop: 12
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.LightGrey,
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: 48,

    borderWidth: 1,
    borderColor: mantineColors.gray[4]
  },
  inputContainerFocused: {
    borderColor: mantineColors.blue[6]
  },
  inputContainerError: {
    // borderColor: Colors.Error
  },
  input: {
    flex: 1,
    // fontFamily: "GoogleSans-Regular",
    fontSize: fontPixel(16),
    // color: Colors.Dark,
    // backgroundColor: Colors.LightGrey,

    textAlignVertical: "center",
    paddingHorizontal: 12,
    paddingVertical: 14
  },
  iconRightContainer: {
    paddingRight: 20
  }
});

export default MaskedTextField;
