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
  const getBadgeColor = (status: string) => {
    if (status === "Ожидается") {
      return MD2Colors.orange500;
    }
    if (status === "Отклонено") {
      return MD2Colors.red500;
    }

    return MD2Colors.green500;
  };

  return (
    <View>
      <Card
        mode="elevated"
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
        style={[
          styles.badge,
          { backgroundColor: getBadgeColor(serviceRequest.status) }
        ]}
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
    zIndex: 5,
    top: 4,
    right: 0,
    paddingHorizontal: 6
  }
});

export default ServiceRequestCard;
