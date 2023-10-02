import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCarouselData } from "./MainCarouselData";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const MainCarousel = () => {
  const items = mainCarouselData.map((item) => (
    <img
      role="presentation"
      src={item.image}
      alt=""
    />
  ));
  // useEffect(() => {
  //     console.log(items);
  // }, [])
  return (
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={5000}
        infinite
      />
  );
};

export default MainCarousel;
