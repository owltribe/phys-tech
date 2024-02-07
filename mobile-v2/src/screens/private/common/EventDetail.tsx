import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Icon, Surface, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import useEvent from "hooks/events/useEvent";
import { EventScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

const EventDetail = ({
  route: {
    params: { eventId }
  }
}: EventScreenProps) => {
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
        <Text variant="titleMedium">{`Описание: ${data?.data.description}`}</Text>
        <Text variant="titleMedium">{`Запланировано на: ${data?.data.start_date} в ${data?.data.start_time}`}</Text>
        <Text variant="titleMedium">{`Место проведения: ${data?.data.location}`}</Text>
        <Text variant="titleMedium">{`Примерная продолжительность: ${data?.data.duration} минут`}</Text>
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
