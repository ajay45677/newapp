import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BASE_URL from "../../Config";

const NewBlogSlider: React.FC = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1008, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 800, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // not empty
    ],
  };

  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/jsonapi/node/popular_blogs`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setBlogs(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!Array.isArray(blogs) || blogs.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>No Blogs Found</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="ceo-section-3 h-auto ps-0 pe-0" >
      <div className="container container-custom">
        <h2>
          Popular Blogs
        </h2>
        <p className="heading-text"
        >
          Insights, Trends, and Tips: Explore Our Popular Blog
        </p>
        <div>
          <Slider {...settings} className="slider6">
            {blogs.map((blog) =>
              blog.attributes ? (
                <div key={blog.id} className="col-md-4">
                  <a className="card" href={`/blog/${blog.attributes.title}`}>
                    <div className="card-content">
                      <div className="date">
                       {blog.attributes.created &&
                          new Date(blog.attributes.created).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                      </div>
                      <h1>{blog.attributes.title}</h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog.attributes.field_blog_description?.processed || "",
                        }}
                      />
                      <div className="tags">
                        <div className="tag">{blog.attributes.field_short_title}</div>
                      </div>
                    </div>
                  </a>
                </div>
              ) : null
            )}
          </Slider>
        </div>
        <a href="/blog" className="see-more-blue" >
          See all <img alt="Drupal development services" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
        </a>
      </div>
    </div>
  );
};

export default NewBlogSlider;
