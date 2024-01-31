import { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import useUploadOrganizationAvatar from "hooks/organization/useUploadOrganizationAvatar";
import { useAuth } from "providers/AuthProvider";
import { ProfileScreenProps } from "screens/types";
import { commonStyles } from "styles/commonStyles";
import theme from "styles/theme";
import { Linking } from 'react-native';
import { PrivacyPolicyLink, TermsAndConditionsLink } from '../../utils/links';
import UpdateOrganizationModal from "./organization/ServiceRequestDetail/components/UpdateOrganizationModal";

export default function Profile({ navigation }: ProfileScreenProps) {
  const { user, onLogout } = useAuth();

  const uploadOrganizationAvatarMutation = useUploadOrganizationAvatar();

  const [isUpdateOrganizationModalOpen, setIsUpdateOrganizationModalOpened] =
    useState(false);

  const userAvatarText = `${user?.first_name[0]}${user?.last_name[0]}`;
  
  const openLink = (url: string): void => {
    Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err)); }

  const handleUpdateOrganizationAvatar = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      const formData = new FormData();
      // @ts-ignore
      formData.append("photo", {
        uri: result.assets[0].uri,
        type: "image/png",
        name: "profile-image"
      });

      uploadOrganizationAvatarMutation.mutate(formData);
    }
  };

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
          <>
            <List.Section title="Организация">
              <View
                style={[
                  styles.itemContainer,
                  commonStyles.defaultHorizontalPadding
                ]}
              >
                {user.organization.photo ? (
                  <Avatar.Image
                    style={[
                      styles.avatar,
                      { backgroundColor: theme.colors.primary }
                    ]}
                    source={{ uri: user.organization.photo }}
                    size={60}
                  />
                ) : (
                  <Avatar.Text
                    style={[
                      styles.avatar,
                      { backgroundColor: theme.colors.primary }
                    ]}
                    label={userAvatarText}
                    color={MD3Colors.primary100}
                    size={60}
                  />
                )}

                <View style={styles.itemHeaderContainer}>
                  <Text
                    variant="titleMedium"
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[styles.name]}
                  >
                    {user.organization.name}
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={[styles.email]}
                    numberOfLines={1}
                  >
                    {user.organization.email}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  commonStyles.defaultHorizontalPadding,
                  commonStyles.defaultListGap,
                  { marginTop: 16 }
                ]}
              >
                <Button
                  mode="contained-tonal"
                  onPress={() => setIsUpdateOrganizationModalOpened(true)}
                >
                  Редактировать организацию
                </Button>
                <Button
                  mode="contained-tonal"
                  loading={uploadOrganizationAvatarMutation.isPending}
                  onPress={handleUpdateOrganizationAvatar}
                >
                  Обновить фото организации
                </Button>
              </View>

              <List.Item
                title={user.organization.category}
                description="Категория"
              />
              <List.Item
                title={user.organization.contact}
                description="Контакты"
              />
              <List.Item
                title={user?.organization?.bin}
                description="БИН"
              />
            </List.Section>
          </>
        )}

        <List.Section>
          <List.Item
            title="Privacy Policy"
            description="Read our Privacy Policy"
            onPress={() => openLink(PrivacyPolicyLink)}
          />
          <List.Item
            title="Terms and Conditions"
            description="Read our Terms and Conditions"
            onPress={() => openLink(TermsAndConditionsLink)}
          />
        </List.Section>

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
      {user?.organization && (
        <UpdateOrganizationModal
          visible={isUpdateOrganizationModalOpen}
          onClose={() => setIsUpdateOrganizationModalOpened(false)}
          organization={user?.organization}
        />
      )}
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
