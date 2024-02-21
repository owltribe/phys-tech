import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export interface TextFieldProps
  extends Omit<React.ComponentProps<typeof TextInput>, "error"> {
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextField = ({ error, containerStyle, ...props }: TextFieldProps) => {
  return (
    <View style={containerStyle}>
      <TextInput
        outlineStyle={{
          borderRadius: 12
        }}
        error={!!error}
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

export default TextField;
