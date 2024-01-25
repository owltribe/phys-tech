import { KeyboardAvoidingView, StyleSheet, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import { useAuth } from "providers/AuthProvider";
import { HomeScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

export default function Home({ navigation }: HomeScreenProps) {
  const { onLogout } = useAuth();

  return (
    <ScreenWrapper scrollEnabled>
      <KeyboardAvoidingView style={[commonStyles.container, styles.container]}>
        <Searchbar
          placeholder="Поиск..."
          value=""
          onFocus={() => navigation.navigate("Search")}
          // onChangeText={(query) =>
          //   setSearchQuery({ ...searchQueries, searchBarMode: query })
          // }
          // value={searchQueries.searchBarMode}
          // style={styles.searchbar}
        />
        <Text>Home Screen</Text>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32
  }
});
