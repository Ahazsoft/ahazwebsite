import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Data from '@data/sliders/history';

const HistorySlider = () => {
  return (
    <>
        {/* Onovo History */}
        <section className="ahaz-section ahaz-section-bg gap-top-140 gap-bottom-140">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9">

                        {/* Heading */}
                        <div className="ahaz-heading gap-bottom-80">
                            <div className="ahaz-subtitle-1">
                                <span dangerouslySetInnerHTML={{__html: Data.subtitle}} />
                            </div>
                            <h2 className="ahaz-title-2">
                                <span dangerouslySetInnerHTML={{__html: Data.title}} />
                            </h2>
                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 align-right hide-on-mobile">

                        {/* Button */}
                        <Link className="ahaz-btn ahaz-hover-btn" href={Data.button.link}>
                            <i className="arrow">
                                <span />
                            </i>
                            <span>{Data.button.label}</span>
                        </Link>

                    </div>
                </div>

                {/* History swiper */}
                <div className="ahaz-history-slider">
                    <Swiper
                        {...sliderProps.historySlider}
                        className="swiper-container js-history-slider"
                    >
                        <div className="swiper-wrapper">
                            
                            {Data.items.map((item, key) => (
                            <SwiperSlide key={`history-slide-${key}`} className="swiper-slide">
                                <div className="ahaz-history-item">
                                    <div className="image" style={{"backgroundImage": "url("+item.image+")"}} data-ahaz-overlay />
                                    <div className="desc">
                                        <div className="subtitle ahaz-text-white">
                                            <div data-splitting>{item.subtitle}</div>
                                        </div>
                                        <h5 className="title">
                                            <span data-splitting>{item.title}</span>
                                        </h5>
                                        <div className="text">
                                            <div data-splitting>
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            ))}

                        </div>

                        {/* navs */}
                        <div className="ahaz-navs js-history-navs">
                            <div className="ahaz-prev js-history-prev ahaz-hover-2">
                                <i />
                            </div>
                            <div className="ahaz-paginations-container">
                                <div className="ahaz-paginations js-history-pagination" />
                                <div className="swiper-nav-active" />
                            </div>
                            <div className="ahaz-next js-history-next ahaz-hover-2">
                                <i />
                            </div>
                        </div>

                    </Swiper>
                </div>

                {/* Button */}
                <div className="hide-on-desktop align-center">
                    <Link className="ahaz-btn ahaz-hover-btn" href={Data.button.link}>
                        <i className="arrow">
                            <span />
                        </i>
                        <span>{Data.button.label}</span>
                    </Link>
                </div>

            </div>
        </section>
    </>
  );
};
export default HistorySlider;
