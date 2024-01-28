// import { FlatList, StyleSheet } from "react-native";
// import useEvents from "hooks/events/useEvents";
// import { useRefreshOnFocus } from "hooks/useRefreshOnFocus";
// import { useAuth } from "providers/AuthProvider";
// import { EventsScreenProps } from "screens/types";
// import { commonStyles } from "styles/commonStyles";

// import EventCard from "./EventCard";

// const EventList = ({
//   navigation
// }: {
//   navigation: EventsScreenProps["navigation"];
// }) => {
//   const { user } = useAuth();

//   const isClientRole = user?.role === "Client";

// //   const { data: servicesData, refetch: refetchServicesData } = useEvents({
// //     organizationId: user?.organization?.id,
// //     enabled: !isClientRole
// //   });
// //   const { data, refetch } = useServicesForUserRequests({
// //     enabled: isClientRole
// //   });

// //   useRefreshOnFocus(refetchServicesData);
// //   useRefreshOnFocus(refetch);

//   return (
//     <FlatList
//       data={isClientRole ? data?.data.items : servicesData?.data.items}
//       keyExtractor={(item) => item.id}
//       onEndReachedThreshold={0}
//       scrollEventThrottle={16}
//       style={styles.container}
//       contentContainerStyle={[
//         commonStyles.defaultHorizontalPadding,
//         styles.container,
//         commonStyles.defaultListGap
//       ]}
//       renderItem={({ item }) => (
//         <ServiceCard
//           serviceData={item}
//           onPress={() =>
//             navigation.navigate("Service", {
//               serviceId: item.id
//             })
//           }
//         />
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingBottom: 60
//   }
// });

// export default ServiceList;
