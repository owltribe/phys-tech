import { useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Card, FAB, IconButton, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import useServiceRequests from "hooks/service_requests/useServiceRequests";
import useServices from "hooks/services/useServices";
import { useAuth } from "providers/AuthProvider";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import AddServiceModal from "./components/AddServiceModal";

const SERVICES = "Services";
const SERVICE_REQUESTS = "ServiceRequests";

const options = [
  { label: "Услуги", value: SERVICES },
  { label: "Заявки", value: SERVICE_REQUESTS }
];

const Services = ({ navigation }: ServicesScreenProps) => {
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState(SERVICES);
  const [isAddServiceModalOpened, setIsAddServiceModalOpened] = useState(false);

  const { data: servicesData } = useServices({
    organizationId: user?.organization?.id
  });
  const { data: serviceRequestsData } = useServiceRequests();

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[commonStyles.container]}>
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
      </KeyboardAvoidingView>
      {selectedOption === SERVICES && (
        <>
          {servicesData?.data && (
            <FlatList
              data={servicesData?.data.items}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0}
              scrollEventThrottle={16}
              style={styles.container}
              contentContainerStyle={[
                commonStyles.defaultHorizontalPadding,
                styles.container
              ]}
              renderItem={({ item }) => (
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
                      right={() => (
                        <IconButton
                          icon="chevron-right"
                          onPress={() =>
                            navigation.navigate("Service", {
                              serviceId: item.id
                            })
                          }
                        />
                      )}
                    />
                  </Card.Content>
                </Card>
              )}
            />
          )}
        </>
      )}

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
    paddingBottom: 60
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
