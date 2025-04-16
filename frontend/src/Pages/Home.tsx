import React from "react";
import ValueSection from '../component/Home/ValueSection';
import CounterSection from "../component/Home/CounterSection";
import PortfolioSlider from "../component/Home/PortfolioSlider";
import ExpertCallForm from "../component/ExpertCallForm";
import OurServices from "../component/Home/OurServices";
import TeamSlider from "../component/Home/TeamSlider";
import BlogSlider from "../component/Home/BlogSlider";
import NewBlogSlider from "../component/Home/NewBlogSlider";

const Home: React.FC = () => {
    const sections = [
        <ValueSection />,
        <CounterSection />,
        <OurServices />,
        <PortfolioSlider />,
        <TeamSlider />,
        <BlogSlider />,
        <NewBlogSlider />,
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
