import { StyleSheet, View } from "react-native";
import { Badge, Card, IconButton, MD2Colors } from "react-native-paper";
import dayjs from "dayjs";
import { ServiceRequestRead, ServiceRequestStatus } from "types/generated";
import { getServiceRequestStatusLabel } from "utils/enum-helpers";

const ServiceRequestCard = ({
  serviceRequest,
  onPress
}: {
  serviceRequest: ServiceRequestRead;
  onPress: () => void;
}) => {
  const getBadgeColor = (status: ServiceRequestStatus) => {
    if (status === "Pending") {
      return MD2Colors.orange500;
    }
    if (status === "Approved") {
      return MD2Colors.blue500;
    }
    if (status === "Rejected") {
      return MD2Colors.red500;
    }

    return MD2Colors.green500;
  };

  return (
    <View>
      <Card
        mode="elevated"
        style={styles.card}
        onPress={onPress}
      >
        <Card.Content style={styles.content}>
          <Card.Title
            title={serviceRequest.service.name}
            subtitle={`Дата создания: ${dayjs(serviceRequest.created_at).format(
              "DD/MM/YYYY HH:mm"
            )}`}
            titleVariant="titleMedium"
            style={styles.cardTitle}
            right={() => <IconButton icon="chevron-right" />}
          />
        </Card.Content>
      </Card>
      <Badge
        style={[
          styles.badge,
          { backgroundColor: getBadgeColor(serviceRequest.status) }
        ]}
        size={24}
      >
        {getServiceRequestStatusLabel(serviceRequest.status)}
      </Badge>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: MD2Colors.white
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  title: {
    flexShrink: 1,
    marginVertical: 0
  },
  badge: {
    position: "absolute",
    zIndex: 5,
    top: -8,
    right: 4,
    paddingHorizontal: 6
  }
});

export default ServiceRequestCard;
