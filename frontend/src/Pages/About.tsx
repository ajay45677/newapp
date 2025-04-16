import React, {  } from "react";
import ValuesSection from "../component/About/ValuesSection";
import AboutCounterSection from "../component/About/AboutCounterSection";
import ApartSection from "../component/About/ApartSection";
import AboutTeam from "../component/About/AboutTeam";
import ExpertCallForm from "../component/ExpertCallForm";

const About: React.FC = () => {
  

  return (
    <div>
      <ValuesSection />
      <AboutCounterSection />
      <ApartSection />
      <AboutTeam />
      <ExpertCallForm />
     </div>

  );
};

export default About;