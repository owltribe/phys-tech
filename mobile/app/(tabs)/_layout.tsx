import { Tabs, useRouter } from "expo-router";
import {Home, Search, TableProperties, UserCircle} from "@tamagui/lucide-icons";


const Color = {
    Active: '#eb4c60',
    Disabled: '#afafaf',
};

function getTabIcon(routeName, focused) {
    const icons = {
        index: <Home color={focused ? Color.Active : Color.Disabled} />,
        services: <TableProperties color={focused ? Color.Active : Color.Disabled} />,
        search: <Search color={focused ? Color.Active : Color.Disabled} />,
        profile: <UserCircle color={focused ? Color.Active : Color.Disabled} />
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
