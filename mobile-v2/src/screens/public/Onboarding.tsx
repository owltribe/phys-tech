import { Image } from "react-native";
import { OnboardFlow } from "react-native-onboard";
import { OnboardingScreenProps } from "screens/types";

const Onboarding = ({ navigation }: OnboardingScreenProps) => {
  return (
    <OnboardFlow
      pages={[
        {
          title: "Science Услуги",
          subtitle:
            "Приложение предназначено для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям",
          imageUri: Image.resolveAssetSource(
            require("../../../assets/logo.png")
          ).uri,
          primaryButtonTitle: "Далее",
          secondaryButtonTitle: "Авторизоваться"
        },
        {
          title: "Организации",
          subtitle:
            "Список научно-исследовательских организаций, Вузов и частных компаний. Профили организаций с детальной информацией.",
          imageUri: Image.resolveAssetSource(
            require("images/illustrations/organizations.png")
          ).uri,
          primaryButtonTitle: "Далее"
        },
        {
          title: "Услуги",
          subtitle:
            "Каталог научных услуг от каждой организации. Описание, стоимость и способы заказа услуг",
          imageUri: Image.resolveAssetSource(
            require("images/illustrations/services.png")
          ).uri,
          primaryButtonTitle: "Далее"
        },
        {
          title: "Мероприятия",
          subtitle: "Календарь семинаров, конференций и других мероприятий",
          imageUri: Image.resolveAssetSource(
            require("images/illustrations/events.png")
          ).uri,
          primaryButtonTitle: "Авторизоваться"
        }
      ]}
      type="fullscreen"
      onDone={() => {
        navigation.navigate("Login");
      }}
      showDismissButton
    />
  );
};

export default Onboarding;
