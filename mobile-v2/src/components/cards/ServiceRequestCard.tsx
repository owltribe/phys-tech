import { StyleSheet, View } from "react-native";
import { Badge } from "react-native-paper";
import dayjs from "dayjs";
import { ServiceRequestRead, ServiceRequestStatus } from "types/generated";
import { mantineColors } from "utils/colors";
import { getServiceRequestStatusLabel } from "utils/enum-helpers";

import BaseCard from "./BaseCard";

const ServiceRequestCard = ({
  serviceRequest,
  onPress
}: {
  serviceRequest: ServiceRequestRead;
  onPress: () => void;
}) => {
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
    <View style={styles.card}>
      <Badge
        style={[
          styles.badge,
          { backgroundColor: getBadgeColor(serviceRequest.status) }
        ]}
        size={24}
      >
        {getServiceRequestStatusLabel(serviceRequest.status)}
      </Badge>
      <BaseCard
        title={serviceRequest.service.name}
        description={`${dayjs(serviceRequest.created_at)
          .locale("ru")
          .format("DD MMMM YYYY HH:MM")}`}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginTop: 4
  },
  badge: {
    position: "absolute",
    zIndex: 5,
    top: -12,
    right: 5,
    paddingHorizontal: 12,
    fontFamily: "GoogleSans-Regular"
  }
});

export default ServiceRequestCard;
