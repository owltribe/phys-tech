import { Image, StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Text } from "react-native-paper";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import * as ImagePicker from "expo-image-picker";
import useUploadOrganizationAvatar from "hooks/organization/useUploadOrganizationAvatar";
import { Camera, SquarePen, User } from "lucide-react-native";
import { OrganizationRead } from "types/generated";
import { mantineColors, white } from "utils/colors";
import { getOrganizationCategoryLabel } from "utils/enum-helpers";
import { fontSize } from "utils/font-helper";

interface OrganizationProfileProps {
  organization: OrganizationRead;
}

const OrganizationProfile = ({ organization }: OrganizationProfileProps) => {
  const uploadOrganizationAvatarMutation = useUploadOrganizationAvatar();

  const handleEdit = () => {
    SheetManager.show("OrganizationEdit", {
      payload: { organization: organization }
    });
  };

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
    <>
      <View style={styles.imageContainer}>
        {organization.photo ? (
          <Image
            source={{ uri: organization.photo + "?" + new Date() }}
            style={styles.image}
          />
        ) : (
          <View style={styles.image}>
            <User
              size={60}
              color={white}
            />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{organization.name}</Text>
          <Text style={styles.subtitle}>{organization.email}</Text>
          {organization.contact && (
            <Text style={styles.subtitle}>{organization.contact}</Text>
          )}
          <Text style={styles.subtitle}>{`БИН ${organization.bin}`}</Text>
          <Text style={styles.subtitle}>
            {getOrganizationCategoryLabel(organization.category)}
          </Text>
        </View>
      </View>

      <View style={styles.flexBox}>
        <SolidButton
          title="Редактировать организацию"
          onPress={handleEdit}
          Icon={SquarePen}
          compact
        />
        <OutlineButton
          title="Обновить фото организации"
          onPress={handleUpdateOrganizationAvatar}
          loading={uploadOrganizationAvatarMutation.isPending}
          Icon={Camera}
          compact
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 18
  },
  image: {
    flex: 1,
    width: 160,
    height: 160,
    borderRadius: 50,
    backgroundColor: mantineColors.blue[4],
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: mantineColors.dark[9],
    fontSize: fontSize.large,
    fontFamily: "GoogleSans-Bold"
  },
  subtitle: {
    color: mantineColors.dark[4],
    fontSize: fontSize.large,
    fontFamily: "GoogleSans-Regular"
  },

  flexBox: {
    flex: 1,
    gap: 6
  }
});

export default OrganizationProfile;
