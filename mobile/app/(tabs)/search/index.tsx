import { useEffect, useRef, useState } from "react";
import { TextField } from "react-native-ui-lib";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useLocalSearchParams } from "expo-router";
import { Button, Paragraph, ScrollView, XStack } from "tamagui";

import SegmentedControl from "../../../components/SegmentedControl";
import { gray } from "../../../utils/colors";

import { Organization } from "./components/organization";
import { Service } from "./components/service";

const filtersMock: { id: number; name: string }[] = [
  {
    id: 0,
    name: "Filter1"
  },
  {
    id: 1,
    name: "Filter2"
  },
  {
    id: 2,
    name: "Filter3"
  },
  {
    id: 3,
    name: "Filter4"
  },
  {
    id: 4,
    name: "Filter 5"
  }
];

export default function Index() {
  const scrollViewRef = useRef<any>(null);

  const [activeFilterId, setActiveFilterId] = useState<number>();

  const { section } = useLocalSearchParams<{ section: string }>();
  const searchControlValues = [
    { name: "organization", title: "Организации" },
    { name: "service", title: "Услуги" },
    { name: "event", title: "Мероприятия" }
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const matchedSection = searchControlValues.find(
      (sc) => sc.name === section
    );
    const newIndex = matchedSection
      ? searchControlValues.indexOf(matchedSection)
      : 0;
    setSelectedIndex(newIndex);
  }, [section]);

  const sortedFilters = filtersMock
    ? [...filtersMock].sort((a, b) =>
        a.id === activeFilterId ? -1 : b.id === activeFilterId ? 1 : 0
      )
    : [];

  return (
    <MyStack>
      <TextField
        placeholder={"Placeholder"}
        floatingPlaceholder
        // onChangeText={onChangeText}
        fieldStyle={{
          backgroundColor: gray["900"]
        }}
        $outlinePrimary
        enableErrors
        validate={["required", "email", (value) => value.length > 6]}
        validationMessage={[
          "Field is required",
          "Email is invalid",
          "Password is too short"
        ]}
        showCharCounter
        maxLength={30}
      />
      <MyTextInput
        placeholder={"Поиск " + searchControlValues[selectedIndex || 0].title}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        mb="$1"
      />
      <SegmentedControl
        options={searchControlValues.map((a) => ({
          label: a.title,
          value: a.name
        }))}
        selectedOption={searchControlValues[selectedIndex].name}
        onOptionPress={(option: string) => {
          const matchedIndex = searchControlValues.findIndex(
            (sc) => sc.name === option
          );
          setSelectedIndex(matchedIndex >= 0 ? matchedIndex : 0);
        }}
      />
      <ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          maxHeight={40}
          mb="$4"
        >
          <XStack space="$3">
            {sortedFilters.map(({ id, name }) => {
              const isActive = activeFilterId == id;
              return (
                <Button
                  key={id}
                  borderRadius="$6"
                  size="$3"
                  backgroundColor={isActive ? "$blue8" : undefined}
                  variant={isActive ? undefined : "outlined"}
                  borderColor={isActive ? undefined : "$blue8"}
                  onPress={() => {
                    setActiveFilterId(id);
                    scrollViewRef.current?.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true
                    });
                  }}
                >
                  <Paragraph
                    px="$1"
                    color={isActive ? "white" : "$blue8"}
                    fontWeight="800"
                  >
                    {name}
                  </Paragraph>
                </Button>
              );
            })}
          </XStack>
        </ScrollView>
        {searchControlValues[selectedIndex].name === "organization" && (
          <Organization nameLike={searchQuery} />
        )}
        {searchControlValues[selectedIndex].name === "service" && (
          <Service search={searchQuery} />
        )}
      </ScrollView>
    </MyStack>
  );
}
