import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Search,
  TableProperties,
  UserCircle
} from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { Text } from "tamagui";
import { neutral, white } from "utils/colors";

function getTabLabel(routeName, focused: boolean) {
  return (
    <Text
      fontSize="$2"
      fontWeight={focused ? "700" : "600"}
      color="$gray9"
    >
      {routeName}
    </Text>
  );
}
function getTabIcon(routeName, focused: boolean) {
  const color = focused ? "$blue9" : "$gray8";
  const strokeWidth = focused ? 1.7 : 1.2;

  const icons = {
    index: (
      <Home
        color={color}
        size="$2"
        strokeWidth={strokeWidth}
      />
    ),
    services: (
      <TableProperties
        color={color}
        size="$2"
        strokeWidth={strokeWidth}
      />
    ),
    search: (
      <Search
        color={color}
        size="$2"
        strokeWidth={strokeWidth}
      />
    ),
    profile: (
      <UserCircle
        color={color}
        size="$2"
        strokeWidth={strokeWidth}
      />
    )
  };

  return icons[routeName] || null;
}

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
        tabBarStyle: {
          backgroundColor: white,
          height: 68 + insets.bottom,
          paddingVertical: 10,
          rowGap: 8,
          marginTop: 0,
          borderColor: neutral["400"],
          shadowColor: "none"
        }
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => getTabLabel("Главная", focused)
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          tabBarLabel: ({ focused }) => getTabLabel("Услуги", focused)
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ focused }) => getTabLabel("Поиск", focused)
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => getTabLabel("Профиль", focused)
        }}
      />
    </Tabs>
  );
}
