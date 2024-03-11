import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigationTab from "components/layouts/BottomNavigationTab";
import NavigationBar from "components/layouts/NavigationBar";
import { useAuth } from "providers/AuthProvider";

import EventDetail from "./src/screens/private/common/EventDetail";
import OrganizationDetail from "./src/screens/private/common/OrganizationDetail";
import ServiceDetail from "./src/screens/private/common/ServiceDetail";
import ServiceRequestDetail from "./src/screens/private/common/ServiceRequestDetail";
import ServiceEdit from "./src/screens/private/organization/ServiceEdit";
import Login from "./src/screens/public/Login";
import Onboarding from "./src/screens/public/Onboarding";
import Register from "./src/screens/public/Register";
import { RootStackParamList } from "./src/screens/types";

const Stack = createStackNavigator<RootStackParamList>();

const authenticatedScreens = {
  Main: {
    component: BottomNavigationTab,
    options: { headerShown: false }
  },
  Service: {
    component: ServiceDetail,
    options: { title: "Услуга" }
  },
  ServiceEdit: {
    component: ServiceEdit,
    options: { title: "Редактирование услуги" }
  },
  ServiceRequest: {
    component: ServiceRequestDetail,
    options: { title: "Заявка на услугу" }
  },
  Event: {
    component: EventDetail,
    options: { title: "Мероприятие" }
  },
  Organization: {
    component: OrganizationDetail,
    options: { title: "Организация" }
  }
};

const unauthenticatedScreens = {
  Onboarding: {
    component: Onboarding,
    options: { headerShown: false }
  },
  Login: {
    component: Login,
    options: { headerShown: false }
  },
  Register: {
    component: Register,
    options: { title: "Регистрация" }
  }
};

export default function Router() {
  const { user } = useAuth();

  const screens = user ? authenticatedScreens : unauthenticatedScreens;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <NavigationBar {...props} />
        }}
      >
        {Object.entries(screens).map(([name, screen]) => (
          <Stack.Screen
            key={name}
            name={name}
            {...screen}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
