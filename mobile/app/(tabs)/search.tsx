import { MyStack } from "components/MyStack";
import { useRouter } from "expo-router";
import { Paragraph } from "tamagui";

export default function Search() {
  const router = useRouter();

  return (
    <MyStack>
      <Paragraph>Hello world IT IS SEARCH</Paragraph>
    </MyStack>
  );
}
