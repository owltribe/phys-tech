import { Button, styled } from "tamagui";

export const MyButton = styled(Button, {
  name: "MyButton",
  size: "$5",
  theme: "blue",
  borderRadius: "$space.6",
  borderWidth: 0,
  textProps: {
    fontWeight: "700"
  }
});
