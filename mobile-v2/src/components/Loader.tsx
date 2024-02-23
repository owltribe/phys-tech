import React from "react";
import { ActivityIndicator } from "react-native";
import { mantineColors } from "utils/colors";

type LoaderProps = Omit<
  React.ComponentProps<typeof ActivityIndicator>,
  "color"
>;

const Loader = (props: LoaderProps) => {
  return (
    <ActivityIndicator
      color={mantineColors.blue[6]}
      {...props}
    />
  );
};

export default Loader;
