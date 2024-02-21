import { useCallback } from "react";
import { Dimensions, Image, ImageSourcePropType, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { TAnimationStyle } from "react-native-reanimated-carousel/lib/typescript/layouts/BaseLayout";

interface ImageCarouselProps {
  items: string[];
}

const ImageCarousel = ({ items }: ImageCarouselProps) => {
  const width = Dimensions.get("window").width;
  const PAGE_WIDTH = Dimensions.get("window").width;

  const pressAnim = useSharedValue<number>(0);
  const animationStyle: TAnimationStyle = useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
    const translateX = interpolate(
      value,
      [-1, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );

    return {
      transform: [{ translateX }],
      zIndex
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        pagingEnabled
        // style={styles.surface}
        width={width - 16 * 2}
        height={width / 2}
        data={items || []}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{
              uri: item
            }}
          />
        )}
      />
    </View>
  );
};

export default ImageCarousel;
