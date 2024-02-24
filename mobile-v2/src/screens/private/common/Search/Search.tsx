import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StatusBar, View } from "react-native";
import SearchBar from "components/fields/SearchBar";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import { SearchScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

import EventsList from "./components/EventsList";
import OrganizationsList from "./components/OrganizationsList";
import ServicesList from "./components/ServicesList";

const options = [
  { label: "Организации", value: "organization" },
  { label: "Услуги", value: "service" },
  { label: "Мероприятия", value: "event" }
];
type OptionsType = "organization" | "service" | "event";

export default function Search({
  navigation,
  route: { params }
}: SearchScreenProps) {
  const [selectedOption, setSelectedOption] = useState<OptionsType>(
    params?.defaultOption || "organization"
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!!params?.defaultOption && selectedOption !== params?.defaultOption) {
      setSelectedOption(params?.defaultOption);
    }
  }, [params?.defaultOption]);

  return (
    <ScreenWrapper withScrollView={false}>
      <KeyboardAvoidingView style={[{ paddingTop: StatusBar.currentHeight }]}>
        <View
          style={[
            commonStyles.defaultHorizontalPadding,
            commonStyles.defaultListGap
          ]}
        >
          <SearchBar
            placeholder="Поиск..."
            mode="bar"
            value={search}
            onChangeText={setSearch}
          />
          <SegmentedControl
            options={options}
            selectedOption={selectedOption}
            onOptionPress={(o) => setSelectedOption(o as OptionsType)}
          />
        </View>
      </KeyboardAvoidingView>

      {selectedOption === "organization" && (
        <OrganizationsList
          search={search}
          navigation={navigation}
        />
      )}
      {selectedOption === "service" && (
        <ServicesList
          search={search}
          navigation={navigation}
        />
      )}
      {selectedOption === "event" && (
        <EventsList
          search={search}
          navigation={navigation}
        />
      )}
    </ScreenWrapper>
  );
}
