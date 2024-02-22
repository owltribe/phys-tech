import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { Bolt, ChevronRight } from "lucide-react-native";
import { mantineColors, white } from "utils/colors";

const BaseCard = ({
  title,
  description,
  onPress
}: {
  title: string;
  description: string;
  onPress?: () => void;
}) => {
  const Content = (
    <>
      <View style={styles.leftAddon}>
        <Bolt
          size={26}
          color={mantineColors.dark[5]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={styles.description}
          numberOfLines={1}
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
    </>
  );

  if (onPress) {
    return (
      <TouchableHighlight
        style={styles.container}
        onPress={onPress}
        underlayColor={mantineColors.gray[0]}
      >
        {Content}
      </TouchableHighlight>
    );
  }
  return <View style={styles.container}>{Content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: white,
    elevation: 16,
    shadowColor: mantineColors.gray[6],
    borderRadius: 10,
    padding: 12
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
    fontSize: 16
  },
  description: {
    fontFamily: "GoogleSans-Regular",
    fontSize: 14,
    color: mantineColors.gray[6]
  }
});

export default BaseCard;
