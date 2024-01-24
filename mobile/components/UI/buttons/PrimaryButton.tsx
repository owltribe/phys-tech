import React from "react";
import { Button, Colors } from "react-native-ui-lib";

type PrimaryButtonProps = React.ComponentProps<typeof Button>;

const PrimaryButton = (props: PrimaryButtonProps) => {
  return (
    <Button
      size={Button.sizes.large}
      backgroundColor={Colors.blue40}
      {...props}
    />
  );
};

export default PrimaryButton;
