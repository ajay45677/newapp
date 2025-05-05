import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpertCallForm from "../component/ExpertCallForm";

interface SectionType {
  heading: string;
  content: string;
  list?: string[];
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
  const { id } = useParams<{ id: string }>(); // slug from URL
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Static Mocky endpoint with all blogs
    const BLOG_API_URL = "https://run.mocky.io/v3/1e438399-8506-488e-8bd8-c5ad9f2a4eed";

    fetch(BLOG_API_URL)
      .then((res) => res.json())
      .then((data: BlogType[]) => {
        const foundBlog = data.find((item) => generateSlug(item.title) === id);
        setBlog(foundBlog || null);

        // Get related blogs (exclude the current one)
        const related = data.filter((item) => generateSlug(item.title) !== id).slice(0, 3);
        setRelatedBlogs(related);
      })
      .catch((err) => console.error("Error fetching blog data:", err));
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

      {/* Breadcrumb */}
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
                {blog.imageLarge && <img src={blog.imageLarge} alt={blog.title} />}
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

            {/* Article */}
            <div className="row detail-content">
              <p>{blog.article?.introduction}</p>
              {blog.article?.sections.map((section, index) => (
                <div key={index}>
                  <h3>{section.heading}</h3>
                  <p>{section.content}</p>
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs */}
      <div className="ceo-section-3 h-auto blog-listing">
        <div className="container container-custom">
          <h2 className="mt-text-start mb-4">Related Blogs</h2>
          <div className="row blog-page">
            {relatedBlogs.map((related) => (
              <div key={related.id} className="col-md-4 drupal-revolution">
                <Link to={`/blog/${generateSlug(related.title)}`} className="card">
                  {related.image && <img src={related.image} alt={related.title} />}
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
