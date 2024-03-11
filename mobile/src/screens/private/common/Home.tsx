import {
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import BaseCard from "components/cards/BaseCard";
import SearchBar from "components/fields/SearchBar";
import ScreenWrapper from "components/ScreenWrapper";
import { Atom, Calendar, HeartHandshake } from "lucide-react-native";
import { HomeScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors, white } from "utils/colors";

export default function Home({ navigation }: HomeScreenProps) {
  const cardsData = [
    {
      label: "Организации",
      description: "Профили научных организаций с детальной информацией",
      background: mantineColors.blue[4],
      Icon: Atom,
      onPress: () =>
        navigation.navigate("Search", { defaultOption: "organization" })
    },
    {
      label: "Услуги",
      description: "Каталог научных услуг от каждой организации",
      background: mantineColors.yellow[4],
      Icon: HeartHandshake,
      onPress: () => navigation.navigate("Search", { defaultOption: "service" })
    },
    {
      label: "Мероприятия",
      description: "Календарь семинаров, конференций и других мероприятий",
      background: mantineColors.indigo[4],
      Icon: Calendar,
      onPress: () => navigation.navigate("Search", { defaultOption: "event" })
    }
  ];

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[{ paddingTop: StatusBar.currentHeight }]}>
        <View style={commonStyles.defaultHorizontalPadding}>
          <SearchBar
            placeholder="Поиск..."
            value=""
            onFocus={() => navigation.navigate("Search")}
          />
        </View>

        <FlatList
          data={cardsData}
          contentContainerStyle={[
            commonStyles.defaultHorizontalPadding,
            commonStyles.defaultVerticalPadding,
            commonStyles.defaultListGap
          ]}
          renderItem={({ item }) => (
            <BaseCard
              title={item.label}
              description={item.description}
              descriptionNumberOfLines={3}
              onPress={item.onPress}
              Icon={item.Icon}
              styleLeftAddon={{ backgroundColor: item.background }}
              iconProps={{ color: white, strokeWidth: 1.6 }}
            />
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
    gap: 0,
    backgroundColor: white
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
    gap: 12,
    fontFamily: "GoogleSans-Bold"
  }
});
