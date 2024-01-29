import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Icon, Snackbar, Surface, Text } from "react-native-paper";
import PrimaryButton from "components/PrimaryButton";
import ScreenWrapper from "components/ScreenWrapper";
import { useAuth } from "providers/AuthProvider";
import { EventScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import useEvent from "hooks/events/useEvent";

const EventDetail = ({
  route: {
    params: { eventId }
  }
}: EventScreenProps) => {
  const { user } = useAuth();

  const { data } = useEvent(eventId);

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Surface
          style={styles.surface}
          mode="flat"
          elevation={4}
        >
          <Icon
            source="camera"
            size={42}
          />
        </Surface>

        <Text
          variant="headlineSmall"
          style={{ fontWeight: "700" }}
        >
          {data?.data.name}
        </Text>
        <Text variant="titleMedium">{data?.data.name}</Text>
        <Text variant="titleMedium">{data?.data.description}</Text>
        <Text variant="titleMedium">{`Date: ${data?.data.start_date}`}</Text>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 16,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginTop: 16
  }
});

export default EventDetail;
