import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import HeroSliderTwoSingle from "../components/HeroSliderTwoSingle";
import api from "../constants/api";

const HeroSliderTwo = () => {
  const [banners, setBanners] = useState([]);
  const getContent = () => {
    api
      .get('/content/getBanner')
      .then((res) => {
        setBanners(res.data.data);
      })
      .catch(() => {
       
      });
  };
  useEffect(() => {
    getContent();
  }, []);
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the speed as needed
  };
  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Slider {...sliderSettings}>
          {banners &&
            banners.map((single, key) => {
              return (
                <HeroSliderTwoSingle
                  sliderClassName="swiper-slide"
                  data={single}
                  key={key}
                  banners={single}
                />
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSliderTwo;
