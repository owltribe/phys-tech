import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home,
  Search,
  TableProperties,
  UserCircle
} from "@tamagui/lucide-icons";
import { color } from "@tamagui/themes";
import { Tabs } from "expo-router";
import { white } from "utils/colors";

function getTabIcon(routeName, focused: boolean) {
  const color = focused ? "$blue9" : "$gray8";
  const icons = {
    index: (
      <Home
        color={color}
        size="$2"
        strokeWidth={1.7}
      />
    ),
    services: (
      <TableProperties
        color={color}
        size="$2"
        strokeWidth={1.7}
      />
    ),
    search: (
      <Search
        color={color}
        size="$2"
        strokeWidth={1.7}
      />
    ),
    profile: (
      <UserCircle
        color={color}
        size="$2"
        strokeWidth={1.7}
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
        tabBarActiveTintColor: color.gray9Light.toString(),
        tabBarInactiveTintColor: color.gray9Light.toString(),
        tabBarStyle: {
          backgroundColor: white,
          height: 68 + insets.bottom,
          paddingVertical: 10,
          rowGap: 8
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" }
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Главная"
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          tabBarLabel: "Услуги"
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Поиск"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Профиль"
        }}
      />
    </Tabs>
  );
}
