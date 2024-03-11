import { Image } from "react-native";
import { OnboardFlow } from "react-native-onboard";
import { OnboardingScreenProps } from "screens/types";
import { fontPixel, fontSize } from "utils/font-helper";

const Onboarding = ({ navigation }: OnboardingScreenProps) => {
  const titleStyle = {
    fontSize: fontPixel(32),
    fontFamily: "GoogleSans-Bold"
  };
  const subtitleStyle = {
    fontSize: fontSize.large,
    fontFamily: "GoogleSans-Medium"
  };

  return (
    <OnboardFlow
      pages={[
        {
          title: "Science Услуги",
          subtitle:
            "Приложение предназначено для упрощения процесса сбора, поиска и получения информации по научно-аналитическим и экспериментальным исследованиям",
          imageComponent: (
            <Image
              source={require("../../../assets/logo.png")}
              style={{ width: "100%", height: 320 }}
            />
          ),
          primaryButtonTitle: "Далее",
          secondaryButtonTitle: "Авторизоваться",
          titleStyle: titleStyle,
          subtitleStyle: subtitleStyle
        },
        {
          title: "Организации",
          subtitle:
            "Список научно-исследовательских организаций, Вузов и частных компаний. Профили организаций с детальной информацией.",
          imageComponent: (
            <Image
              source={require("images/illustrations/organizations.png")}
              style={{ width: "100%", height: 260, marginVertical: 40 }}
            />
          ),
          primaryButtonTitle: "Далее",
          titleStyle: titleStyle,
          subtitleStyle: subtitleStyle
        },
        {
          title: "Услуги",
          subtitle:
            "Каталог научных услуг от каждой организации. Описание, стоимость и способы заказа услуг",
          imageComponent: (
            <Image
              source={require("images/illustrations/services.png")}
              style={{ width: "100%", height: 260, marginVertical: 40 }}
            />
          ),
          primaryButtonTitle: "Далее",
          titleStyle: titleStyle,
          subtitleStyle: subtitleStyle
        },
        {
          title: "Мероприятия",
          subtitle: "Календарь семинаров, конференций и других мероприятий",
          imageComponent: (
            <Image
              source={require("images/illustrations/events.png")}
              style={{ width: "100%", height: 260, marginVertical: 40 }}
            />
          ),
          primaryButtonTitle: "Авторизоваться",
          titleStyle: titleStyle,
          subtitleStyle: subtitleStyle
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
