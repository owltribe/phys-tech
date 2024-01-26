import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const options = [
  { label: "Организации", value: "organization" },
  { label: "Услуги", value: "service" },
  { label: "Мероприятия", value: "event" }
];
type OptionsType = "organization" | "service" | "event";
export default function Search({ route: { params } }: SearchScreenProps) {
  const [selectedOption, setSelectedOption] = useState<OptionsType>(
    params?.defaultOption || "organization"
  );

  useEffect(() => {
    if (!!params?.defaultOption && selectedOption !== params?.defaultOption) {
      setSelectedOption(params?.defaultOption);
    }
  }, [params?.defaultOption]);

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
          onOptionPress={(o) => setSelectedOption(o as OptionsType)}
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
