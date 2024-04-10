import { StyleSheet, View } from "react-native";
import { OrganizationRead } from "types/generated";

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
