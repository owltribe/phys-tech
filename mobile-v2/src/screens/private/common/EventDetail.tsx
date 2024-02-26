import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import dayjs from "dayjs";
import useEvent from "hooks/events/useEvent";
import { Calendar } from "lucide-react-native";
import { EventScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { mantineColors } from "utils/colors";
import { fontPixel } from "utils/font-helper";
import { formatMinutesToHoursMinutes } from "utils/formatters";

const EventDetail = ({
  route: {
    params: { eventId }
  }
}: EventScreenProps) => {
  const { data } = useEvent(eventId);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={[commonStyles.container, commonStyles.defaultListGap]}
      >
        <View style={styles.imageContainer}>
          <Calendar
            size={42}
            color={mantineColors.dark[5]}
          />
        </View>

        {data?.data && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Главное</Text>
            <View style={styles.cardInnerContainer}>
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Название</Text>
                <Text style={styles.itemText}>{data.data.name}</Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Дата</Text>
                <Text style={styles.itemText}>
                  {dayjs(`${data.data.start_date}`)
                    .locale("ru")
                    .format("DD MMMM YYYY")}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Время</Text>
                <Text style={styles.itemText}>
                  {dayjs(`${data.data.start_date}T${data.data.start_time}`)
                    .locale("ru")
                    .format("HH:MM")}
                </Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Место проведения</Text>
                <Text style={styles.itemText}>{data.data.location}</Text>
              </View>
              <Divider bold />
              <View style={styles.item}>
                <Text style={styles.itemLabel}>Продолжительность</Text>
                <Text style={styles.itemText}>
                  {formatMinutesToHoursMinutes(data.data.duration)}
                </Text>
              </View>
            </View>
          </View>
        )}

        {data?.data.description && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Описание</Text>
            <View style={styles.cardInnerContainer}>
              <Text style={[styles.itemText, { textAlign: "left" }]}>
                {data.data.description}
              </Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: mantineColors.gray[1],
    borderRadius: 16,
    height: 200,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 6,
    gap: 24
  },
  cardTitle: {
    fontSize: fontPixel(22),
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  },
  cardInnerContainer: {
    flex: 1,
    gap: 16
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  itemLabel: {
    flex: 1,
    color: mantineColors.dark[3],
    fontFamily: "GoogleSans-Regular"
  },
  itemText: {
    textAlign: "right",
    flex: 1,
    color: mantineColors.dark[5],
    fontFamily: "GoogleSans-Medium"
  },

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
