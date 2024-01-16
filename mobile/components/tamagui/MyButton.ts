import { Button, styled } from "tamagui";

export const MyButton = styled(Button, {
  name: "MyButton",
  size: "$5",
  theme: "blue",
  color: "$color1",
  backgroundColor: "$color8",
  borderRadius: "$space.6",
  borderWidth: 0,
  textProps: {
    fontWeight: "700"
  }
});
