import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Apple } from "lucide-react-native";
import { mantineColors } from "utils/colors";
import { fontPixel } from "utils/font-helper";

const EmptyStatement = ({
  description = "Нет данных"
}: {
  description?: string;
}): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Apple
          color={mantineColors.blue[4]}
          strokeWidth={1}
          size={100}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Пусто</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 42
  },
  iconContainer: {
    padding: 32,
    backgroundColor: mantineColors.gray[0],
    borderRadius: 100
  },
  textContainer: {
    flex: 1,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  title: {
    fontSize: fontPixel(26),
    fontFamily: "GoogleSans-Bold"
  },
  description: {
    fontSize: fontPixel(18),
    fontFamily: "GoogleSans-Medium",
    color: mantineColors.gray[6]
  }
});

export default EmptyStatement;
