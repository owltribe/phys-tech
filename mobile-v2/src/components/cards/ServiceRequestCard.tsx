import { StyleSheet, View } from "react-native";
import ServieRequestBadge from "components/badges/ServieRequestBadge";
import dayjs from "dayjs";
import { ServiceRequestRead } from "types/generated";

import BaseCard from "./BaseCard";

const ServiceRequestCard = ({
  serviceRequest,
  onPress
}: {
  serviceRequest: ServiceRequestRead;
  onPress: () => void;
}) => {
  return (
    <View style={styles.card}>
      <ServieRequestBadge
        style={styles.badge}
        status={serviceRequest.status}
      />
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
    right: 5
  }
});

export default ServiceRequestCard;
