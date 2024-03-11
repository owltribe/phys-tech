import { NativeStackScreenProps } from "react-native-screens/native-stack";
import {
  OrganizationRead,
  ServiceRead,
  UserReadWithOrganization
} from "types/generated";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;

  Main: undefined;
  Home: undefined;
  Services: undefined;
  ServiceRequests: undefined;
  Events: undefined;
  Event: { eventId: string };
  Organization: { organizationId: string };
  OrganizationEdit: { organization: OrganizationRead };
  Service: { serviceId: string };
  ServiceEdit: { service: ServiceRead };
  ServiceRequest: { serviceRequestId: string };
  Search?: { defaultOption?: "organization" | "service" | "event" };
  Profile: undefined;
  Settings: undefined;
  // Place: { placeId: number };
};

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;
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
export type ServiceEditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ServiceEdit"
>;
export type EventsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Events"
>;
export type EventScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Event"
>;
export type OrganizationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Organization"
>;
export type OrganizationEditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OrganizationEdit"
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
