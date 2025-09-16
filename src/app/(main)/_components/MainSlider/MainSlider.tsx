
'use client'
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
     autoplay: true,
    autoplaySpeed: 2000
  };
  return (
   <div className="grid grid-cols-12 my-12">

    <div className="col-span-12 md:col-span-9">

         <Slider {...settings}>
      <div>
       <Image src={'/slider-image-1.jpeg'} alt="slider" width={300} height={300} className="w-full h-96 object-cover"/>
      </div>

       <div>
       <Image src={'/slider-image-2.jpeg'} alt="slider" width={1000} height={1000} className="w-full h-96 object-cover"/>
      </div>

      <div>
       <Image src={'/slider-image-3.jpeg'} alt="slider" width={1000} height={1000} className="w-full h-96 object-cover"/>
      </div>
    </Slider>


    </div>

    <div className="col-span-12 md:col-span-3">
         <Image src={'/grocery-banner-2.jpeg'} alt="slider" width={400} height={400} className=" w-full h-48 object-center"/>
         <Image src={'/slider-image-3.jpeg'} alt="slider" width={400} height={400} className=" w-full h-48 object-center"/>

    </div>
    
   </div>
  );
}