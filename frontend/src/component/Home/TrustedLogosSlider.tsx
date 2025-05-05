import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import BASE_URL from '../../Config';

const TrustedLogosSlider: React.FC = () => {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/jsonapi/node/trusted_companies_logos/383ca1d9-0074-476a-8128-b376fc1264c3/field_companies_logos`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );

        const files = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
        const urls = files.map((file: any) =>
          `https://c2a9-2401-4900-1c64-4ad2-a9d9-4ba5-b25b-99d6.ngrok-free.app${file.attributes.uri.url}`
        );

        setLogos(urls);
      } catch (error) {
        console.error('Error fetching logos:', error);
      }
    };

    fetchLogos();
  }, []);

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
        {logos.map((url, index) => (
          <div key={index} className="px-4">
            <img src={url} alt={`Logo ${index + 1}`} className="w-40 h-auto" />
          </div>
        ))}
      </Slider>
  );
};

export default TrustedLogosSlider;
