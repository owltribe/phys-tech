import React, { useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight
} from "react-native";
import {
  HORIZONTAL_PADDING_DEFAULT,
  HORIZONTAL_PADDING_SMALL_DEFAULT,
  VERTICAL_PADDING_DEFAULT,
  VERTICAL_PADDING_SMALL_DEFAULT
} from "react-native-onboard/lib/OnboardFlow/constants";
import { LucideIcon } from "lucide-react-native";
import { mantineColors } from "utils/colors";

interface OutlineButtonProps
  extends Pick<
    React.ComponentProps<typeof TouchableHighlight>,
    "onPress" | "disabled"
  > {
  title: string;
  Icon?: LucideIcon;
  color?: "blue" | "red" | "yellow";
  loading?: boolean;
  compact?: boolean;
}

const OutlineButton = ({
  onPress,
  title,
  Icon,
  color = "blue",
  disabled,
  loading,
  compact
}: OutlineButtonProps) => {
  const theme = useMemo(() => {
    return {
      blue: mantineColors.blue,
      red: mantineColors.red,
      yellow: mantineColors.yellow
    }[color];
  }, [color]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        gap: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: compact
          ? VERTICAL_PADDING_SMALL_DEFAULT
          : VERTICAL_PADDING_DEFAULT,
        paddingHorizontal: compact
          ? HORIZONTAL_PADDING_SMALL_DEFAULT
          : HORIZONTAL_PADDING_DEFAULT,
        borderRadius: 16,
        borderWidth: 1.2, // Add border width
        borderColor: theme[2], // Add border color
        backgroundColor: theme[0], // Add border color
        opacity: disabled ? 0.6 : 1
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: "GoogleSans-Medium",
        letterSpacing: 0.25,
        color: theme[6] // Set text color to match border color
      }
    });
  }, [theme, disabled, compact]);

  return (
    <TouchableHighlight
      style={[styles.button]}
      onPress={onPress}
      underlayColor={theme[7]}
      disabled={disabled || loading}
      touchSoundDisabled
    >
      <>
        {Icon && !loading && (
          <Icon
            size={20}
            color={theme[6]} // Set icon color to match border color
          />
        )}
        {loading && <ActivityIndicator color={theme[6]} />}

        <Text style={styles.text}>{title}</Text>
      </>
    </TouchableHighlight>
  );
};

export default OutlineButton;
