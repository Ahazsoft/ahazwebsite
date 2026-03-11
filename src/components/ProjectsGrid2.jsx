import Link from "next/link";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import appData from "@data/app.json";
import ImageView from "@components/ImageView";

const ProjectsGrid2 = ({
  projects,
  layout,
  cols,
  sideFilter,
  masonry,
  galleryMode,
}) => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  // Initialize Isotope
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".onovo-portfolio-items", {
        itemSelector: ".onovo-portfolio-col",
        percentPosition: true,
        masonry: { columnWidth: ".onovo-portfolio-col" },
        animationOptions: { duration: 750, easing: "linear", queue: false },
      });
    }, 1000);

    const filterNavActive = document.querySelectorAll(".onovo-filter-nav-active");
    filterNavActive.forEach((item) => {
      item.style.width =
        item.parentNode.querySelector(".item--active").parentNode.offsetWidth + 6 + "px";
    });
  }, []);

  // Apply filter
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: "*" })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
    const filterLinks = document.querySelectorAll(".js-onovo-filter li");
    filterLinks.forEach((filter) => {
      const filterValue = filter.querySelector("button").getAttribute("data-filter");
      filterValue === key
        ? filter.querySelector("button").classList.add("item--active")
        : filter.querySelector("button").classList.remove("item--active");
    });

    const activeItem = document.querySelector(".onovo-filter.filter--default .item--active");
    const activeFilterNav = document.querySelector(".onovo-filter.filter--default .onovo-filter-nav-active");
    if (activeFilterNav) {
      const current_pos = activeItem.parentNode.offsetLeft;
      const current_width = activeItem.parentNode.offsetWidth;
      activeFilterNav.style.width = current_width + 6 + "px";
      activeFilterNav.style.left = current_pos - 3 + "px";
    }
  };

  // Columns class
  let columns = "";
  switch (cols) {
    case "1": columns = "col-xs-12 col-sm-12 col-md-12 col-lg-12"; break;
    case "2": columns = "col-xs-12 col-sm-12 col-md-6 col-lg-6"; break;
    case "3": columns = "col-xs-12 col-sm-12 col-md-6 col-lg-4"; break;
    default: columns = "col-xs-12 col-sm-12 col-md-6 col-lg-6";
  }
  if (layout === "list") columns = "col-xs-12 col-sm-12 col-md-12 col-lg-12";

  return (
    <>
      <section className="onovo-section gap-top-140">
        <div className="container">
          <div className={sideFilter ? "onovo-portfolio portfolio--side" : "onovo-portfolio"}>
            <div className="row">
              {/* Filter Sidebar */}
              <div className={!sideFilter ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-12 col-sm-12 col-md-12 col-lg-3"}>
                <div className="onovo-filter-container">
                  <div className={!sideFilter ? "onovo-filter js-onovo-filter filter--default" : "onovo-filter js-onovo-filter"}>
                    {!sideFilter && <div className="onovo-filter-nav-active" />}
                    <ul>
                      <li key="categories-item-first">
                        <button onClick={handleFilterKeyChange("*")} className="onovo-filter-item item--active" type="button" data-filter="*">
                          <span>All Projects</span>
                        </button>
                      </li>
                      {appData.settings.portfolio.categories.map((item, key) => (
                        <li key={`categories-item-${key}`}>
                          <button onClick={handleFilterKeyChange(item.slug)} className="onovo-filter-item" type="button" data-filter={item.slug}>
                            <span>{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projects Grid/List */}
              <div className={!sideFilter ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-12 col-sm-12 col-md-12 col-lg-9"}>
                <div className="row onovo-portfolio-items">
                  {projects.map((item, key) => (
                    <div key={`projects-item-${key}`} className={`${columns} onovo-portfolio-col ${item.category_slug}`}>
                      {/* GRID Layout */}
                      {layout === "grid" && (
                        <div className="onovo-portfolio-item">
                          <div className={masonry ? "image" : "image image-square"} data-onovo-overlay data-onovo-scroll>
                            
                            {/* If project has gallery, render 4 images */}
                            {item.gallery?.items ? (
                              <div
                                className="image image-square "
                                data-onovo-overlay
                                data-onovo-scroll
                                style={{ position: "relative" }}
                              >
                                {/* 2x2 image grid */}



                                <div
                                    className="custom-gallery-grid"
                                  style={{
                                    display: "grid",
                                    gap: "6px",
                                    gridTemplateColumns:
                                      item.gallery.items.length === 3
                                        ? "repeat(3, 1fr)"  
                                        : "1fr 1fr",         
                                  }}
                                >
                                  
                                  
                                  {item.gallery.items.slice(0, 4).map((img, idx) => (
                                    <Link
                                      key={`custom-gallery-img-${idx}`}
                                      href={img.link || item.link}
                                      className="custom-gallery-item"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <img src={img.image} alt={img.alt} />
                                      <span className="custom-hover-overlay">Visit Website</span>
                                    </Link>
                                  ))}
                                </div>

                                {/* ONE hover overlay link */}
                                <Link
                                  href={item.link}
                                  className="onovo-hover-3-link"
                                  style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 5
                                  }}
                                />
                              </div>
                            ) : (
                              <Link
                                href={galleryMode ? item.image : `${item.link}`}
                                className="onovo-hover-3"
                              >
                                <img src={item.image} alt={item.title} />
                              </Link>
                            )}

                          </div>

                          <div className="desc">
                            <h5 className="title">
                              <a className="onovo-lnk" href={item.link} target="_blank" rel="noopener noreferrer">
                                <span data-splitting data-onovo-scroll>{item.title}</span>
                              </a>
                            </h5>
                            <div className="text">
                              <div data-splitting data-onovo-scroll>
                                <span>{item.category}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* LIST Layout */}
                      {layout === "list" && (
                      <div className="onovo-portfolio-item onovo-portfolio-item-list">
                        <div className="image onovo-hover-label" data-onovo-overlay data-onovo-scroll>

                          {/* Gallery projects (NO Onovo hover) */}
                          {item.gallery?.items?.length >= 2 ? (
                            <div className="custom-gallery-grid">
                            {item.gallery.items.map((img, idx) => (
                              <Link
                                key={`custom-gallery-list-img-${idx}`}
                                href={img.link || item.link}
                                className="custom-gallery-item"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ flex: 1 }}
                              >
                                <img src={img.image} alt={img.alt} />

                                {/* Hover overlay */}
                                <span className="custom-hover-overlay">Visit Website</span>
                              </Link>
                            ))}
                          </div>
                          ) : (

                            /* Single image project (WITH Onovo hover) */
                            <Link href={`${item.link}`} className="onovo-hover-3">
                              <img src={item.image} alt={item.title} />
                              <div className="square"></div>
                            <span className='label '>
                                Visit Website
                            </span>
                            </Link>

                            

                          )}

                        </div>

                        <div className="desc">
                          <div className="text">
                            <div data-splitting data-onovo-scroll>
                              <span>{item.category}</span>
                            </div>
                          </div>

                          <h5 className="title">
                            <Link className="onovo-lnk" href={`${item.link}`}>
                              <span data-splitting data-onovo-scroll>{item.title}</span>
                            </Link>
                          </h5>

                          <div className="onovo-text">
                            <ul>
                              <li><strong>Project Type</strong><br />{item.type}</li>
                              <li><strong>Client</strong><br />{item.team}</li>
                              <li><strong>Date</strong><br />{item.date}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}


                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageView />
    </>
  );
};

export default ProjectsGrid2;