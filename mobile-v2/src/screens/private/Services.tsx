import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import ScreenWrapper from "components/ScreenWrapper";
import { ServicesScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";

export default function Services({ navigation }: ServicesScreenProps) {
  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Text>Services Screen</Text>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
