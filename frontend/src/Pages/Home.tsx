import React from "react";
import ValueSection from '../component/Home/ValueSection';
import CounterSection from "../component/Home/CounterSection";
import PortfolioSlider from "../component/Home/PortfolioSlider";
import ExpertCallForm from "../component/ExpertCallForm";
import OurServices from "../component/Home/OurServices";
import TeamSlider from "../component/Home/TeamSlider";
import BlogSlider from "../component/Home/BlogSlider";
//import NewBlogSlider from "../component/Home/NewBlogSlider";
//import NewTeamSlider from "../component/Home/NewTeamSlider";
//import AnimatedSection from "../component/Home/AnimatedSection";

const Home: React.FC = () => {
    const sections = [
        //<AnimatedSection />,
        <CounterSection />,
        <ValueSection />,
        <OurServices />,
        <PortfolioSlider />,
        //<NewTeamSlider />,
        <TeamSlider />,
        <BlogSlider />,
        //<NewBlogSlider />,
        <ExpertCallForm />
        
    ];

    return (
        <div>
            {sections.map((Component, index) => (
                <div key={index}>
                    {Component}
                </div>
            ))}
        </div>
    );
};

export default Home;
