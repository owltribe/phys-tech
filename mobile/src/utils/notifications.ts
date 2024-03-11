import { ToastAndroid } from "react-native";

export const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showToastWithGravity = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

export const showToastWithGravityAndOffset = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
