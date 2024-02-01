import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";
import theme from "styles/theme";

import { white } from "../utils/colors";

type SegmentedControlProps = {
  options: { label: string; value: string }[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl = ({
  options,
  selectedOption,
  onOptionPress
}: SegmentedControlProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const internalPadding = 20;
  const segmentedControlWidth = windowWidth - 40;

  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.map((o) => o.value).indexOf(selectedOption) +
          internalPadding / 2
      )
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <View
      style={[
        styles.container,
        {
          width: segmentedControlWidth,
          borderRadius: 26,
          paddingLeft: internalPadding / 2
        }
      ]}
    >
      <Animated.View
        style={[
          {
            width: itemWidth
          },
          rStyle,
          styles.activeBox
        ]}
      />
      {options.map((option) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onOptionPress?.(option.value);
            }}
            key={option.value}
            style={[
              {
                width: itemWidth
              },
              styles.labelContainer
            ]}
          >
            <Text
              style={[
                styles.label,
                option.value === selectedOption && styles.labelActive
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    backgroundColor: theme.colors.primaryContainer
  },
  activeBox: {
    position: "absolute",
    borderRadius: 26,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%",
    backgroundColor: theme.colors.primary
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontSize: 12,
    fontWeight: "500"
  },
  labelActive: {
    color: white
  }
});

export default SegmentedControl;
