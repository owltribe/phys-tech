import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import { commonStyles } from "styles/commonStyles";

const options = [
  { label: "Организации", value: "organization" },
  { label: "Услуги", value: "service" },
  { label: "Мероприятия", value: "event" }
];

export default function Search() {
  const [selectedOption, setSelectedOption] = useState("organization");

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={[commonStyles.container, styles.container]}>
        <Searchbar
          placeholder="Поиск..."
          value=""
          // onChangeText={(query) =>
          //   setSearchQuery({ ...searchQueries, searchBarMode: query })
          // }
          // value={searchQueries.searchBarMode}
          // style={styles.searchbar}
        />

        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
        />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32
  }
});
