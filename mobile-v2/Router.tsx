import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigationTab from "components/layouts/BottomNavigationTab";
import NavigationBar from "components/layouts/NavigationBar";
import { useAuth } from "providers/AuthProvider";

import EventDetail from "./src/screens/private/common/EventDetail";
import OrganizationDetail from "./src/screens/private/common/OrganizationDetail";
import ProfileEdit from "./src/screens/private/common/ProfileEdit";
import ServiceDetail from "./src/screens/private/common/ServiceDetail";
import ServiceRequestDetail from "./src/screens/private/common/ServiceRequestDetail/ServiceRequestDetail";
import OrganizationEdit from "./src/screens/private/organization/OrganizationEdit";
import Login from "./src/screens/public/Login";
import Onboarding from "./src/screens/public/Onboarding";
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
            <Stack.Screen
              name="ProfileEdit"
              component={ProfileEdit}
              options={{ title: "Редактировать профиль" }}
            />
            {user.role === "Organization" && (
              <Stack.Screen
                name="OrganizationEdit"
                component={OrganizationEdit}
                options={{ title: "Редактирование организации" }}
              />
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
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
