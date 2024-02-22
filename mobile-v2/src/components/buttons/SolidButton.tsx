import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import {
  HORIZONTAL_PADDING_DEFAULT,
  VERTICAL_PADDING_DEFAULT
} from "react-native-onboard/lib/OnboardFlow/constants";
import { LucideIcon } from "lucide-react-native";
import { mantineColors, white } from "utils/colors";

interface SolidButtonProps
  extends Pick<
    React.ComponentProps<typeof TouchableHighlight>,
    "onPress" | "disabled"
  > {
  title: string;
  Icon?: LucideIcon;
  color?: "blue" | "red";
  loading?: boolean;
}

const SolidButton = ({
  onPress,
  title,
  Icon,
  color = "blue",
  disabled,
  loading
}: SolidButtonProps) => {
  const theme = useMemo(() => {
    return {
      blue: mantineColors.blue,
      red: mantineColors.red
    }[color];
  }, [color]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: VERTICAL_PADDING_DEFAULT * 1.2,
        paddingHorizontal: HORIZONTAL_PADDING_DEFAULT,
        borderRadius: 16,
        elevation: 16,
        shadowColor: theme[2],
        backgroundColor: theme[6],
        opacity: disabled ? 0.6 : 1
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: "GoogleSans-Medium",
        letterSpacing: 0.25,
        color: white
      }
    });
  }, [theme, disabled]);

  return (
    <TouchableHighlight
      style={[styles.button]}
      onPress={onPress}
      underlayColor={theme[9]}
      disabled={disabled || loading}
      touchSoundDisabled
    >
      <>
        {Icon && !loading && (
          <Icon
            size={20}
            color={white}
          />
        )}
        {loading && <ActivityIndicator color={white} />}

        <Text style={styles.text}>{title}</Text>
      </>
    </TouchableHighlight>
  );
};

export default SolidButton;
