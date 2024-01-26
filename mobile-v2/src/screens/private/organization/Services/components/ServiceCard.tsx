import { StyleSheet } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { ServiceRead } from "types/generated";

const ServiceCard = ({
  serviceData,
  onPress
}: {
  serviceData: ServiceRead;
  onPress: () => void;
}) => {
  return (
    <Card
      mode="elevated"
      style={styles.card}
    >
      <Card.Content style={styles.content}>
        <Card.Title
          title={serviceData.name}
          subtitle={serviceData.description}
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
  }
});

export default ServiceCard;
