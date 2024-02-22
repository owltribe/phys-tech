import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {
  COLOR_TEXT_DEFAULT,
  VERTICAL_PADDING_SMALL_DEFAULT
} from "react-native-onboard/lib/OnboardFlow/constants";

type Props = {
  children: React.ReactNode;
  align?: TextStyle["textAlign"];
};

const Header = ({ children, align = "center" }: Props) => (
  <Text style={[styles.header, { textAlign: align }]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    // fontWeight: "800",
    lineHeight: 42,
    width: "100%",
    fontFamily: "GoogleSans-Bold",
    color: COLOR_TEXT_DEFAULT,
    marginBottom: VERTICAL_PADDING_SMALL_DEFAULT
  }
});

export default memo(Header);
