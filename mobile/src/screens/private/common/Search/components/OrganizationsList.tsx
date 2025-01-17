import { useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";
import OrganizationCard from "components/cards/OrganizationCard";
import EmptyStatement from "components/EmptyStatement";
import useOrganizations from "hooks/organization/useOrganizations";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { refreshControlColors, white } from "utils/colors";
import { organizationCategories } from "utils/enum-helpers";

const OrganizationsList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  const { data, refetch, isLoading, isFetching } = useOrganizations({
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
      <FlatList
        data={data?.data.items}
        contentContainerStyle={[
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultListGap
        ]}
        renderItem={({ item }) => (
          <OrganizationCard
            organization={item}
            onPress={() =>
              navigation.navigate("Organization", { organizationId: item.id })
            }
          />
        )}
        refreshing={isLoading || isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isFetching}
            onRefresh={refetch}
            colors={refreshControlColors}
          />
        }
        ListEmptyComponent={
          <EmptyStatement description="Нет доступных организаций" />
        }
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {organizationCategories
              .sort((c) => (categories.includes(c.value) ? -1 : 1))
              .map((category) => (
                <Chip
                  key={category.value}
                  selected={categories.includes(category.value)}
                  mode="outlined"
                  showSelectedOverlay
                  onPress={() => toggleCategory(category.value)}
                  style={styles.chip}
                >
                  {category.label}
                </Chip>
              ))}
          </ScrollView>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    margin: 4,
    backgroundColor: white
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
