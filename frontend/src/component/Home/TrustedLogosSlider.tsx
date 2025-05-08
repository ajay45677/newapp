import React, {  } from 'react';
import Slider from 'react-slick';
const logos = [
  { id: 1, title:"Web development company in Noida India", img: "https://www.techinventive.com/img/nasscom.png" },
  { id: 2, title:"Drupal development services", img: "https://www.techinventive.com/img/01-primary-blue-docker-logo%201.png" },
  { id: 3, title:"web development service in Delhi", img: "https://www.techinventive.com/img/Asset%204%201.png" },
  { id: 4, title:"app development company in Delhi NCRa", img: "https://www.techinventive.com/img/Group%201.png" },
  { id: 5, title:"Top App Development Company in Noida India", img: "https://www.techinventive.com/img/IBM%201.png" },
  { id: 6, title:"mobile app development company Delhi",img: "https://www.techinventive.com/img/aws.png" }
];
const TrustedLogosSlider: React.FC = () => {
  

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1008, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, centerMode: false } }
    ]
  };

  return (

      <Slider {...sliderSettings} className="slider2">
        {logos.map((url, id) => (
          <div key={id} className="px-4">
            <img src={url.img} alt={url.title} className="w-40 h-auto" />
          </div>
        ))}
      </Slider>
  );
};

export default TrustedLogosSlider;
