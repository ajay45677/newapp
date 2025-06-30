import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./component/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import Portfolio from "./Pages/Portfolio";
import Header from "./component/Header";
import HomeHeader from "./component/HomeHeader";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/BlogDetails";
import Services from "./Pages/Services";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/TermsConditions";
import NotFound from "./Pages/NotFound";
import ServiceDetails from "./Pages/ServiceDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.scss";
import "./responsive.scss";
import ScrollToTop from './component/ScrollToTop';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Show HomeHeader only on "/" route, otherwise show normal Header */}
      {location.pathname === "/" ? <HomeHeader /> : <Header />}
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/services/:title" element={<ServiceDetails />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      
      <Footer />
    </>
  );
};

export default App;
