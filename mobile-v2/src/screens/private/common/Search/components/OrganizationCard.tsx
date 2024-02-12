import { StyleSheet, View } from "react-native";
import { Card, Chip, IconButton, MD2Colors } from "react-native-paper";
import { OrganizationRead } from "types/generated";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";

const OrganizationCard = ({
  organizationData,
  onPress
}: {
  organizationData: OrganizationRead;
  onPress: () => void;
}) => {
  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={onPress}
    >
      <Card.Title
        title={organizationData.name}
        titleVariant="bodyLarge"
        subtitle={organizationData.description}
        subtitleNumberOfLines={2}
        style={styles.title}
        right={() => (
            <View style={styles.iconContainer}>
              <IconButton icon="chevron-right" />
            </View>
          )}
      />
      {organizationData.category && (
        <Card.Content>
          <View style={styles.rowWithoutPadding}>
            <Chip>{getOrganizationCategoryLabel(organizationData.category)}</Chip>
          </View>
        </Card.Content>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    backgroundColor: MD2Colors.white,
  },
  title: {
    flexShrink: 1,
    marginVertical: 0
  },
  chip: {
    margin: 0
  },
  rowWithoutPadding: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  iconContainer: {
    paddingTop: 50,
  }
});

export default OrganizationCard;
