import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";
import { ChevronLeft } from "lucide-react-native";
import { mantineColors, white } from "utils/colors";

import { commonStyles } from "../../styles/commonStyles";

export default function NavigationBar({
  navigation,
  route,
  options,
  back
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header
      mode="center-aligned"
      style={styles.container}
    >
      {back && (
        <TouchableHighlight
          style={styles.backButton}
          onPress={navigation.goBack}
          underlayColor={mantineColors.gray[0]}
        >
          <ChevronLeft
            size={30}
            color={mantineColors.dark[3]}
          />
        </TouchableHighlight>
      )}

      {/*{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}*/}
      <Appbar.Content
        title={title}
        titleStyle={styles.title}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    ...commonStyles.defaultHorizontalPadding
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: mantineColors.gray[0],
    borderRadius: 12
  },
  title: {
    color: mantineColors.dark[5],
    fontWeight: "700"
  }
});
