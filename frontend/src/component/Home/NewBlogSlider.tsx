import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BlogItem {
  id: string;
  title: string;
  imageUrl?: string;
}

const BlogSlider: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl =
      'https://corsproxy.io/?' +
      encodeURIComponent(
        'https://8d7c-2401-4900-1c64-55ed-3e00-5870-3ca5-6fe7.ngrok-free.app/jsonapi/node/popular_blogs'
      );

    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Error ${res.status}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        const blogList: BlogItem[] = data.data.map((item: any) => ({
          id: item.id,
          title: item.attributes.title,
          imageUrl: item.attributes.field_image?.url
            ? `https://8d7c-2401-4900-1c64-55ed-3e00-5870-3ca5-6fe7.ngrok-free.app${item.attributes.field_image.url}`
            : '',
        }));
        setBlogs(blogList);
        setError(null);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to load blogs.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '40px' }}>
      <h2>Popular Blogs</h2>
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ padding: '10px' }}>
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            )}
            <h4 style={{ marginTop: '10px' }}>{blog.title}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;
