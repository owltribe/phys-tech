import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import theme from "styles/theme";

type PrimaryButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "style" | "labelStyle"
>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Button
      style={styles.button}
      labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 4
  },
  md3FontStyles: {
    lineHeight: 32
  },
  fontStyles: {
    fontWeight: "800",
    fontSize: 24
  }
});

export default PrimaryButton;
