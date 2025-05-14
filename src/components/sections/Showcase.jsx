import Data from "@data/sections/showcase.json";
import Link from "next/link";
import { useEffect } from "react";

import { showcaseHover } from "@common/utilits";

const ShowcaseSection = ( { projects } ) => {
	useEffect(() => {
		showcaseHover();
	}, []);

    return (
        <>
            {/* Onovo Showcase */}
			<section id="projects" className="onovo-section gap-bottom-140" style={{"borderBottom": "1px solid #555"}}>
				<div className="container">

					{/* Heading */}
					<div className="onovo-heading gap-bottom-40">
						<div className="onovo-subtitle-1">
							<span>{Data.subtitle}</span>
						</div>
						<h2 className="onovo-title-2">
							<span>{Data.title}</span>
						</h2>
					</div>

					{/* Showcase */}
					<div className="onovo-showcase gap-bottom-40">
						<div className="img-circle onovo-circle-move" />

						{/* Showcase items */}
						{/* <div className="onovo-showcase-items">
                            {projects.slice(0, Data.numOfItems).map((item, key) => (
							<div key={`showcase-item-${key}`} className="onovo-showcase-item">
								<div className="category">
									<a href={`/projects/${item.id}`}>
										<span data-splitting data-onovo-scroll>
											<span>{item.category}</span>
										</span>
									</a>
								</div>
								<h3 className="title">
									<a href={`/projects/${item.id}`}>
										<span className="onovo-lnk" data-splitting data-onovo-scroll>{item.title}</span>
									</a>
								</h3>
								<div className="image" data-onovo-overlay data-onovo-scroll>
									<span className="img" style={{"backgroundImage": "url(" + item.image + ")"}} />
								</div>
							</div>
                            ))}
						</div> */}
						{/* Yohana Sahle */}
						<div className="onovo-showcase-items">
						<div className="onovo-showcase-item">
							<div className="category">
							{/* <a href={`/projects/${projects[0].id}`}> */}
							<a href={'projects-2'}>
							
								<span data-splitting data-onovo-scroll>
								<span>{projects[0].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							{/* <a href={`/projects/${projects[0].id}`}> */}
							{/* <a href={'projects-2'}> */}
							<a href="https://www.yohanasahle.com/" target="_blank" rel="noopener noreferrer">

							
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{projects[0].title}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[0].image})` }}
							/>
							</div>
						</div>

						{/* Gize */}

						<div className="onovo-showcase-item">
							<div className="category">
							<a href={Data.button.link}>
								<span data-splitting data-onovo-scroll>
								{/* <span>{projects[0].category}</span> */}
								<span>Desktop App</span>

								</span>
							</a>
							</div>
							<h3 className="title">
							<a href={`/projects/${projects[7].id}`}>
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{"Gize - HR Management System"}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: "url(/images/AI-Soft/HRdemo2/bantu.png)" }}

							/>
							</div>
						</div>
						{/* BeSpa */}
						<div className="onovo-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-onovo-scroll>
								<span>{projects[7].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://bespaet.com/" target="_blank" rel="noopener noreferrer">
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{projects[7].title}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[7].image})` }}
							/>
							</div>
						</div>
						{/* Melange */}
						<div className="onovo-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-onovo-scroll>
								<span>{projects[4].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://melangeroasters.com/" target="_blank" rel="noopener noreferrer">
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{projects[4].title}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[4].image})` }}
							/>
							</div>
						</div>

						{/* AI Tag */}
						<div className="onovo-showcase-item">
							<div className="category">
							<a href={Data.button.link}>
								<span data-splitting data-onovo-scroll>
								{/* <span>{projects[0].category}</span> */}
								<span>AI/ML</span>

								</span>
							</a>
							</div>
							<h3 className="title">
							<a href={`/projects/${projects[0].id}`}>
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{"AI Tag Recognition"}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: "url(/images/AI-Soft/OD/image_labeling.png)" }}

							/>
							</div>
						</div>
						{/* Qene */}
						<div className="onovo-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-onovo-scroll>
								<span>{projects[2].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://qenefilms.bala.media/dist/main/index.html" target="_blank" rel="noopener noreferrer">
								<span className="onovo-lnk" data-splitting data-onovo-scroll>
								{projects[2].title}
								</span>
							</a>
							</h3>
							<div className="image" data-onovo-overlay data-onovo-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[2].image})` }}
							/>
							</div>
						</div>
						</div>
                        
					</div>

					{/* Button */}
					<Link className="onovo-btn onovo-hover-btn" href={'projects-2'}>
						{/* <i className="arrow">
							<span />
						</i> */}
						<span>{"Website Projects"}</span>
					</Link>
					{/* Button */}
					<Link className="onovo-btn onovo-hover-btn" href={Data.button.link}>
						{/* <i className="arrow">
							<span />
						</i> */}
						<span>{"Application Showcase"}</span>
					</Link>

				</div>
			</section>
        </>
    );
};

export default ShowcaseSection;