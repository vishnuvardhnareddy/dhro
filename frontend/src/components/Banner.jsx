import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const images = [
    "https://www.thedhronas.com/admin/assets/images/banner_images/Banner_1.jpeg",
    "https://www.thedhronas.com/admin/assets/images/banner_images/banner_laptop.png",
    "https://www.thedhronas.com/admin/assets/images/banner_images/TARGET_SSC_2025.png",
];

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="banner-container">
            <div className="banner-content">
                <div className="banner-left">
                    <div className="quote">
                        <h1>Join.</h1>
                        <h1>Guide.</h1>
                        <h1>Success.</h1>
                        <button onClick={() => navigate("/auth")}>Get Started</button>
                    </div>
                </div>

                <div className="banner-middle">
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
                                <div className="slide-wrapper">
                                    <img src={src} alt={`Slide ${index + 1}`} className="slide-image" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Banner;
