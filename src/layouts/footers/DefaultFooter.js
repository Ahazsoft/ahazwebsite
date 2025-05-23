import Link from "next/link";
import appData from "@data/app.json";
import { useEffect } from "react";
import ImageView from "@components/ImageView";
import { footerSticky } from "@common/utilits";

const DefaultFooter = () => {
  useEffect(() => {
    footerSticky();
  }, []);

  return (
    <>
        {/* Footer */}
        <footer className="onovo-footer footer--dark">
            <div className="footer--default">
                <div className="container">

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">

                            {/* Description */}
                            <div className="onovo-text onovo-text-white">
                                <h5>Information</h5>
                                <p style={{"opacity": "0.6"}}>Since our inception, we've been dedicated to delivering innovative digital solutions <strong>that empower businesses and drive growth</strong>.</p>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 offset-lg-1">

                            {/* Description */}
                            <div className="onovo-text onovo-text-white">
                                <h5>Get in Touch</h5>
                                <p style={{"opacity": "0.6"}}>DH Geda Building, Bole Sub-City <br />Addis Ababa, Ethiopia</p>
                                <p style={{"opacity": "0.6"}}>
                                    <a href="tel:+910315980" className="onovo-lnk lnk--white" target="_blank">+(251) 910315980</a><br />
                                    <a href="mailto:username@domain.com" className="onovo-lnk lnk--white" target="_blank">info@ahaz.io</a>
                                </p>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">

                            
                            <div className="row">
                                {appData.footer.gallery.map((item, key) => (
                                <div key={`fgallery-item-${key}`} className="col-4 col-xs-6 col-sm-6 col-md-4 col-lg-4">
                                    <figure className="gallery-item">
                                        <a href={item.image} title={item.title}>
                                            <img src={item.image} alt={item.alt} />
                                        </a>
                                    </figure>
                                </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="separator"></div>

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-self-center">

                            {/* Copyright */}
                            <div className="copyright onovo-text-white">
                                <div dangerouslySetInnerHTML={{__html: appData.footer.copy}} />
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-right">

                            {/* Social */}
                            <div className="onovo-social-1 onovo-social-active">
                                <ul>
                                    {appData.social.map((item, key) => (
                                    <li key={`fsocial-item-${key}`}>
                                        {/* <a className="onovo-social-link onovo-hover-2" href={item.link} title={item.title} target="_blank">
                                            <i className={item.icon}></i>
                                        </a> */}
                                    </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </footer>

        <ImageView />
    </>
  );
};
export default DefaultFooter;
