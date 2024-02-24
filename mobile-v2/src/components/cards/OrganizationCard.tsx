import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { OrganizationRead } from "types/generated";
import { mantineColors } from "utils/colors";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";

import BaseCard from "./BaseCard";

const OrganizationCard = ({
  organization,
  onPress
}: {
  organization: OrganizationRead;
  onPress: () => void;
}) => {
  const badgeColor = useMemo(() => {
    if (organization.category === "Scientific Organization") {
      return mantineColors.indigo[8];
    }
    if (organization.category === "University") {
      return mantineColors.blue[8];
    }
    if (organization.category === "Technopark") {
      return mantineColors.gray[5];
    }

    return mantineColors.green[8];
  }, [organization.category]);

  return (
    <BaseCard
      title={organization.name}
      description={organization.description}
      onPress={onPress}
      Footer={
        <Badge
          style={[styles.badge, { backgroundColor: badgeColor }]}
          size={24}
        >
          {getOrganizationCategoryLabel(organization.category)}
        </Badge>
      }
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {},
  badge: {
    flex: 1,
    marginRight: "auto",
    marginTop: 6,
    paddingHorizontal: 12,
    fontFamily: "GoogleSans-Regular"
  }
});

export default OrganizationCard;
