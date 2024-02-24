import React from "react";
import { ActivityIndicator } from "react-native";
import { mantineColors } from "utils/colors";

import { commonStyles } from "../styles/commonStyles";

interface LoaderProps
  extends Omit<React.ComponentProps<typeof ActivityIndicator>, "color"> {
  refreshControl?: boolean;
}

const Loader = ({ style, refreshControl, ...props }: LoaderProps) => {
  if (refreshControl)
    return (
      <ActivityIndicator
        color={mantineColors.blue[6]}
        style={[commonStyles.loadderMargin, style]}
        {...props}
      />
    );
};

export default Loader;
