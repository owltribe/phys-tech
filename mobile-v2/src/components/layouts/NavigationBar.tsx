import { Appbar } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { StackHeaderProps } from "@react-navigation/stack";

export default function NavigationBar({
  navigation,
  route,
  options,
  back
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header mode="center-aligned">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
