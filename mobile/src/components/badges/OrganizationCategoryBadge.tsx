import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { OrganizationRead } from "types/generated";
import { mantineColors } from "utils/colors";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";

interface OrganizationCategoryBadgeProps {
  category: OrganizationRead["category"];
}

const OrganizationCategoryBadge = ({
  category
}: OrganizationCategoryBadgeProps) => {
  const badgeColor = useMemo(() => {
    if (category === "Scientific Institute") {
      return mantineColors.indigo[8];
    }
    if (category === "University") {
      return mantineColors.blue[8];
    }
    if (category === "Company") {
      return mantineColors.gray[5];
    }

    return mantineColors.gray[5];
  }, [category]);

  return (
    <Badge
      style={[styles.badge, { backgroundColor: badgeColor }]}
      size={24}
    >
      {getOrganizationCategoryLabel(category)?.replace("\n", " ")}
    </Badge>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    fontFamily: "GoogleSans-Regular"
  }
});

export default OrganizationCategoryBadge;
