import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

interface CarouselProps {
  images: string[] | undefined;
}

const CarouselComp = (props: CarouselProps) => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={0}
      isIntrinsicHeight
      totalSlides={props.images!.length}
      isPlaying
      infinite
      interval={3000}
      className="text-center mt-4 lg:mt-0"
    >
      <Slider>
        {props.images!.map((image, index) => (
          <Slide index={index} key={index.toString()}>
            <div className="w-full h-auto lg:h-80vh text-center">
              <img
                src={image}
                alt={index.toString()}
                className="max-h-full mx-auto"
              />
            </div>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};

export default CarouselComp;
