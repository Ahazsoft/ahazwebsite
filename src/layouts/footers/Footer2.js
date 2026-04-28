import Link from "next/link";
import appData from "@data/app.json";
import { useEffect } from "react";
import ImageView from "@components/ImageView";
import { footerSticky } from "@common/utilits";

const Footer2 = () => {
  useEffect(() => {
    footerSticky();
  }, []);

  return (
    <>
        {/* Footer */}
        <footer className="ahaz-footer footer--white">
			<div className="footer--default">
				<div className="container">

					<div className="row gap-bottom-40">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

							{/* Heading */}
							<div className="ahaz-heading">
								<h2 className="ahaz-title-2">
									<span>Let’s Turn  <br/>Dreams Into Code.</span>
								</h2>
								{/* <p><Link href="/contact" className="ahaz-footer-lnk ahaz-lnk lnk--revert">Lets Start Project</Link></p> */}
							</div>

						</div>
					</div>

					<div className="row gap-bottom-40">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">

							{/* Logo */}
							<div className="ahaz-f-logo gap-bottom-40" style={{"maxWidth": "70px"}}>
								<Link href="/">
									<img src={appData.footer.logo.image} alt={appData.footer.logo.alt} />
								</Link>
							</div>

						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">

							{/* Description */}
							<div className="ahaz-text">
								Since our inception, we've been dedicated to delivering innovative digital solutions <strong>that empower businesses and drive growth</strong>.
							</div>

						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 offset-lg-1">

							{/* Description */}
							<div className="ahaz-text">
								<ul className="ahaz-footer-menu">
									<li>
										<Link href="/services/software-services">
											<span className="ahaz-lnk">Desktop & Web Applications</span>
										</Link>
									</li>
									<li>
										<Link href="/services/website-services">
											<span className="ahaz-lnk">Website Development</span>
										</Link>
									</li>
									<li>
										<Link href="/services/AI-ML-services">
											<span className="ahaz-lnk">AI/ML Services</span>
										</Link>
									</li>
									{/* <li>
										<Link href="/blog">
											<span className="ahaz-lnk">Publications</span>
										</Link>
									</li> */}
								</ul>
							</div>

						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">

							{/* Description */}
							<div className="ahaz-text">
								Bole Sub-City <br/> Addis Ababa, Ethiopia
								<p>
									<a className="ahaz-lnk" href="tel:+(251) 910315980" target="_blank">+(251) 910315980</a>
									<br />
									<a className="ahaz-lnk" href="mailto:username@domain.com" target="_blank">info@ahaz.io</a>
								</p>
							</div>

							{/* <div className="ahaz-text">
                                <h5>Get in Touch</h5>
                                <p style={{"opacity": "0.6"}}>Noble and Trustworthy Building, Bole Sub-City Addis Ababa, Ethiopia</p>
                                <p style={{"opacity": "0.6"}}>
                                    <a href="tel:+910315980" className="ahaz-lnk lnk--white" target="_blank">+(251) 910315980</a><br />
                                    <a href="mailto:username@domain.com" className="ahaz-lnk lnk--white" target="_blank">info@ahaz.io</a>
                                </p>
                            </div> */}

						</div>
					</div>

					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-self-center">

							{/* Copyright */}
							<div className="copyright">
								<div dangerouslySetInnerHTML={{__html: appData.footer.copy}} />
							</div>

						</div>
						<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 align-right">

							{/* Social*/}
							{/* <div className="ahaz-social-1 ahaz-social-active">
								<ul>
									{appData.social.map((item, key) => (
									<li key={`fsocial-item-${key}`}>
										<a className="ahaz-social-link ahaz-hover-2" href={item.link} title={item.title} target="_blank">
											<i className={item.icon} />
										</a>
									</li>
									))}
								</ul>
							</div> */}

						</div>
					</div>

				</div>
			</div>
		</footer>

        <ImageView />
    </>
  );
};
export default Footer2;
