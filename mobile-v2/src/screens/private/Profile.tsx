import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Avatar, MD3Colors, Text } from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import { ProfileScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";

import { useAuth } from "../../providers/AuthProvider";

export default function Profile({ navigation }: ProfileScreenProps) {
  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={commonStyles.container}>
        <View style={styles.itemContainer}>
          <Avatar.Text
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            label="AP"
            color={MD3Colors.primary100}
            size={60}
          />
          <View style={styles.itemTextContentContainer}>
            <View style={styles.itemHeaderContainer}>
              <Text
                variant="labelLarge"
                style={[styles.header]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {user?.full_name}
              </Text>
              <Text
                variant="labelLarge"
                style={[styles.date]}
              >
                {user?.role}
              </Text>
            </View>

            <View style={styles.itemMessageContainer}>
              <View style={styles.flex}>
                <Text
                  variant="labelLarge"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {user?.email}
                </Text>
                {user?.organization && (
                  <Text
                    variant="labelLarge"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user.organization.name}
                  </Text>
                )}
              </View>

              {/*<Icon*/}
              {/*  na*/}
              {/*  color={MD3Colors.neutralVariant70}*/}
              {/*  size={20}*/}
              {/*  // onPress={() => setVisible(!visible)}*/}
              {/*  style={styles.icon}*/}
              {/*/>*/}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: 16,
    marginTop: 8
  },
  icon: {
    marginLeft: 16,
    alignSelf: "flex-end"
  },
  itemContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  itemTextContentContainer: {
    flexDirection: "column",
    flex: 1
  },
  itemHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1
  },
  header: {
    fontSize: 14,
    marginRight: 8,
    flex: 1
  },
  date: {
    fontSize: 12
  },
  flex: {
    flex: 1
  }
});
