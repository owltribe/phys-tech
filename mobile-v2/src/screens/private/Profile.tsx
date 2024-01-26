import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  List,
  MD3Colors,
  Text
} from "react-native-paper";
import ScreenWrapper from "components/ScreenWrapper";
import { useAuth } from "providers/AuthProvider";
import { ProfileScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";

export default function Profile({ navigation }: ProfileScreenProps) {
  const { user, onLogout } = useAuth();

  const userAvatarText = `${user?.first_name[0]}${user?.last_name[0]}`;

  console.log(user, "user");
  return (
    <ScreenWrapper>
      <KeyboardAvoidingView>
        <View
          style={[styles.itemContainer, commonStyles.defaultHorizontalPadding]}
        >
          <Avatar.Text
            style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            label={userAvatarText}
            color={MD3Colors.primary100}
            size={60}
          />
          <View style={styles.itemHeaderContainer}>
            <Text
              variant="titleMedium"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={[styles.name]}
            >
              {user?.full_name}
            </Text>
            <Text
              variant="titleMedium"
              style={[styles.email]}
              numberOfLines={1}
            >
              {user?.email}
            </Text>
          </View>
        </View>
        <List.Section title="Профиль">
          <List.Item
            title={user?.role}
            description="Роль"
          />
          <Divider />
        </List.Section>
        {user?.organization && (
          <List.Section title="Организация">
            <List.Item
              title={user.organization.category}
              description="Название"
            />
            <List.Item
              title={user.organization.category}
              description="Категория"
            />
            <List.Item
              title={user.organization.contact}
              description="Контакты"
            />
            <List.Item
              title={user.organization.email}
              description="Почта"
            />
            <List.Item
              title={user?.organization?.bin}
              description="БИН"
            />
          </List.Section>
        )}

        <View style={commonStyles.container}>
          <Button
            mode="contained-tonal"
            icon="logout"
            onPress={onLogout}
            textColor={theme.colors.error}
            buttonColor={theme.colors.errorContainer}
          >
            Выйти
          </Button>
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24
  },
  itemHeaderContainer: {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  name: {
    fontWeight: "400"
  },
  email: {
    fontWeight: "500"
  },
  flex: {
    flex: 1
  }
});
