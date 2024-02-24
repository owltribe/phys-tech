import React from "react";
import { ActivityIndicator } from "react-native";
import { mantineColors } from "utils/colors";

import { commonStyles } from "../styles/commonStyles";

type LoaderProps = Omit<
  React.ComponentProps<typeof ActivityIndicator>,
  "color"
>;

const Loader = ({ style, ...props }: LoaderProps) => {
  return (
    <ActivityIndicator
      color={mantineColors.blue[6]}
      style={[commonStyles.loadderMargin, style]}
      {...props}
    />
  );
};

export default Loader;
