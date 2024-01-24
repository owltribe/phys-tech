import React from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

interface TextFieldProps
  extends Omit<React.ComponentProps<typeof TextInput>, "error"> {
  error?: string;
}

const TextField = ({ error, ...props }: TextFieldProps) => {
  return (
    <View>
      <TextInput
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
