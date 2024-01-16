import { styled, TextArea } from "tamagui";
import { neutral } from "utils/colors";

export const MyTextArea = styled(TextArea, {
  name: "MyTextInput",
  size: "$5",
  borderRadius: "$space.3",
  mb: "$4",
  style: {
    shadowColor: neutral["500"],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5
  }
});
