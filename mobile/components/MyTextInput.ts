import { Input, styled } from "tamagui";
import { neutral } from "utils/colors";

export const MyTextInput = styled(Input, {
  name: "MyTextInput",
  size: "$5",
  borderRadius: "$space.3",
  borderWidth: 0,
  mb: "$4",
  style: {
    shadowColor: neutral["500"],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  }
});
