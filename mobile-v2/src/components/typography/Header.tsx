import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import {
  COLOR_TEXT_DEFAULT,
  VERTICAL_PADDING_SMALL_DEFAULT
} from "react-native-onboard/lib/OnboardFlow/constants";

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 42,
    width: "100%",
    color: COLOR_TEXT_DEFAULT,
    marginBottom: VERTICAL_PADDING_SMALL_DEFAULT,
    textAlign: "center"
  }
});

export default memo(Header);
