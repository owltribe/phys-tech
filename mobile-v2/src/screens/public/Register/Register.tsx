import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ScreenWrapper from "components/ScreenWrapper";
import SegmentedControl from "components/SegmentedControl";
import Header from "components/typography/Header";
import { RegisterScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { UserRole } from "types/generated";
import { mantineColors } from "utils/colors";

import ClientForm from "./components/ClientForm";
import OrganizationForm from "./components/OrganizationForm";

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("Client");

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <Header>Создайте аккаунт</Header>

        <SegmentedControl
          options={[
            { label: "Организация", value: "Organization" },
            { label: "Клиент", value: "Client" }
          ]}
          selectedOption={selectedRole}
          onOptionPress={(o) => setSelectedRole(o as UserRole)}
        />

        {selectedRole === "Client" && <ClientForm navigation={navigation} />}

        {selectedRole === "Organization" && (
          <OrganizationForm navigation={navigation} />
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Уже есть аккаунт? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Войти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  role: { flex: 1 },
  label: {
    fontFamily: "GoogleSans-Regular",
    color: mantineColors.gray[6]
  },
  button: {
    marginTop: 24
  },
  row: {
    marginTop: 4,
    flexDirection: "row",
    alignSelf: "center"
  },
  link: {
    fontFamily: "GoogleSans-Bold",
    color: mantineColors.blue[5]
  }
});

export default RegisterScreen;
