import Data from "@data/sections/projects.json";
import Link from "next/link";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import appData from "@data/app.json";

const ProjectsSection = ( { projects } ) => {
    const categories = appData.settings.portfolio.categories;

	// Isotope
	const isotope = useRef();
	const [filterKey, setFilterKey] = useState("*");
  
	useEffect(() => {
	  setTimeout(() => {
		isotope.current = new Isotope(".ahaz-portfolio-items", {
		  itemSelector: ".ahaz-portfolio-col",
		  percentPosition: true,
		  masonry: {
			columnWidth: ".ahaz-portfolio-col",
		  },
		  animationOptions: {
			duration: 750,
			easing: "linear",
			queue: false,
		  },
		});
	  }, 1000);
  
	  let filterNavActive = document.querySelectorAll('.ahaz-filter-nav-active');
  
	  filterNavActive.forEach((item) => {
		  item.style.width = item.parentNode.querySelector('.item--active').parentNode.offsetWidth+6+'px';
	  });
	}, []);
  
	useEffect(() => {
	  if (isotope.current) {
		filterKey === "*"
		  ? isotope.current.arrange({ filter: `*` })
		  : isotope.current.arrange({ filter: `.${filterKey}` });
	  }
	}, [filterKey]);
  
	const handleFilterKeyChange = (key) => () => {
	  setFilterKey(key);
	  const filterLinks = document.querySelectorAll(".js-ahaz-filter li");
  
	  filterLinks.forEach((filter) => {
		const filterValue = filter.querySelector('button').getAttribute("data-filter");
		if (filterValue == key) {
		  filter.querySelector('button').classList.add("item--active");
		} else {
		  filter.querySelector('button').classList.remove("item--active");
		}
	  });
  
	  const activeItem = document.querySelector('.ahaz-filter.filter--default .item--active');
	  const activeFilterNav = document.querySelector('.ahaz-filter.filter--default .ahaz-filter-nav-active');
  
	  if ( activeFilterNav != undefined ) {
		  let current_pos = activeItem.parentNode.offsetLeft;
		  let current_width = activeItem.parentNode.offsetWidth;
		  
		  activeFilterNav.style.width = current_width+6+'px';
		  activeFilterNav.style.left = current_pos-3+'px';
	  }
	};

    return (
        <>
            {/* Onovo Projects */}
			<section className="ahaz-section gap-top-140 gap-bottom-140">
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">

							{/* Heading */}
							<div className="ahaz-heading gap-bottom-40">
								<div className="ahaz-subtitle-1">
                                    <span dangerouslySetInnerHTML={{__html: Data.subtitle}} />
								</div>
								<h2 className="ahaz-title-2">
                                    <span dangerouslySetInnerHTML={{__html: Data.title}} />
								</h2>
							</div>

						</div>
						<div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-right hide-on-mobile">

							{/* Button */}
							<Link className="ahaz-btn ahaz-hover-btn" href={Data.button.link}>
								<i className="arrow">
									<span />
								</i>
								<span>{Data.button.label}</span>
							</Link>

						</div>
					</div>

					{/* Projects Side */}
					<div className="ahaz-portfolio portfolio--side">
						<div className="row">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">

								{/* Filter projects */}
								<div className="ahaz-filter-container">
									<div className="ahaz-filter js-ahaz-filter">
										<ul>
											<li>
												<button onClick={handleFilterKeyChange("*")} className="ahaz-filter-item item--active" type="button" data-filter="*">
													<span className="ahaz-lnk" data-splitting data-ahaz-scroll>All Projects</span>
												</button>
											</li>
                                            {categories.map((item, key) => (
                                            <li key={`categories-item-${key}`}>
												<button onClick={handleFilterKeyChange(item.slug)} className="ahaz-filter-item" type="button" data-filter={item.slug}>
													<span className="ahaz-lnk" data-splitting data-ahaz-scroll>{item.label}</span>
												</button>
											</li>
                                            ))}
										</ul>
									</div>
								</div>

							</div>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">

								{/* Projects items */}
								<div className="row ahaz-portfolio-items">
                                    {projects.slice(0, Data.numOfItems).map((item, key) => (
									<div key={`projects-item-${key}`} className={`col-xs-12 col-sm-12 col-md-6 col-lg-6 ahaz-portfolio-col ${item.category_slug}`}>
										<div className="ahaz-portfolio-item">
											<div className="image" data-ahaz-overlay data-ahaz-scroll>
												<a href={`/projects/${item.id}`} className="ahaz-hover-3">
													<img src={item.image} alt={item.title} />
												</a>
											</div>
											<div className="desc">
												<h5 className="title">
													<a className="ahaz-lnk" href={`/projects/${item.id}`}>
														<span data-splitting data-ahaz-scroll>{item.title}</span>
													</a>
												</h5>
												<div className="text">
													<div data-splitting data-ahaz-scroll>
														<span>{item.category}</span>
													</div>
												</div>
											</div>
										</div>
									</div>
                                    ))}
								</div>

								{/* <div className="row ahaz-portfolio-items">
									{projects.slice(0, Data.numOfItems).map((item, key) => (
										<div key={`projects-item-${key}`} className={`col-xs-12 col-sm-12 col-md-6 col-lg-6 ahaz-portfolio-col ${item.category_slug}`}>
										<div className="ahaz-portfolio-item">
											<div className="image" data-ahaz-overlay data-ahaz-scroll>
											<a href={item.link} className="ahaz-hover-3">
												<img src={item.image} alt={item.title} />
											</a>
											</div>
											<div className="desc">
											<h5 className="title">
												<a className="ahaz-lnk" href={item.link}>
												<span data-splitting data-ahaz-scroll>{item.title}</span>
												</a>
											</h5>
											<div className="text">
												<div data-splitting data-ahaz-scroll>
												<span>{item.category}</span>
												</div>
											</div>
											</div>
										</div>
										</div>
									))}
								</div> */}

								{/* Button */}
								<div className="align-center hide-on-desktop">
									<Link className="ahaz-btn ahaz-hover-btn" href={Data.button.link}>
										<i className="arrow">
											<span />
										</i>
										<span>{Data.button.label}</span>
									</Link>
								</div>

							</div>
						</div>
					</div>

				</div>
			</section>
        </>
    );
};

export default ProjectsSection;