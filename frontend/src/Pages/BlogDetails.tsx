import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import ExpertCallForm from "../component/ExpertCallForm";

interface SectionType {
  heading: string;
  content: string;
  list?: string[]; // ✅ Optional array of strings
}

interface BlogType {
  id: number;
  title: string;
  date: string;
  description: string;
  category: string;
  link: string;
  image?: string;
  imageLarge?: string;
  tags?: string[];
  article: {
    introduction: string;
    sections: SectionType[];
  };
}

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get blog ID from URL
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]); // ✅ Fixed state type

  useEffect(() => {
    // Fetch current blog
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error("Error fetching blog:", err));

    // Fetch related blogs
    fetch(`http://localhost:5000/api/blogs/related/${id}`)
      .then((res) => res.json()) // ✅ Fixed `.json()`
      .then((data) => setRelatedBlogs(data))
      .catch((err) => console.error("Error fetching related blogs:", err));
  }, [id]);

  if (!blog) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

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

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-sec">
        <div className="container container-custom">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/blog">Blogs</a></li>
              <li className="breadcrumb-item active">{blog.title}</li>
            </ol>
          </nav>
        </div>
      </div>  

      {/* Blog Details */}
      <div className="blog-details revolutionizing-details">
        <div className="container container-custom">
          <div className="row blog-listing">
            <div className="col-md-12">
              <div className="card">
                {blog.imageLarge && <img src={blog.imageLarge} alt={blog.title} className="" />}
                <div className="card-content">
                  <div className="date">{blog.date}</div>
                  <h1>{blog.title}</h1>
                  <p>{blog.description}</p>
                  <div className="tags">
                    {blog.tags?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="row detail-content">
              <p>{blog.article?.introduction}</p>
              {blog.article?.sections.map((section, index) => (
                <div key={index}>
                  <h3>{section.heading}</h3>
                  <p>{section.content}</p>
                  
                  {/* ✅ Render List (if available) */}
                  {section.list && section.list.length > 0 && (
                    <ul className="">
                      {section.list.map((item, i) => (
                        <li key={i} className="">{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>    
      </div>

      {/* Related Blogs Section */}
      <div className="ceo-section-3 h-auto blog-listing">
        <div className="container container-custom">
          <h2 className="mt-text-start mb-4">Related Blogs</h2>
          <div className="row blog-page">
            {relatedBlogs.map((related) => (
              <div key={related.id} className="col-md-4 drupal-revolution">
                <Link to={`/blog/${generateSlug(related.title)}`} className="card">
                   {related.image && <img src={related.image} alt={related.title} className="" />}
                    <div className="card-content">
                        <div className="date">{related.date}</div>
                        <h3>{related.title}</h3>
                        <p>{related.description}</p>
                        <div className="tags"><div className="tag">Read More</div></div>
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

export default BlogDetails;
