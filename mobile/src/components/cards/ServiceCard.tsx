import { StyleSheet, Text } from "react-native";
import { ServiceRead } from "types/generated";
import { mantineColors } from "utils/colors";
import { formatCost } from "utils/formatters";

import { fontSize } from "../../utils/font-helper";

import BaseCard from "./BaseCard";

const ServiceCard = ({
  data,
  onPress,
  organizationView
}: {
  data: Pick<ServiceRead, "name" | "organization" | "cost">;
  onPress?: () => void;
  organizationView?: boolean;
}) => {
  return (
    <BaseCard
      title={data.name}
      description={
        organizationView ? formatCost(data.cost) : data.organization.name
      }
      Footer={
        organizationView ? null : (
          <Text style={styles.badge}>{formatCost(data.cost)}</Text>
        )
      }
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    marginRight: "auto",
    marginTop: 8,
    fontFamily: "GoogleSans-MediumItalic",
    fontSize: fontSize.small,
    color: mantineColors.dark[5]
  }
});

export default ServiceCard;
