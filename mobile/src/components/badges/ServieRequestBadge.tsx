import React from "react";
import { StyleSheet } from "react-native";
import { Badge } from "react-native-paper";
import { ServiceRequestStatus } from "types/generated";
import { mantineColors } from "utils/colors";
import { getServiceRequestStatusLabel } from "utils/enum-helpers";

interface ServieRequestBadgeProps
  extends Pick<React.ComponentProps<typeof Badge>, "style"> {
  status: ServiceRequestStatus;
}

const ServieRequestBadge = ({ status, style }: ServieRequestBadgeProps) => {
  const getBadgeColor = (status: ServiceRequestStatus) => {
    if (status === "Pending") {
      return mantineColors.yellow[5];
    }
    if (status === "Approved") {
      return mantineColors.blue[8];
    }
    if (status === "Rejected") {
      return mantineColors.red[5];
    }

    return mantineColors.green[8];
  };

  return (
    <Badge
      style={[style, styles.badge, { backgroundColor: getBadgeColor(status) }]}
      size={24}
    >
      {getServiceRequestStatusLabel(status)}
    </Badge>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    fontFamily: "GoogleSans-Regular"
  }
});

export default ServieRequestBadge;
