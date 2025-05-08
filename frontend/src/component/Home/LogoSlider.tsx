import React, {  } from "react";
import TrustedLogosSlider from "./TrustedLogosSlider";

const LogoSlider: React.FC = () => {
  

  return (
    <>
      {/* Title coming from API */}
        <h2>
          Trusted by some of the best in the industry
        </h2>

      {/* Logo slider */}
      <TrustedLogosSlider />
    </>
  );
};

export default LogoSlider;
