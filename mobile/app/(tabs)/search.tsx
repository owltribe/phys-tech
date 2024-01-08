import {useLocalSearchParams, useRouter} from "expo-router";

import { MyStack } from "../../components/MyStack";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {useEffect, useState} from "react";
import { MyTextInput } from "components/MyTextInput";

export default function Search() {
    const { section } = useLocalSearchParams<{ section: string }>();
    const searchControlValues = [{name: "organization", title: "Организаций"}, {name: "service", title: "Услуги"}, {name: "event", title: "Мероприятия"}];
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        const matchedSection = searchControlValues.find(sc => sc.name === section);
        const newIndex = matchedSection ? searchControlValues.indexOf(matchedSection) : 0;
        setSelectedIndex(newIndex);
    }, [section]);

    return (
        <MyStack>
            <SegmentedControl>
                <SegmentedControl
                    values={searchControlValues.map(a => a.title)}
                    selectedIndex={selectedIndex}
                    onChange={(event) => {
                        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                    }}
                />
            </SegmentedControl>
            <MyTextInput placeholder={"Поиск " + searchControlValues[selectedIndex || 0].title} />
        </MyStack>
    );
}
