import { useEffect, useRef, useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { MyStack } from "components/tamagui/MyStack";
import { MyTextInput } from "components/tamagui/MyTextInput";
import { useLocalSearchParams } from "expo-router";
import { Button, Paragraph, ScrollView, XStack } from "tamagui";
import {Organization} from "./components/organization";

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
    { name: "organization", title: "Организаций" },
    { name: "service", title: "Услуги" },
    { name: "event", title: "Мероприятия" }
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');


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
      <MyTextInput
          placeholder={"Поиск " + searchControlValues[selectedIndex || 0].title}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          mb="$1"
      />
      <SegmentedControl
        values={searchControlValues.map((a) => a.title)}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      <ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          maxHeight={40}
          mb='$4'
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
        {searchControlValues[selectedIndex].name === "organization" && <Organization nameLike={searchQuery} />}
      </ScrollView>
    </MyStack>
  );
}
