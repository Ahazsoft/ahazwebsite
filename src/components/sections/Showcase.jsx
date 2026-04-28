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
			<section id="projects" className="ahaz-section gap-bottom-140" style={{"borderBottom": "1px solid #555"}}>
				<div className="container">

					{/* Heading */}
					<div className="ahaz-heading gap-bottom-40">
						<div className="ahaz-subtitle-1">
							<span>{Data.subtitle}</span>
						</div>
						<h2 className="ahaz-title-2">
							<span>{Data.title}</span>
						</h2>
					</div>

					{/* Showcase */}
					<div className="ahaz-showcase gap-bottom-40">
						<div className="img-circle ahaz-circle-move" />

						{/* Showcase items */}
						{/* <div className="ahaz-showcase-items">
                            {projects.slice(0, Data.numOfItems).map((item, key) => (
							<div key={`showcase-item-${key}`} className="ahaz-showcase-item">
								<div className="category">
									<a href={`/projects/${item.id}`}>
										<span data-splitting data-ahaz-scroll>
											<span>{item.category}</span>
										</span>
									</a>
								</div>
								<h3 className="title">
									<a href={`/projects/${item.id}`}>
										<span className="ahaz-lnk" data-splitting data-ahaz-scroll>{item.title}</span>
									</a>
								</h3>
								<div className="image" data-ahaz-overlay data-ahaz-scroll>
									<span className="img" style={{"backgroundImage": "url(" + item.image + ")"}} />
								</div>
							</div>
                            ))}
						</div> */}
						{/* Yohana Sahle */}
						<div className="ahaz-showcase-items">
						<div className="ahaz-showcase-item">
							<div className="category">
							{/* <a href={`/projects/${projects[0].id}`}> */}
							<a href={'projects-2'}>
							
								<span data-splitting data-ahaz-scroll>
								<span>{projects[0].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							{/* <a href={`/projects/${projects[0].id}`}> */}
							{/* <a href={'projects-2'}> */}
							<a href="https://melangeroasters.com/" target="_blank" rel="noopener noreferrer">

							
								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{projects[0].title}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[0].image})` }}
							/>
							</div>
						</div>

						{/* Gize */}

						<div className="ahaz-showcase-item">
							<div className="category">
							<a href={Data.button.link}>
								<span data-splitting data-ahaz-scroll>
								{/* <span>{projects[0].category}</span> */}
								<span>Desktop App</span>

								</span>
							</a>
							</div>
							<h3 className="title">
							<a href={`/projects/${projects[7].id}`}>
								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{"Gize - HR Management System"}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: "url(/images/AI-Soft/HRdemo2/bantu.png)" }}

							/>
							</div>
						</div>
						{/* BeSpa */}
						<div className="ahaz-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-ahaz-scroll>
								<span>{projects[7].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://kurifturesorts.com/" target="_blank" rel="noopener noreferrer">
								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{projects[7].title}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[7].image})` }}
							/>
							</div>
						</div>
						{/* Melange */}
						<div className="ahaz-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-ahaz-scroll>
								<span>{projects[4].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://travelwithyuyana.com/" target="_blank" rel="noopener noreferrer">
								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{projects[4].title}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[4].image})` }}
							/>
							</div>
						</div>

						{/* AI Tag */}
						<div className="ahaz-showcase-item">
							<div className="category">
							<a href={Data.button.link}>
								<span data-splitting data-ahaz-scroll>
								{/* <span>{projects[0].category}</span> */}
								<span>AI/ML</span>

								</span>
							</a>
							</div>
							<h3 className="title">
							<a href={`/projects/${projects[0].id}`}>
								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{"AI Tag Recognition"}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: "url(/images/AI-Soft/OD/image_labeling.png)" }}

							/>
							</div>
						</div>
						{/* Inframe */}
						<div className="ahaz-showcase-item">
							<div className="category">
							<a href={'projects-2'}>
								<span data-splitting data-ahaz-scroll>
								<span>{projects[18].category}</span>
								</span>
							</a>
							</div>
							<h3 className="title">
							<a href="https://inframeadvertising.com/" target="_blank" rel="noopener noreferrer">
							{/* <a href="#" target="_blank" rel="noopener noreferrer"> */}

								<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
								{projects[18].title}
								</span>
							</a>
							</h3>
							<div className="image" data-ahaz-overlay data-ahaz-scroll>
							<span
								className="img"
								style={{ backgroundImage: `url(${projects[18].image})` }}
							/>
							</div>
						</div>
						</div>
                        
					</div>

					{/* Button */}
					<Link className="ahaz-btn ahaz-hover-btn" href={'websites'}>
						{/* <i className="arrow">
							<span />
						</i> */}
						<span>{"Website Projects"}</span>
					</Link>
					{/* Button */}
					<Link className="ahaz-btn ahaz-hover-btn" href={'softwares'}>
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