import { StyleSheet, Text, View } from "react-native";
import ServieRequestBadge from "components/badges/ServieRequestBadge";
import dayjs from "dayjs";
import { ServiceRequestRead } from "types/generated";
import { mantineColors } from "utils/colors";
import { fontSize } from "utils/font-helper";

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
        description={serviceRequest.requested_by.full_name}
        Footer={
          <Text style={styles.footer}>
            {`${dayjs(serviceRequest.created_at)
              .locale("ru")
              .format("DD MMMM YYYY HH:MM")}`}
          </Text>
        }
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
  footer: {
    flex: 1,
    marginTop: 8,
    fontSize: fontSize.small,
    fontFamily: "GoogleSans-MediumItalic",
    color: mantineColors.dark[4]
  },
  badge: {
    position: "absolute",
    zIndex: 5,
    top: -12,
    right: 5
  }
});

export default ServiceRequestCard;
