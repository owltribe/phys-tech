import { createNumberMask } from "react-native-mask-input";

export const phoneNumberMask = createNumberMask({
  prefix: ["+"],
  delimiter: " ",
  separator: " ",
  precision: 4
});
