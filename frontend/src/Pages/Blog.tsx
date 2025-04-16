import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ExpertCallForm from "../component/ExpertCallForm";
import "animate.css";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Track which icon is hovered

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

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
    <div>
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
      <div className="ceo-section-3 h-auto pt-0 blog-listing"  ref={sectionRef}>
        <div className="container">
          <nav aria-label="breadcrumb" 
             className={`breadcrumb-nav mb-5 mt-4 ${
              isVisible
                ? "opacity-100 animate__animated animate__fadeInLeft animate__fast"
                : "opacity-0"
            }`}
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Blog</li>
            </ol>
          </nav>

          {/* Grid layout for blog cards */}
          <div 
              className={`row blog-page ${
                isVisible
                  ? "opacity-100 animate__animated animate__fadeInLeft animate__slower"
                  : "opacity-0"
              }`}
          >
            {blogs.map((blog) => (
              <div key={blog.id} className="col-md-4">
                <Link to={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`} key={blog.id}  className="card">
                  {blog.image && <img src={blog.image} alt={blog.title} className="" />}
                  {/* Overlay */}
                  <div className="card-content">
                    <div className="date">{blog.date}</div>
                    <h3 className="">{blog.title}</h3>
                    <p className="">{blog.description}</p>
                    <div className="tags">
                      {blog.tags?.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
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
