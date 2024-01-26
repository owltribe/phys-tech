import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  MD2Colors,
  Searchbar
} from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import { HomeScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

export default function Home({ navigation }: HomeScreenProps) {
  const cardsData = [
    {
      label: "Организации",
      description: "Профили научных организаций с детальной информацией",
      background: MD2Colors.indigoA700,
      icon: "atom-variant",
      onPress: () =>
        navigation.navigate("Search", { defaultOption: "organization" })
    },
    {
      label: "Услуги",
      description: "Каталог научных услуг от каждой организации",
      background: MD2Colors.deepPurpleA700,
      icon: "hand-heart",
      onPress: () => navigation.navigate("Search", { defaultOption: "service" })
    },
    {
      label: "Мероприятия",
      description: "Календарь семинаров, конференций и других мероприятий",
      background: MD2Colors.deepOrangeA700,
      icon: "calendar",
      onPress: () => navigation.navigate("Search", { defaultOption: "event" })
    }
  ];

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={commonStyles.defaultHorizontalPadding}>
          <Searchbar
            placeholder="Поиск..."
            value=""
            onFocus={() => navigation.navigate("Search")}
          />
        </View>

        <FlatList
          data={cardsData}
          contentContainerStyle={[
            commonStyles.defaultHorizontalPadding,
            styles.flatlistContainer
          ]}
          renderItem={({ item }) => (
            <Card
              mode="elevated"
              style={styles.card}
            >
              <Card.Title
                title={item.label}
                titleVariant="labelLarge"
                subtitle={item.description}
                subtitleNumberOfLines={3}
                style={styles.cardTitle}
                left={() => (
                  <Avatar.Icon
                    size={46}
                    icon={item.icon}
                    style={{ backgroundColor: item.background }}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    onPress={item.onPress}
                  />
                )}
              />
            </Card>
          )}
        />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32
  },
  card: {
    marginTop: 16,
    gap: 0
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  flatlistContainer: {
    paddingBottom: 16
  },
  cardTitle: {
    paddingVertical: 16,
    gap: 12
  }
});
