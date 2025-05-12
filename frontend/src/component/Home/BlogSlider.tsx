import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
  const [typedTitle, setTypedTitle] = useState('');
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const fullTitle = 'Popular Blogs';
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
  

  // Typing effect
  useEffect(() => {
      let current = 0;
      const delay = 2000; // Delay before typing starts
    
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setTypedTitle(fullTitle.slice(0, current + 1));
          current++;
          if (current === fullTitle.length) {
            clearInterval(interval);
          }
        }, 100); // Adjust speed as needed
      }, delay);
    
      return () => {
        clearTimeout(timer);
      };
  }, []);
  
  // Animate slider wrapper immediately after render (no scroll trigger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-slide",
        { autoAlpha: 0, y: 30, stagger: 6 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Animate subtitle & paragraph
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, x: -50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
            },
          }
        );
      }
      
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="ceo-section-3 h-auto ps-0 pe-0" ref={sectionRef}>
      <div className="container container-custom">
        <h2>{typedTitle}</h2>
        <p className="heading-text" ref={subtitleRef}>Insights, Trends, and Tips: Explore Our Popular Blog</p>
        <div ref={wrapperRef}>
            <Slider {...settings} className="slider6">
              {blogPosts.map((post, index) => (
                <div key={index} className="col-md-4 blog-slide">
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
        <div ref={buttonRef}>
          <a href="/blog" className="see-more-blue">
            See all <img alt="Drupal development services" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
          </a>
        </div> 
      </div>
    </div>
  );
};

export default BlogSlider;
