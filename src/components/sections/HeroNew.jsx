import { useState, useEffect, useRef } from "react";

import Data from "@data/sections/hero.json";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import ScrollOut from "scroll-out";
import Link from "next/link";

const HeroSectionNew = () => {
  const socials = [
    {
      link: "https://www.linkedin.com/company/ahaz-tech-solutions/",
      image: "/images/icons/LinkedIn.png",

      title: "LinkedIn",
    },
    // {
    //   link: "https://www.g2.com/users/ahazio",
    //   image: "/images/icons/G2Logo-Black-Photoroom.png",
    //   title: "G2",
    // },
    {
      link: "https://dev.to/ahaz",
      image: "/images/icons/Dev.png",
      title: "DEV Community",
    },
  ];
  return (
    <>
      <div className="sm-lp-container sm-lp-centered">
        <main className="sm-lp-hero sm-lp-size">
          <div className="sm-lp-hero-content pt-5">
            {/* <hr className="sm-lp-accent-line" /> */}
            <h1 className="sm-lp-title mt-5">
              {/* We Build Custom Software & Websites Built to Perform. */}

              Custom Software & Web Development in Ethiopia
            </h1>
            <h2 className="sm-lp-subtitle" style={{ fontSize: "1.4rem", fontWeight: 500, marginBottom: "1rem" ,color: "white"}}>
  Scalable Digital Solutions Built for Ethiopian Businesses
            </h2>

           <p className="sm-lp-description">
 Ahaz is a custom software development company in Ethiopia providing professional web development services that help businesses
  build scalable digital solutions. Our expertise includes high‑performance websites, robust desktop applications, advanced CRM 
  systems, and AI‑driven platforms designed for efficiency and growth. We combine cutting‑edge technology with exceptional user 
  experience design to deliver reliable, efficient, and growth‑focused software tailored to your business goals, ensuring every
   project maximizes performance, usability, SEO visibility, and long‑term value for our clients.
</p>


            <div className="sm-lp-socials">
              {socials.map((item, key) => (
                <Link className="sm-lp-socials-icon" href={item.link}>
                  <img src={item.image} alt={item.title} />
                </Link>
              ))}
            </div>
           

            {/* <button className="sm-lp-cta-button">Get Started</button> */}

            {/* <Link className="ahaz-btn ahaz-hover-btn btn--active" href="/projects">
                <span>See Our Projects</span>
            </Link> */}
          </div>
        </main>
      </div>
    </>
  );
};

export default HeroSectionNew;
