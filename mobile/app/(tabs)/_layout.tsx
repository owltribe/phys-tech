import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Search, TableProperties, UserCircle} from "@tamagui/lucide-icons";

const Tab = createBottomTabNavigator();

function getTabIcon(routeName, focused) {
    const activeColor = '#eb4c60';
    const iconColor = '#afafaf';

    const icons = {
        index: <Home color={focused ? activeColor : iconColor} />,
        services: <TableProperties color={focused ? activeColor : iconColor} />,
        search: <Search color={focused ? activeColor : iconColor} />,
        profile: <UserCircle color={focused ? activeColor : iconColor} />
    };

    return icons[routeName] || null;
}

export default function Layout() {
  const router = useRouter();

  return (
      <Tabs
          screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
              tabBarActiveTintColor: '#787878',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: { backgroundColor: '#fff' },
          })}
      >
        <Tabs.Screen name='index' options={{
            tabBarLabel: 'Home',
        }}  />
        <Tabs.Screen name='services' options={{
            tabBarLabel: 'Services',
        }} />
        <Tabs.Screen name='search' options={{
            tabBarLabel: 'Search',
        }} />
        <Tabs.Screen name='profile' options={{
            tabBarLabel: 'Profile',
        }} />
      </Tabs>
  );
}
