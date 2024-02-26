import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import { OrganizationRead } from "types/generated";
import { mantineColors } from "utils/colors";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";

import OrganizationCategoryBadge from "../badges/OrganizationCategoryBadge";

import BaseCard from "./BaseCard";

const OrganizationCard = ({
  organization,
  onPress
}: {
  organization: OrganizationRead;
  onPress: () => void;
}) => {
  return (
    <BaseCard
      title={organization.name}
      description={organization.description}
      onPress={onPress}
      Footer={
        <View style={styles.badge}>
          <OrganizationCategoryBadge category={organization.category} />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    flex: 1,
    marginTop: 6,
    flexDirection: "row"
  }
});

export default OrganizationCard;
