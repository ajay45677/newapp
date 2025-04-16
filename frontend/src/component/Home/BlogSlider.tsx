import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";

const blogPosts = [
  {
    date: "MAY 03, 2024",
    title: "Your Trusted Drupal Partner in India",
    description: "When it comes to building robust, scalable, and highly customizable websites",
    tag: "Trusted Partner",
    link: "https://www.techinventive.com/blogs/trusted-drupal-partner"
  },
  {
    date: "JUN 12, 2024",
    title: "Leading AI Development",
    description: "In the dynamic landscape of AI development",
    tag: "AI Development Services",
    link: "https://www.techinventive.com/blogs/leading-ai-development-services"
  },
  {
    date: "June 19, 2024",
    title: "Elevate Your Business",
    description: "In today's rapidly evolving digital landscape, artificial intelligence (AI) is not just a buzzword",
    tag: "AI",
    link: "https://www.techinventive.com/blogs/how-to-elevate-your-business-with-ai-consulting-services"
  },
  {
    date: "April 24, 2024",
    title: "Drupal Revolution",
    description: "Explore the Latest Updates Shaping the Future of Web Development",
    tag: "Drupal",
    link: "/blogs/drupal-development"
  },
  {
    date: "May 27, 2024",
    title: "Python Service",
    description: "In today's fast-paced digital landscape, businesses must leverage cutting-edge technologies to stay ahead of the curve.",
    tag: "PYTHON",
    link: "https://www.techinventive.com/blogs/how-python-services-can-transform-your-business-operations"
  }
];

const BlogSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1008,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {}, // FIX: 'unslick' should be replaced with an empty object
      },
    ],
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="ceo-section-3 h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="container container-custom">
        <h2
           className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__flipInX animate__slower"
              : "opacity-0"
          }`}
        >Popular Blogs</h2>
        <p 
          className={`heading-text ${
            isVisible
              ? "opacity-100 animate__animated animate__slideInRight animate__slower"
              : "opacity-0"
          }`}
        >Insights, Trends, and Tips: Explore Our Popular Blog</p>
        <div  
          className={` ${
            isVisible
              ? "opacity-100 animate__animated animate__zoomIn animate__slower"
              : "opacity-0"
          }`}
        >
            <Slider {...settings} className="slider6">
              {blogPosts.map((post, index) => (
                <div key={index} className="col-md-4">
                  <a className="card" href={post.link}>
                    <div className="card-content">
                      <div className="date">{post.date}</div>
                      <h1>{post.title}</h1>
                      <p>{post.description}</p>
                      <div className="tags">
                        <div className="tag">{post.tag}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
        </div>     
        <a href="/blog"
           className={`see-more-blue ${
            isVisible
              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
              : "opacity-0"
          }`}
        >
          See all <img alt="Drupal development services" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
        </a>
      </div>
    </div>
  );
};

export default BlogSlider;
