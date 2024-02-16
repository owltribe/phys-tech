import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import EmptyStatement from "components/EmptyStatement";
import useOrganizations from "hooks/organization/useOrganizations";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { organizationCategories } from "utils/enum-helpers";

import OrganizationCard from "./OrganizationCard";

const OrganizationsList = ({
  search,
  navigation
}: {
  search: string;
  navigation: SearchScreenProps["navigation"];
}) => {
  const [categories, setCategories] = useState<string[]>([]);

  const { data, isLoading, isFetching, isSuccess } = useOrganizations({
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

  const ListFooter = () => {
    if (isSuccess && !data?.data.items.length) {
      return <EmptyStatement description="Нет организаций" />;
    }
    if (isLoading || isFetching) {
      return (
        <ActivityIndicator
          size="large"
          style={commonStyles.loadderMargin}
        />
      );
    }

    return null;
  };

  return (
    <>
      <View style={styles.row}>
        {organizationCategories.map((category) => (
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
      </View>

      <FlatList
        data={data?.data.items}
        contentContainerStyle={[
          commonStyles.defaultHorizontalPadding,
          commonStyles.defaultVerticalPadding,
          commonStyles.defaultListGap
        ]}
        renderItem={({ item }) => (
          <OrganizationCard
            organizationData={item}
            onPress={() =>
              navigation.navigate("Organization", { organizationId: item.id })
            }
          />
        )}
        ListFooterComponent={ListFooter}
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
