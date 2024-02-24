import React from "react";
import { StyleSheet } from "react-native";
import { Searchbar as PaperSearchbar } from "react-native-paper";
import { mantineColors, white } from "utils/colors";

interface SearchBarProps extends React.ComponentProps<typeof PaperSearchbar> {}

const SearchBar = (props: SearchBarProps) => {
  return (
    <PaperSearchbar
      placeholder="Поиск..."
      style={styles.container}
      inputStyle={styles.input}
      selectionColor={mantineColors.blue[4]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: mantineColors.gray[2]
  },
  input: {
    fontFamily: "GoogleSans-Regular"
  }
});

export default SearchBar;
