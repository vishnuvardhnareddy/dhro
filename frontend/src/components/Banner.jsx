import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

const images = [
    "https://www.thedhronas.com/admin/assets/images/banner_images/Banner_1.jpeg",
    "https://www.thedhronas.com/admin/assets/images/banner_images/banner_laptop.png",
    "https://www.thedhronas.com/admin/assets/images/banner_images/TARGET_SSC_2025.png",
];

const Banner = () => {
    return (
        <div className="banner-container">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="custom-swiper"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index} className="swiper-slide">
                        <div className="slide-background" style={{ backgroundImage: `url(${src})` }} />
                        <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;