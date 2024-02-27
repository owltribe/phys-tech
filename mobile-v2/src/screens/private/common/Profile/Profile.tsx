import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { Linking } from "react-native";
import { Divider } from "react-native-paper";
import OutlineButton from "components/buttons/OutlineButton";
import BaseCard from "components/cards/BaseCard";
import ScreenWrapper from "components/ScreenWrapper";
import { LogOut, Notebook, Shield } from "lucide-react-native";
import { useAuth } from "providers/AuthProvider";
import { ProfileScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import { PrivacyPolicyLink, TermsAndConditionsLink } from "utils/links";

import OrganizationProfile from "./components/OrganizationProfile";
import UserProfile from "./components/UserProfile";

export default function Profile({ navigation }: ProfileScreenProps) {
  const { user, onLogout } = useAuth();

  const userAvatarText = `${user?.first_name[0]}${user?.last_name[0]}`;

  const openLink = (url: string): void => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL: ", err)
    );
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={[
          commonStyles.container,
          commonStyles.defaultListGap,
          { paddingTop: StatusBar.currentHeight }
        ]}
      >
        {user && <UserProfile user={user} />}

        {user?.organization && (
          <>
            <Divider
              bold
              style={commonStyles.defaultVerticalMargin}
            />
            <OrganizationProfile organization={user.organization} />
          </>
        )}

        <View style={styles.linksContainer}>
          <BaseCard
            description="Политика конфиденциальности"
            Icon={Shield}
            onPress={() => openLink(PrivacyPolicyLink)}
          />
          <BaseCard
            description="Условия и положения"
            Icon={Notebook}
            onPress={() => openLink(TermsAndConditionsLink)}
          />
        </View>

        <View style={styles.exitButtonContainer}>
          <OutlineButton
            compact
            color="red"
            Icon={LogOut}
            title="Выйти"
            onPress={onLogout}
          />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  exitButtonContainer: {
    flex: 1,
    marginTop: 16
  },
  linksContainer: {
    flex: 1,
    gap: 8,
    marginVertical: 16
  }
});
