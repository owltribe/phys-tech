import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, IconButton, MD2Colors, Menu, Text } from "react-native-paper";
import { ServiceRead } from "types/generated";

const ServiceCard = ({
  serviceData,
  onNavigateToDetail,
  onNavigateToEdit,
  isEditable
}: {
  serviceData: ServiceRead;
  onNavigateToDetail: () => void;
  onNavigateToEdit?: () => void;
  isEditable?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <>
      <Card
        mode="elevated"
        style={styles.card}
        onPress={isEditable ? undefined : onNavigateToDetail}
      >
        <Card.Content style={styles.content}>
          <Card.Title
            title={serviceData.name}
            subtitle={serviceData.description}
            titleVariant="titleMedium"
            style={styles.title}
            right={({ size }) =>
              isEditable ? (
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="dots-horizontal"
                      size={size}
                      onPress={openMenu}
                    />
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      if (onNavigateToEdit) {
                        onNavigateToEdit();
                      }
                      closeMenu();
                    }}
                    title="Редактировать"
                  />
                  <Menu.Item
                    onPress={() => {
                      onNavigateToDetail();
                      closeMenu();
                    }}
                    title="Детали"
                  />
                </Menu>
              ) : (
                <IconButton
                  icon="chevron-right"
                  size={size}
                />
              )
            }
          />
          <Text>{serviceData.organization?.name}</Text>
        </Card.Content>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: MD2Colors.white
  },
  content: {
    flexDirection: "column",
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
