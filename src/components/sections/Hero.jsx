import { useState, useEffect, useRef } from "react";

import Data from "@data/sections/hero.json";

import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';

const HeroSection = () => {
	const videoRef = useRef(null);
	const [mute, setMute] = useState(false);
	const [fading, setFading] = useState(false);


	// Mute toggle
	const clickedMuteHeroVideo = (e) => {
		e.preventDefault();
		setMute(!mute);
	};

	useEffect(() => {
		// Splitting & ScrollOut init
		Splitting({ by: 'lines' });
		ScrollOut({ targets: '[data-onovo-scroll]', once: true });

		// Wrap .word elements
		const allWrap = document.querySelectorAll(".word");
		allWrap.forEach((item) => {
			if (!item.parentNode.classList.contains('span')) {
				let wrapper = document.createElement('span');
				wrapper.classList.add('span');
				item.parentNode.insertBefore(wrapper, item);
				wrapper.appendChild(item);
			}
		});

		// Add overlays
		const allOverlays = document.querySelectorAll("[data-onovo-overlay]");
		allOverlays.forEach((item) => {
			let overlay = document.createElement("div");
			overlay.classList.add('onovo-overlay');
			item.appendChild(overlay);
		});
	}, []);

	// Custom loop: play video from 5s to 10s
	useEffect(() => {
		const video = videoRef.current;
		const startTime = 2;
		const endTime = 12.5;
		const fadeDuration = 10;
	  
		const loopSegment = () => {
		  if (video.currentTime >= endTime - 0.1) {
			setFading(true);
			setTimeout(() => {
			  video.currentTime = startTime;
			  video.play();
			  setFading(false);
			}, fadeDuration);
		  }
		};
	  
		if (video) {
		  video.currentTime = startTime;
		  video.play();
		  video.addEventListener('timeupdate', loopSegment);
		}
	  
		return () => {
		  if (video) {
			video.removeEventListener('timeupdate', loopSegment);
		  }
		};
	  }, []);
	  
	return (
		<>
			{/* Onovo Hero */}
			<section className="onovo-section onovo-hero">
				<div className="image" onClick={clickedMuteHeroVideo}>
					<video
						ref={videoRef}
						autoPlay
						muted={!mute}
						playsInline
						id="heroVideo"
						className={fading ? 'fade' : ''}

					>
						<source src={Data.video} type="video/mp4" />
					</video>
					<div className="ovrl" style={{"opacity": "0.55"}} />
				</div>
				<div className="container">
					<h1 className="title onovo-text-white">
						<span data-splitting data-onovo-scroll>
                            <span dangerouslySetInnerHTML={{__html: Data.title.text}} />
                            <span className="onovo-sep word">
								<i className="sep-img" style={{"backgroundImage": "url("+Data.title.icon+")"}} />
							</span>
						</span>
					</h1>
					<div className="text">
						<div className="subtitle onovo-text-white">
							<div data-splitting data-onovo-scroll>
                                <div dangerouslySetInnerHTML={{__html: Data.subtitle}} />
                            </div>
						</div>
					</div>
					<a href="#" className={mute ? "onovo-play-btn active" : "onovo-play-btn"} onClick={(e) => clickedMuteHeroVideo(e) }>
						<span className="play-circles" />
						<span className="play-lines">
							<span />
							<span />
							<span />
							<span />
						</span>
					</a>
				</div>
			</section>
        </>
    );
};

export default HeroSection;