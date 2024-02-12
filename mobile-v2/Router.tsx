import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomNavigationTab from "./src/layouts/components/BottomNavigationTab";
import NavigationBar from "./src/layouts/components/NavigationBar";
import { useAuth } from "./src/providers/AuthProvider";
import EventDetail from "./src/screens/private/common/EventDetail";
import ServiceDetail from "./src/screens/private/common/ServiceDetail";
import OrganizationDetail from "screens/private/common/OrganizationDetail";
import ServiceRequestDetail from "./src/screens/private/common/ServiceRequestDetail/ServiceRequestDetail";
import Login from "./src/screens/public/Login";
import Register from "./src/screens/public/Register";
import { RootStackParamList } from "./src/screens/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function Router() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <NavigationBar {...props} />
        }}
      >
        {user ? (
          <>
            <Stack.Screen
              name="Main"
              component={BottomNavigationTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Service"
              component={ServiceDetail}
              options={{ title: "Сервис" }}
            />
            <Stack.Screen
              name="ServiceRequest"
              component={ServiceRequestDetail}
              options={{ title: "Заявка на услугу" }}
            />
            <Stack.Screen
              name="Event"
              component={EventDetail}
              options={{ title: "Мероприятие" }}
            />
            <Stack.Screen
              name="Organization"
              component={OrganizationDetail}
              options={{ title: "Организация" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Вход" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Регистрация" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
