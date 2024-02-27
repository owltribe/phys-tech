import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle
} from "react-native";
import { ChevronRight, LucideIcon, LucideProps } from "lucide-react-native";
import { mantineColors, white } from "utils/colors";
import { fontSize } from "utils/font-helper";

const BaseCard = ({
  title,
  description,
  descriptionNumberOfLines = 1,
  onPress,
  styleLeftAddon,
  Icon,
  iconProps,
  Footer
}: {
  title?: string;
  description: string;
  descriptionNumberOfLines?: number;
  onPress?: () => void;
  styleLeftAddon?: StyleProp<ViewStyle>;
  Icon?: LucideIcon;
  iconProps?: LucideProps;
  Footer?: React.ReactNode;
}) => {
  const Content = (
    <View style={styles.innerContainer}>
      {Icon && (
        <View style={[styles.leftAddon, styleLeftAddon]}>
          <Icon
            size={26}
            color={mantineColors.dark[5]}
            {...iconProps}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        {title && (
          <Text
            style={styles.title}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        )}

        <Text
          style={styles.description}
          numberOfLines={descriptionNumberOfLines}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
      <View>
        <ChevronRight
          size={24}
          color={mantineColors.dark[5]}
        />
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={onPress}
        underlayColor={mantineColors.gray[0]}
      >
        <>
          {Content}
          {Footer}
        </>
      </TouchableHighlight>
    );
  }
  return <View style={styles.container}>{Content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    elevation: 2,
    borderRadius: 10,
    padding: 12
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  leftAddon: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: mantineColors.gray[1],
    borderRadius: 12,
    width: 50,
    height: 50
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 2
  },
  title: {
    fontFamily: "GoogleSans-Bold",
    fontSize: fontSize.medium
  },
  description: {
    fontFamily: "GoogleSans-Regular",
    fontSize: fontSize.medium,
    color: mantineColors.gray[6]
  }
});

export default BaseCard;
