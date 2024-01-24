import { Icon } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Home from "screens/private/Home";
import Profile from "screens/private/Profile";
import Search from "screens/private/Search";
import Services from "screens/private/Services";
import { RootStackParamList } from "screens/types";
import theme from "styles/theme";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

export default function BottomNavigationTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      barStyle={{
        backgroundColor: theme.colors.primaryContainer,
        borderColor: theme.colors.outlineVariant,
        borderTopWidth: 1
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Главное",
          tabBarIcon: ({ color }) => (
            <Icon
              source="home-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarLabel: "Сервисы",
          tabBarIcon: ({ color }) => (
            <Icon
              source="hand-extended-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Поиск",
          tabBarIcon: ({ color }) => (
            <Icon
              source="magnify"
              color={color}
              size={26}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color }) => (
            <Icon
              source="account-outline"
              color={color}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
