import Data from "@data/sections/showcase.json";
import Link from "next/link";
import { useEffect } from "react";

import { showcaseHover } from "@common/utilits";

const ShowcaseLink = ({ href, external, className, children }) => {
	if (external) {
		return (
			<a href={href} className={className} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
};

const ShowcaseSection = ({ projects }) => {
	useEffect(() => {
		showcaseHover();
	}, []);

	const byId = Object.fromEntries((projects || []).map((item) => [item.id, item]));
	const kuriftu = byId["project-08"];
	const inframe = byId["project-19"];
	const melange = byId["project-01"];

	const items = [
		{
			key: "gize",
			category: "Desktop App",
			title: "Gize - HR Management System",
			href: "/projects/project-08",
			image: "/images/AI-Soft/HRdemo2/bantu.png",
			external: false,
		},
		{
			key: "kuriftu",
			category: "Website",
			title: kuriftu?.title || "Kuriftu Resorts",
			href: "https://kurifturesorts.com/",
			image: kuriftu?.image || "/images/project-logo/kuriftu.svg",
			external: true,
		},
		{
			key: "inframe",
			category: "Website",
			title: inframe?.title || "Inframe Production and Promotion",
			href: "https://inframeadvertising.com/",
			image: inframe?.image || "/images/project-logo/inframedark.png",
			external: true,
		},
		{
			key: "ai-tag",
			category: "AI/ML",
			title: "AI Tag Recognition",
			href: "/projects/project-01",
			image: "/images/AI-Soft/OD/image_labeling.png",
			external: false,
		},
		{
			key: "melange",
			category: "Website",
			title: melange?.title || "Melange Coffee Roasters",
			href: "https://melangeroasters.com/",
			image: melange?.image || "/images/project-logo/Logo01.png",
			external: true,
		},
	];

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

						<div className="ahaz-showcase-items">
							{items.map((item) => (
								<div key={item.key} className="ahaz-showcase-item">
									<div className="category">
										<ShowcaseLink href={item.href} external={item.external}>
											<span data-splitting data-ahaz-scroll>
												<span>{item.category}</span>
											</span>
										</ShowcaseLink>
									</div>
									<h3 className="title">
										<ShowcaseLink href={item.href} external={item.external}>
											<span className="ahaz-lnk" data-splitting data-ahaz-scroll>
												{item.title}
											</span>
										</ShowcaseLink>
									</h3>
									<div className="image" data-ahaz-overlay data-ahaz-scroll>
										<span
											className="img"
											style={{ backgroundImage: `url(${item.image})` }}
										/>
									</div>
								</div>
							))}
						</div>
                        
					</div>

					{/* Button */}
					<Link className="ahaz-btn ahaz-hover-btn" href={'websites'}>
						<span>{"Website Projects"}</span>
					</Link>
					{/* Button */}
					<Link className="ahaz-btn ahaz-hover-btn" href={'softwares'}>
						<span>{"Application Showcase"}</span>
					</Link>

				</div>
			</section>
        </>
    );
};

export default ShowcaseSection;
