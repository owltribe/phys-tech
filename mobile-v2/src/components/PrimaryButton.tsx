import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { fontPixel } from "utils/font-helper";

type PrimaryButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "labelStyle"
>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Button
      style={styles.button}
      labelStyle={[styles.fontStyles, styles.md3FontStyles, props.style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 4
  },
  md3FontStyles: {
    lineHeight: 32
  },
  fontStyles: {
    fontWeight: "800",
    fontSize: fontPixel(18)
  }
});

export default PrimaryButton;
