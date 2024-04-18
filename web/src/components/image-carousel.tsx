'use client'
import '@splidejs/react-splide/css';

// @ts-ignore
import {Splide, SplideSlide, SplideTrack} from "@splidejs/react-splide";

interface ImageCarouselProps {
  images: {
    id: string;
    url: string
  }[]
}

const ImageCarousel = ({
  images
}: ImageCarouselProps) => {
  return (
    <div className="relative flex h-full w-full">
      <Splide
        id="services-images"
        aria-label="Service Images"
        hasTrack={images.length > 1}
        options={{
          autoplay: true,
          interval: 2000,
          arrows: images.length > 1
        }}
        height="100%"
        className="h-full w-full"
      >
        <SplideTrack />
        {images.map(i => (
          <SplideSlide key={i.id}>
            <img
              src={i.url}
              alt={`image-${i.id}`}
              className="h-full w-full object-cover"
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default ImageCarousel