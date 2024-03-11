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
import { mantineColors, white } from "utils/colors";
import { fontSize } from "utils/font-helper";

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

  const internalPadding = 12;
  const segmentedControlWidth = windowWidth - 32;

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
    backgroundColor: mantineColors.gray[2],
    flexDirection: "row",
    height: 55,
    width: "100%",
    borderRadius: 14
  },
  activeBox: {
    position: "absolute",
    borderRadius: 16,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    elevation: 3,
    height: "80%",
    top: "10%",
    backgroundColor: mantineColors.blue[5]
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontSize: fontSize.small,
    fontFamily: "GoogleSans-Medium"
  },
  labelActive: {
    color: white
  }
});

export default SegmentedControl;
