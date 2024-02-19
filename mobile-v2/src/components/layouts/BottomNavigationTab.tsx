import { MD2Colors } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import {
  Files,
  Home as HomeIcon,
  Search as SearchIcon,
  Table2,
  UserCircle
} from "lucide-react-native";
import { useAuth } from "providers/AuthProvider";
import MyServiceRequests from "screens/private/client/MyServiceRequests";
import Home from "screens/private/common/Home";
import Profile from "screens/private/common/Profile";
import Search from "screens/private/common/Search/Search";
import MyServices from "screens/private/organization/MyServices";
import { RootStackParamList } from "screens/types";
import theme from "styles/theme";

const Tab = createMaterialBottomTabNavigator<RootStackParamList>();

export default function BottomNavigationTab() {
  const { user } = useAuth();
  const isOrganization = user?.role === "Organization";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      activeIndicatorStyle={{ backgroundColor: MD2Colors.white }}
      barStyle={{
        backgroundColor: MD2Colors.white,
        borderColor: theme.colors.outlineVariant,
        borderTopWidth: 1
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Главное",
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              color={color}
              size={30}
              strokeWidth={focused ? 1.7 : 1.2}
            />
          )
        }}
      />

      {isOrganization ? (
        <Tab.Screen
          name="Services"
          component={MyServices}
          options={{
            title: "Мои Услуги",
            tabBarLabel: "Мои Услуги",
            tabBarIcon: ({ color, focused }) => (
              <Table2
                color={color}
                size={30}
                strokeWidth={focused ? 1.7 : 1.2}
              />
            )
          }}
        />
      ) : (
        <Tab.Screen
          name="ServiceRequests"
          component={MyServiceRequests}
          options={{
            title: "Мои заявки",
            tabBarLabel: "Мои заявки",
            tabBarIcon: ({ color, focused }) => (
              <Files
                color={color}
                size={30}
                strokeWidth={focused ? 1.7 : 1.2}
              />
            )
          }}
        />
      )}

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Поиск",
          tabBarIcon: ({ color, focused }) => (
            <SearchIcon
              color={color}
              size={30}
              strokeWidth={focused ? 1.7 : 1.2}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Профиль",
          tabBarIcon: ({ color, focused }) => (
            <UserCircle
              color={color}
              size={30}
              strokeWidth={focused ? 1.7 : 1.2}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
