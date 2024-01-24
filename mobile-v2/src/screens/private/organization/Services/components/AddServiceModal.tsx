import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface AddServiceModalProps
  extends Pick<React.ComponentProps<typeof BottomSheetModal>, "ref"> {
  // onClose: () => void;
}

const AddServiceModal = ({ ref }: AddServiceModalProps) => {
  const snapPoints = useMemo(() => ["25%", "75%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      index={100}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  }
});

export default AddServiceModal;
