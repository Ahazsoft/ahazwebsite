import { useState, useEffect, useRef } from "react";

import Data from "@data/sections/hero.json";

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import ScrollOut from "scroll-out";
import Link from "next/link";

const HeroSectionNew = () => {

  return (
    <>
      <div className="sm-lp-container sm-lp-centered">
        <main className="sm-lp-hero sm-lp-size">
            <div className="sm-lp-hero-content">
            {/* <hr className="sm-lp-accent-line" /> */}
            <h1 className="sm-lp-title">
                We Build Custom Software & Websites Built to Perform.
            </h1>
            <p className="sm-lp-description">
                At Ahaz, we create innovative digital solutions that seamlessly 
                combine cutting-edge technology with exceptional user experiences. 
                Our team brings ideas to life through responsive websites, 
                robust desktop applications, and AI-driven platforms tailored to your unique business goals. 
            </p>
            {/* <button className="sm-lp-cta-button">Get Started</button> */}


            {/* <Link className="onovo-btn onovo-hover-btn btn--active" href="/projects">
                <span>See Our Projects</span>
            </Link> */}
            </div>
        </main>
    </div>

    </>
  );
};

export default HeroSectionNew;
