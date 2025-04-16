import React, { useEffect, useState, useRef } from "react";
import "animate.css";

interface CounterProps {
  start: number;
  end: number;
  duration: number;
}

const Counter: React.FC<CounterProps> = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(start + progress * (end - start)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startTime = null;
            animationFrame = requestAnimationFrame(updateCounter);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(ref.current);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (observer) observer.disconnect();

    };
  }, 
  [start, end, duration]);

  return <span ref={ref}>{count}</span>;
};


const CounterSection = () => {

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
        <div id="counter" className="achiement-section" ref={sectionRef}>
            <div className="container mx-auto text-center">
                <h2
                  className={` ${
                    isVisible
                      ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                      : "opacity-0"
                  }`}
                >About US</h2>
                <p 
                  className={` heading-text ${
                    isVisible
                      ? "opacity-100 animate__animated animate__fadeInRight animate__slow"
                      : "opacity-0"
                  }`}>
                  Innovative Software Solutions Tailored to Your Business Needs.
                  </p>
                  <div  className={` row ${
                        isVisible
                          ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                          : "opacity-0"
                      }`}
                  >
                      <div className="col-md-4">
                          <div  className="box-ach-2">
                              <h5 className="count percent"><Counter start={0} end={50} duration={2000} /></h5>
                              <p>countries</p>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div  className="box-ach-2">
                              <h5 className="count percent"><Counter start={0} end={100000} duration={2000} /></h5>
                              <p>working hours</p>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div  className="box-ach-2">
                              <h5 className="count percent"><Counter start={0} end={500} duration={2000} /></h5>
                              <p>Live projects</p>
                          </div>
                      </div>
                </div>
                <div className="row box-ach">
                    <div className="col-md-6 d-flex align-items-center order-smd-1">
                      <div 
                           className={` w-100 ${
                            isVisible
                              ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                              : "opacity-0"
                          }`}>
                        <p className="achive-text">
                            Techinventive Software is a premier provider of web designing, web development, responsive web designing, and app designing services. With a focus on innovation and customer satisfaction, we strive to deliver cutting-edge solutions that exceed expectations.
                        </p>
                        <p className="achive-text">
                            At Techinventive Software, we understand the importance of a strong online presence in today's digital world. We work closely with our clients to provide tailored solutions that meet their needs.
                        </p>
                        <p className="achive-text">
                            Our commitment to excellence and customer satisfaction sets us apart. We take pride in our work and are passionate about helping our clients succeed.
                        </p>
                        <p className="achive-text">
                          <a href="about-us" className="">View more <img alt="Responsive Website Design Company in Delhi NCR" src="https://www.techinventive.com/img/lucide_move-right.png"/></a>
                          </p>
                        
                      </div>
                    </div>
                    <div 
                        className={` col-md-6 ${
                          isVisible
                            ? "opacity-100 animate__animated animate__fadeInRight animate__slower"
                            : "opacity-0"
                        }`}>
                        <img src="https://www.techinventive.com/img/7f3fddff1de1556bba6e8ae55707a1dd.jpg" alt="Responsive Website Design" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterSection;
