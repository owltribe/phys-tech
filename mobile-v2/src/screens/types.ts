// import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
// import type { NativeStackScreenProps } from "@react-navigation/stack";

import { NativeStackScreenProps } from "react-native-screens/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;

  Main: undefined;
  Home: undefined;
  Services: undefined;
  ServiceRequests: undefined;
  Events: undefined;
  Event: { eventId: string };
  Service: { serviceId: string };
  ServiceRequest: { serviceRequestId: string };
  Search?: { defaultOption?: "organization" | "service" | "event" };
  Profile: undefined;
  Settings: undefined;
  // Place: { placeId: number };
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;
export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type ServicesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Services"
>;
export type ServiceRequestsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ServiceRequests"
>;
export type ServiceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Service"
>;
export type EventsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Events"
>;
export type EventScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Event"
>;
export type ServiceRequestScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ServiceRequest"
>;
export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Search"
>;
export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Profile"
>;

// export type PlaceScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   "Place"
// >;

export type BottomTabParamList = {
  Details: undefined;

  Reviews: undefined;
};

// export type PlaceDetailsTabProps = BottomTabScreenProps<
//   BottomTabParamList,
//   "Details"
// >;
//
// export type PlaceReviewsTabProps = BottomTabScreenProps<
//   BottomTabParamList,
//   "Reviews"
// >;
