import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ExpertCallForm from "../component/ExpertCallForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "animate.css";

gsap.registerPlugin(ScrollTrigger);

interface BlogType {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  link: string;
  image?: string;
  tags?: string[];
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const blogCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/1e438399-8506-488e-8bd8-c5ad9f2a4eed")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  useEffect(() => {
    if (!blogs.length) return;

    const ctx = gsap.context(() => {
      // Animate breadcrumb section
      if (breadcrumbRef.current) {
        gsap.fromTo(
          breadcrumbRef.current,
          { autoAlpha: 0, y: -20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: breadcrumbRef.current,
              start: "top 90%",
            },
          }
        );
      }

      // Animate blog cards
      blogCardRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 95%",
              },
            }
          );
        }
      });

      
    }, sectionRef);

    return () => ctx.revert();
  }, [blogs]);

  return (
    <div ref={sectionRef}>
      {/* Social Media Icons */}
      <div className="fixed-icon">
        {[
          { link: "https://www.linkedin.com/company/techinventive/", icon: "fa-linkedin", text: "Linkedin" },
          { link: "https://www.facebook.com/techinventive", icon: "fa-facebook-f", text: "Facebook" },
          { link: "https://twitter.com/MTechinven40832", icon: "fa-twitter", text: "Twitter" },
          { link: "https://www.instagram.com/techinventivesoftware/", icon: "fa-instagram", text: "Instagram" },
        ].map((item, index) => (
          <div
            key={index}
            className={`imgborder ${hoveredIndex === index ? "show-text" : ""}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href={item.link} rel="noreferrer" target="_blank">
              <i className={`fa-brands ${item.icon}`}></i>
              <span className={`social-text ${hoveredIndex === index ? "visible" : ""}`}>
                {item.text}
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Blog Section */}
      <div className="ceo-section-3 h-auto pt-0 blog-listing">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-5 mt-4" ref={breadcrumbRef}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Blog</li>
            </ol>
          </nav>

          {/* Blog Cards Grid */}
          <div className="row blog-page">
            {blogs.map((blog) => (
              <div key={blog.id} className="col-md-4" 
                  ref={(el) => {
                        blogCardRefs.current[blog.id] = el;
                  }}
                >
                <Link
                  to={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="card"
                >
                  {blog.image && <img src={blog.image} alt={blog.title} />}
                  <div className="card-content">
                    <div className="date">{blog.date}</div>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                    <div className="tags">
                      {blog.tags?.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expert Call Form */}
      <ExpertCallForm />
    </div>
  );
};

export default Blog;
