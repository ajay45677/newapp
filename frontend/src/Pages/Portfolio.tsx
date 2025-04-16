import React from "react";
import PortfolioSection from "../component/Portfolio/PortfolioSection";
import PortfolioMain from "../component/Portfolio/PortfolioMain";
import ExpertCallForm from "../component/ExpertCallForm";

const Portfolio: React.FC = () => {
  

  return (
    <div>
        <PortfolioSection />
        <PortfolioMain />
        <ExpertCallForm />
    </div>
    
  );
};

export default Portfolio;