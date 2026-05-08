import Data from "@data/sections/team.json";
import Link from "next/link";

const TeamSection = ( { team } ) => {
    return (
        <>
            {/* Onovo Team */}
			<section className="ahaz-section gap-top-140 gap-bottom-140">
				<div className="container">

					{/* Heading */}
					<div className="ahaz-heading align-center gap-bottom-40">
						<div className="ahaz-subtitle-1">
							<span>{Data.subtitle}</span>
						</div>
						<h2 className="ahaz-title-2">
							<span dangerouslySetInnerHTML={{__html: Data.title}} />
						</h2>
					</div>

					{/* Team items */}
					<div className="row gap-row">

                        {team.slice(0, Data.numOfItems).map((item, key) => (
						<div key={`team-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
							<div className="ahaz-team" data-ahaz-overlay data-ahaz-scroll>
								<div className="ahaz-team-item ahaz-hover-3">
									<div className="desc">
										<h3 className="title">
											{/* <Link href={`/team/${item.id}`} className="ahaz-lnk">
												<span data-splitting data-ahaz-scroll>{item.name}</span>
											</Link> */}
											<span data-splitting data-ahaz-scroll>{item.name}</span>
										</h3>
										<div className="ahaz-subtitle-1">
											<span data-splitting data-ahaz-scroll>{item.role}</span>
										</div>
										<div className="ahaz-social-1">
											<ul>
                                                {item.social.map((link, link_key) => (
												<li key={`team-item-${key}-social-link-${link_key}`}>
													<a className="ahaz-social-link ahaz-hover-2" href={link.link} title={link.title} target="_blank">
														<i aria-hidden="true" className={link.icon} />
													</a>
												</li>
												))}
											</ul>
										</div>
									</div>
									<div className="image">
										{/* <Link href={`/team/${item.id}`}>
											<img decoding="async" src={item.image} width="350" height="530" alt={item.name} />
										</Link> */}
										<img decoding="async" src={item.image} width="350" height="530" alt={item.name} />
									</div>
									{/* <div className="num ahaz-text-white">
										<span>{item.first_letter}</span>
									</div> */}
								</div>
							</div>
						</div>
                        ))}

					</div>


					
				</div>

				<br></br>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Link className="ahaz-btn ahaz-hover-btn" href={'team'}>
						<span>{"Meet Everyone"}</span>
					</Link>
				</div>

			</section>
        </>
    );
};

export default TeamSection;