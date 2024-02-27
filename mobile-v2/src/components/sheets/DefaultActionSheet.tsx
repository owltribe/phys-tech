import React from "react";
import ActionSheet, { ScrollView } from "react-native-actions-sheet";
import { commonStyles } from "styles/commonStyles";

interface DefaultActionSheetProps
  extends Omit<
    React.ComponentProps<typeof ActionSheet>,
    "containerStyle" | "indicatorStyle" | "gestureEnabled"
  > {}

const DefaultActionSheet = (props: DefaultActionSheetProps) => {
  return (
    <ActionSheet
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
      }}
      indicatorStyle={{
        width: 100
      }}
      gestureEnabled
      {...props}
    >
      <ScrollView contentContainerStyle={commonStyles.container}>
        {props.children}
      </ScrollView>
    </ActionSheet>
  );
};

export default DefaultActionSheet;
