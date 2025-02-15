import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/Bannar/slider-1.jpeg";
import slide2 from "../../assets/Bannar/slider-2.jpeg";
import slide3 from "../../assets/Bannar/slider-3.jpeg";
import slide4 from "../../assets/Bannar/slider-4.jpeg";
import slide5 from "../../assets/Bannar/slider-5.jpeg";
import slide6 from "../../assets/Bannar/slider-6.png";

export default function MainBanner() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    arrows: false,
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    arrows: false,
  };

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-2 py-8">
        <div className="col-span-12 row-span-2 lg:col-span-8">
          <Slider {...settings}>
            <img className="h-[400px] w-full" src={slide1} alt="" />
            <img className="h-[400px] w-full" src={slide2} alt="" />
          </Slider>
        </div>

        <div className="col-span-12 row-span-2 lg:col-span-4">
          <Slider {...settings2}>
            <figure>
              <img
                className="h-[200px] w-full object-cover"
                src={slide3}
                alt=""
              />
              <img
                className="h-[200px] w-full object-cover"
                src={slide5}
                alt=""
              />
            </figure>
            <figure>
              <img
                className="h-[200px] w-full object-cover"
                src={slide4}
                alt=""
              />
              <img
                className="h-[200px] w-full object-cover"
                src={slide6}
                alt=""
              />
            </figure>
          </Slider>
        </div>
      </div>
    </>
  );
}
