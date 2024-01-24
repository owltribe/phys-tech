import { useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Card, FAB, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import useServices from "hooks/services/useServices";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import AddServiceModal from "./organization/Services/components/AddServiceModal";

const SERVICES = "Services";
const SERVICE_REQUESTS = "ServiceRequests";

const options = [
  { label: "Услуги", value: SERVICES },
  { label: "Заявки", value: SERVICE_REQUESTS }
];

const Services = (props: ServicesScreenProps) => {
  const [selectedOption, setSelectedOption] = useState(SERVICES);

  const [isAddServiceModalOpened, setIsAddServiceModalOpened] = useState(false);

  const { data: servicesData } = useServices();
  const { data: serviceRequestsData } = useServiceRequests();

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[commonStyles.container, styles.container]}>
        <Text
          style={styles.text}
          variant="headlineLarge"
        >
          Мои Услуги
        </Text>
        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
        />

        {selectedOption === SERVICES && (
          <>
            {servicesData?.data && (
              <FlatList
                data={servicesData?.data.items}
                keyExtractor={(item) => item.id}
                style={styles.container}
                renderItem={({ item }) => {
                  return (
                    <Card
                      mode="contained"
                      style={styles.card}
                    >
                      <Card.Content style={styles.content}>
                        {/*<Card.Cover*/}
                        {/*  style={styles.cover}*/}
                        {/*  source={item.}*/}
                        {/*/>*/}
                        <Card.Title
                          title={item.name}
                          subtitle={item.description}
                          titleVariant="titleMedium"
                          style={styles.title}
                          // right={() => <IconButton icon={"bookmark-outline"} />}
                        />
                      </Card.Content>
                    </Card>
                  );
                }}
              />
            )}
          </>
        )}
      </KeyboardAvoidingView>

      <FAB
        label="Добавить услугу"
        icon="plus"
        style={styles.fab}
        onPress={() => setIsAddServiceModalOpened(true)}
        animated
      />

      <AddServiceModal
        visible={isAddServiceModalOpened}
        onClose={() => setIsAddServiceModalOpened(false)}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32
  },
  text: {
    marginVertical: 4,
    fontWeight: "700"
  },
  card: {
    marginTop: 16
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  cover: {
    width: 72,
    height: 72
  },
  title: {
    flexShrink: 1,
    marginVertical: 0
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default Services;
