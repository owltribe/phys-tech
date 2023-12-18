import { MyStack } from "components/MyStack";
import { H1 } from "tamagui";

export default function Onboarding() {
  return (
    <MyStack justifyContent="flex-start">
      <H1
        fontWeight="900"
        style={{ fontFamily: "InterBold" }}
      >
        Onboarding Page
      </H1>
    </MyStack>
  );
}
