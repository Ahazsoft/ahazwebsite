import Data from "@data/sections/services.json";
import Link from "next/link";
import { useEffect } from "react";

import { servicesHover } from "@common/utilits";

const ServicesSection = () => {
  useEffect(() => {
    servicesHover();
  }, []);

  return (
    <>
        {/* Onovo Services */}
        <section className="ahaz-section gap-top-140 gap-bottom-140">
            <div className="container-xl">

                {/* Services items */}
                <div className="row ahaz-services-grid-fw">
                    {Data.items.map((item, key) => (
                    <div key={`services-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-4 align-center">
                        <div className={key == 1 ? "ahaz-service-grid-item ahaz-hover-1 active active--default" : "ahaz-service-grid-item ahaz-hover-1"}>
                            <div className="image">
                                <Link href={item.link}>
                                    <img decoding="async" src={item.image} alt={item.title} />
                                </Link>
                            </div>
                            <h5 className="ahaz-title-3">
                                <a href={item.link}>
                                    <span>{item.title}</span>
                                </a>
                            </h5>
                            <div className="ahaz-text">
                                <div>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                            <div className="ahaz-bubble">
                                <div className="bubble-1" />
                                <div className="bubble-2" />
                                <div className="bubble-3" />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

            </div>
        </section>
    </>
  );
};

export default ServicesSection;