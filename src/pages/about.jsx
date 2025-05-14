import { useEffect } from "react";
import dynamic from "next/dynamic";
import Layouts from "@layouts/Layouts";

import { getSortedTeamData } from "@library/team";
import { getSortedServicesData } from "@library/services";

import CountUp from 'react-countup';
import { circleText } from "@common/utilits";

import PageBanner from "@components/PageBanner";
import Team2Section from "@components/sections/Team2"
import PartnersSection from "@components/sections/Partners"
import AwardsSection from "@components/sections/Awards"
import Services4Section from "@components/sections/Services4"

const HistorySlider = dynamic( () => import("@components/sliders/History"), { ssr: false } );
const Testimonial2Slider = dynamic( () => import("@components/sliders/Testimonial2"), { ssr: false } );

const About = (props) => {
  useEffect(() => {
    circleText();
  }, []);

  const clickedVideoButton = (e) => {
    e.preventDefault();

    e.target.parentNode.classList.add('active');
    let videoIframe = e.target.parentNode.querySelector('.js-video-iframe');
    let videoUrl = videoIframe.dataset.src;
    videoIframe.setAttribute('src', videoUrl);
  }

  return (
    <Layouts>
    	<PageBanner pageTitle={"About Us"} pageDesc={"Creative studio at the intersection of art, designand technology."} />
      
      	{/* Onovo About */}
	  	<section className="onovo-section gap-top-140 gap-bottom-140">
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">

						{/* Heading */}
						<div className="onovo-heading gap-bottom-60">
							<div className="onovo-subtitle-1">
								<span> Welcome to Ahaz IO </span>
							</div>
							<h2 className="onovo-title-2">
								<span> We are a tech-driven company, <br/> passionate about crafting innovative solutions <br/>and shaping the future of digital experiences.</span>
							</h2>
							<div className="onovo-text">
								<p>At Ahaz, we specialize in delivering innovative digital solutions that transform businesses and drive success. With a focus on Desktop/Web Applications, Website Development, and AI/ML services, we provide cutting-edge technologies <strong>that enhance user experiences and foster growth.</strong></p>
							</div>
						</div>

					</div>
					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 offset-lg-1 hide-on-mobile">

						{/* Image */}
						<img src="/images/AS I Logo Variations-05.png" alt="" />

					</div>
				</div>

				{/* Numbers items */}
				<div className="row gap-row gap-bottom-100">

					{/*number-item*/}
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
						<div className="onovo-counter">
							<div className="num onovo-text-white js-counter" data-end-value="23">
								<CountUp end="8" duration={7} enableScrollSpy={true} scrollSpyOnce={true} />
							</div>
							<div className="num-after onovo-text-white"> + </div>
							<div className="label"> Team members </div>
						</div>
					</div>

					{/*number-item*/}
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
						<div className="onovo-counter">
							<div className="num onovo-text-white js-counter" data-end-value="99">
								<CountUp end="20" duration={7} enableScrollSpy={true} scrollSpyOnce={true} />
							</div>
							<div className="num-after onovo-text-white"> + </div>
							<div className="label"> Completed projects </div>
						</div>
					</div>

					{/*number-item*/}
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
						<div className="onovo-counter">
							<div className="num onovo-text-white js-counter" data-end-value="12">
								<CountUp end="52" duration={7} enableScrollSpy={true} scrollSpyOnce={true} />
							</div>
							<div className="num-after onovo-text-white"> K </div>
							<div className="label"> Hours of Expertise </div>
						</div>
					</div>

				</div>

				{/* Video */}
				{/* <div className="onovo-video" data-onovo-overlay data-onovo-scroll>
					<div className="image" onClick={ (e) => clickedVideoButton(e) } style={{"backgroundImage": "url(/images/hero-digital-1.jpg)"}} />
					<iframe className="js-video-iframe" data-src="https://www.youtube.com/embed/Gu6z6kIukgg?showinfo=0&rel=0&autoplay=1"></iframe>
					<div className="play onovo-circle-text" onClick={ (e) => clickedVideoButton(e) }>
						<div className="arrow" />
						<div className="label onovo-text-black onovo-circle-text-label"> Play Video - Play Video - Play Video - </div>
					</div>
				</div> */}

				{/* Description */}
				<div className="row gap-top-100">
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
						<h5 className="text-uppercase">Our Mission</h5>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
					Since our inception, we've been dedicated to empowering businesses with innovative digital solutions
					</div>
				</div>

				{/* Description */}
				<div className="row gap-top-60">
					<div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
						<h5 className="text-uppercase">Our Goal</h5>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
					Our goal is to create impactful experiences that inspire conversation and drive strategic value across industries like tech, entertainment, and beyond.
					</div>
				</div>

				{/* Gallery */}
				{/* <div className="row gap-top-100">
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<a href="/images/posts1.jpg" className="mfp-image">
							<img src="/images/posts1-1024x683.jpg" alt="" />
						</a>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 gap-top-60">
						<a href="/images/posts2.jpg" className="mfp-image">
							<img src="/images/posts2-1024x683.jpg" alt="" />
						</a>
					</div>
				</div> */}

			</div>
		</section>

		<Services4Section services={props.services} />

		{/* <AwardsSection /> */}

      	<HistorySlider />

      	<Team2Section team={props.team} />

      	<Testimonial2Slider />

      	<PartnersSection />
      
    </Layouts>
  );
};
export default About;

export async function getStaticProps() {
  const allTeam = getSortedTeamData();
  const allServices = getSortedServicesData();

  return {
    props: {
      team: allTeam,
	  services: allServices
    }
  }
}