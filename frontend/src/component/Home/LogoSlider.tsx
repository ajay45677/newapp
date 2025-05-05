import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../Config";
import TrustedLogosSlider from "./TrustedLogosSlider";

const LogoSlider: React.FC = () => {
  const [logos, setLogos] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/jsonapi/node/trusted_companies_logos`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );
        console.log(response.data);

        const fetchedData = response.data?.data || [];
        setLogos(fetchedData);

        // Assuming you want the title from the first item
        if (fetchedData.length > 0) {
          setTitle(fetchedData[0]?.attributes?.title || "");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load logos.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  if (loading) return <p>Loading logos...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  if (!Array.isArray(logos) || logos.length === 0) {
    return <p>No trusted companies found.</p>;
  }

  return (
    <>
      {/* Title coming from API */}
      {title && (
        <h2>
          {title}
        </h2>
      )}

      {/* Logo slider */}
      <TrustedLogosSlider />
    </>
  );
};

export default LogoSlider;
