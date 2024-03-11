import { Image, StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { Text } from "react-native-paper";
import OutlineButton from "components/buttons/OutlineButton";
import SolidButton from "components/buttons/SolidButton";
import * as ImagePicker from "expo-image-picker";
import useUploadAvatar from "hooks/auth/useUploadAvatar";
import { Camera, SquarePen, User } from "lucide-react-native";
import { UserReadWithOrganization } from "types/generated";
import { mantineColors, white } from "utils/colors";
import { fontSize } from "utils/font-helper";

interface UserProfileProps {
  user: UserReadWithOrganization;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const uploadAvatarMutation = useUploadAvatar();

  const handleEdit = () => {
    SheetManager.show("UserProfileEdit", { payload: { user: user } });
  };

  const handleUploadAvatar = async () => {
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
      formData.append("image", {
        uri: result.assets[0].uri + "?" + new Date(),
        type: "image/png",
        name: "profile-image"
      });

      uploadAvatarMutation.mutate(formData);
    }
  };

  return (
    <>
      <View style={styles.imageContainer}>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar + "?" + new Date() }}
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
          <Text style={styles.title}>{user.full_name}</Text>
          <Text style={styles.subtitle}>{user.email}</Text>
          {user.contact && <Text style={styles.subtitle}>{user.contact}</Text>}
        </View>
      </View>

      <View style={styles.flexBox}>
        <SolidButton
          title="Редактировать профиль"
          onPress={handleEdit}
          Icon={SquarePen}
          compact
        />
        <OutlineButton
          title="Обновить фото профиля"
          onPress={handleUploadAvatar}
          loading={uploadAvatarMutation.isPending}
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

export default UserProfile;
