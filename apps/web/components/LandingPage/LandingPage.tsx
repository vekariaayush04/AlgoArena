import React from "react";
import NavBar from "./../NavBar";
import Hero from "./Hero";
import Footer from "./../Footer";

const LandingPage = () => {
  return (
    <>
      <NavBar status="LoggedOut"/>
      <Hero />
      <Footer />
    </>
  );
};

export default LandingPage;
