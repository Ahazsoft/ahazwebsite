import Data from "@data/sections/partners.json";

const PartnersSection = ( { paddingTop } ) => {
  return (
    <>
        {/* Onovo Brands */}
        <section className={paddingTop ? "ahaz-section gap-top-140" : "ahaz-section"}>
            <div className="container">

                {/* Heading */}
                <br />
                <div className="ahaz-heading gap-bottom-40">
                    <div className="ahaz-subtitle-1">
                        <span dangerouslySetInnerHTML={{__html: Data.subtitle}} />
                    </div>
                    <h2 className="ahaz-title-2">
                        <span dangerouslySetInnerHTML={{__html: Data.title}} />
                    </h2>
                </div>

                {/* Brands items */}
                <div className="row gap-row">
                    {Data.items.map((item, key) => (
                    <div key={`partners-item-${key}`} className="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3">
                        <div className="ahaz-brands ahaz-hover-3 ahaz-hover-label" data-ahaz-overlay data-ahaz-scroll>
                            <a target="_blank" href={item.link}>
                                <span className="image">
                                    <img decoding="async" src={item.image} width="285" height="200" alt={item.alt} />
                                    
                                </span>
                                <span className="label ahaz-white-black">Visit Website</span>
                            </a>
                        </div>
                    </div>
                    ))}
                </div>

            </div>
        </section>
    </>
  );
};

export default PartnersSection;