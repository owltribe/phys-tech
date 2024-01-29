import React from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import { useAuth } from "providers/AuthProvider";
import { EventsScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import EventList from "./components/EventList";

const Events = ({ navigation }: EventsScreenProps) => {
  const { user } = useAuth();

  return (
    <ScreenWrapper withScrollView={false}>
      <EventList navigation={navigation} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 4,
    fontWeight: "700"
  }
});

export default Events;
