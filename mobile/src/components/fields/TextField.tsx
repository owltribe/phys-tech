import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { mantineColors, white } from "utils/colors";

export interface TextFieldProps
  extends Omit<React.ComponentProps<typeof TextInput>, "error"> {
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextField = ({ error, containerStyle, ...props }: TextFieldProps) => {
  return (
    <View style={[containerStyle]}>
      <TextInput
        outlineStyle={styles.textInput}
        outlineColor={mantineColors.gray[4]}
        activeOutlineColor={mantineColors.blue[6]}
        error={!!error}
        mode="outlined"
        {...props}
      />
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
  textInput: {
    borderRadius: 8,
    backgroundColor: white
  }
});

export default TextField;
