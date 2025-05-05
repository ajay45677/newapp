import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import BASE_URL from "../../Config";

const teamMembers = [
  { name: "Diksha", role: "HR Manager", img: "https://www.techinventive.com/team/HR.jpg" },
  { name: "Surender", role: "Account Manager / Sr. Developer", img: "https://www.techinventive.com/team/surender.png" },
  { name: "Saurabh", role: "Team Leader", img: "https://www.techinventive.com/team/saurabh-panchal.jpg" },
  { name: "Nitin", role: "Sr. Developer", img: "https://www.techinventive.com/team/nitin.jpeg" },
  { name: "Yogendra", role: "UI/UX Designer", img: "https://www.techinventive.com/team/yogendra-patel.png" },
];


const NewTeamSlider: React.FC = () => {
  const settings = {
    dots: false,
      arrows: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      vertical: false,
      centerPadding: '200px',
      responsive: [{
          breakpoint: 1200,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
          },
      }, {
          breakpoint: 1008,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          },
      }, {
          breakpoint: 600,
          settings: {
              rows: 2,
              centerMode: false,
              slidesToShow: 2,
              slidesToScroll: 2,
              centerPadding: '0px',
          },
      }, ],
  };
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/jsonapi/node/our_team`,
          {
            headers: { "Accept": "application/vnd.api+json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setTeams(response.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch teams. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);



  if (loading) {
    return <p>Loading teams...</p>;
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!Array.isArray(teams) || teams.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>No Teams Found</h2>
        <p>Please check back later.</p>
      </div>
    );
  }
  return (
    <div className="value-section bg-white h-auto ps-0 pe-0" >
      <div className="w-100">
          {teams.map((team) =>
            team.attributes ? (
              <React.Fragment key={team.id}>
                <h2>{team.attributes.title}</h2>
                <p className="heading-text">{team.attributes.field_short_descri}</p>
              </React.Fragment>
            ) : null
          )}
        <div>
        <Slider {...settings} className="slider1">
            {teamMembers.map((member, index) => (
              <div key={index} className="mb-0nly">
                <div className="team-box">
                  <img alt={member.name} src={member.img} />
                  <div className="team-more">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>  
        <a href="about-us"  className="see-more-blue">
          See all <img alt="See more" src="https://www.techinventive.com/img/lucide_move-right-blue.png" />
        </a>
      </div>
    </div>
  );
};

export default NewTeamSlider;
