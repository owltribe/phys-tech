import { StyleSheet, View } from "react-native";
import { Badge, Card, IconButton, MD2Colors } from "react-native-paper";
import dayjs from "dayjs";
import { ServiceRequestRead } from "types/generated";

const ServiceRequestCard = ({
  serviceRequest,
  onPress
}: {
  serviceRequest: ServiceRequestRead;
  onPress: () => void;
}) => {
  return (
    <View>
      <Card
        mode="contained"
        style={styles.card}
      >
        <Card.Content style={styles.content}>
          <Card.Title
            title={serviceRequest.service.name}
            subtitle={`Дата создания: ${dayjs(serviceRequest.created_at).format(
              "DD/MM/YYYY HH:mm"
            )}`}
            titleVariant="titleMedium"
            style={styles.title}
            right={() => (
              <IconButton
                icon="chevron-right"
                onPress={onPress}
              />
            )}
          />
        </Card.Content>
      </Card>
      <Badge
        style={styles.badge}
        size={24}
      >
        {serviceRequest.status}
      </Badge>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16
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
    top: 4,
    right: 0,
    paddingHorizontal: 6,
    backgroundColor: MD2Colors.green500
  }
});

export default ServiceRequestCard;
