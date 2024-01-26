import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Chip, MD2Colors } from "react-native-paper";
import {
  deepPurple50,
  deepPurple200,
  deepPurple300
} from "react-native-paper/src/styles/themes/v2/colors";
import useOrganizations from "hooks/organization/useOrganizations";
import { commonStyles } from "styles/commonStyles";

const OrganizationsList = ({ search }: { search: string }) => {
  const [categories, setCategories] = useState<string[]>([]);

  const { data, isLoading, isFetching } = useOrganizations({
    search: search,
    category__in: categories
  });

  const toggleCategory = (categoryToAddOrRemove: string) => {
    const isCategoryInArray = categories.includes(categoryToAddOrRemove);

    if (isCategoryInArray) {
      const updatedCategories = categories.filter(
        (category) => category !== categoryToAddOrRemove
      );
      setCategories(updatedCategories);
    } else {
      setCategories((prevCategories) => [
        ...prevCategories,
        categoryToAddOrRemove
      ]);
    }
  };

  return (
    <>
      <View style={styles.row}>
        {[
          "Вуз",
          "Технопарк",
          "Коммерческая Лабораторная компания",
          "Научная организация"
        ].map((category) => (
          <Chip
            key={category}
            selected={categories.includes(category)}
            mode="outlined"
            showSelectedOverlay
            onPress={() => toggleCategory(category)}
            style={styles.chip}
          >
            {category}
          </Chip>
        ))}
      </View>

      {(isLoading || isFetching) && <ActivityIndicator size="large" />}

      <FlatList
        data={data?.data.items}
        contentContainerStyle={[
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultListGap
        ]}
        renderItem={({ item }) => (
          <Card mode="elevated">
            <Card.Title
              title={item.name}
              titleVariant="bodyLarge"
              subtitle={item.description}
              subtitleNumberOfLines={2}
            />
            <Card.Content>
              <View style={styles.rowWithoutPadding}>
                <Chip style={{ backgroundColor: MD2Colors.deepPurple300 }}>
                  {item.category}
                </Chip>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    margin: 4
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12
  },
  rowWithoutPadding: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
export default OrganizationsList;
