import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

export function normalize(size: number, based: "width" | "height" = "width") {
  const newSize =
    based === "height" ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, "width");
};
//for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, "height");
};

export const fontPixel = (size: number) => {
  return heightPixel(size);
};

export const fontSize = {
  mini: fontPixel(12),
  small: fontPixel(15),
  medium: fontPixel(17),
  large: fontPixel(20),
  xlarge: fontPixel(24)
};
