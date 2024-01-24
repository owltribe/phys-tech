import React from "react";
import { TextField } from "react-native-ui-lib";
import { Eye } from "@tamagui/lucide-icons";

import { black, neutral } from "../../../utils/colors";

type PasswordFieldProps = React.ComponentProps<typeof TextField>;

const PasswordField = (props: PasswordFieldProps) => {
  return (
    <TextField
      secureTextEntry={true}
      autoCorrect={false}
      style={{
        backgroundColor: neutral["100"],
        height: 48,
        borderRadius: 12,

        shadowColor: neutral["500"],
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 5
      }}
      // right={
      //   <Eye
      //     size={24}
      //     onPress={() => setHidePass(!hidePass)}
      //   />
      // }
      {...props}
    />
  );
};

export default PasswordField;
