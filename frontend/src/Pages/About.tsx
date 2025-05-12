import React, {  } from "react";
import ValuesSection from "../component/About/ValuesSection";
import AboutCounterSection from "../component/About/AboutCounterSection";
import ApartSection from "../component/About/ApartSection";
import AboutTeam from "../component/About/AboutTeam";
import ExpertCallForm from "../component/ExpertCallForm";
import { Helmet } from "react-helmet";

const About: React.FC = () => {
  

  return (
    <div>
      <Helmet>
        <title>Home | My Website</title>
        <meta name="description" content="Welcome to our homepage." />
      </Helmet>
      <ValuesSection />
      <AboutCounterSection />
      <ApartSection />
      <AboutTeam />
      <ExpertCallForm />
     </div>

  );
};

export default About;