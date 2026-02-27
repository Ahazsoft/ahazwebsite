import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import jobsData from "../lib/jobsData";
import formatRelativeTime from "@/src/common/calculateTime";

const Careers = () => {
  const hasJobs = jobsData.length > 0;
  return (
    <Layouts>
      <PageBanner
        pageTitle={"Careers"}
        pageDesc={"Join our team and build amazing experiences."}
      />

      {/* Recent Jobs Section */}
      <section className="onovo-section gap-bottom-140">
        <div className="container">
          {/* Section Heading */}
          <div className="onovo-heading gap-bottom-40">
            <h2 className="onovo-title-2 mt-4">
              <span>Current Job Openings</span>
            </h2>
            <div className="onovo-subtitle-1 mt-2">
              <span>
                Explore opportunities to grow with us and make an impact.
              </span>
            </div>
          </div>

          {/* Jobs List as Bootstrap Cards */}
          {hasJobs ? (
            <div className="row">
              {jobsData.map((job) => (
                <div key={job.id} className="col-12 mb-4">
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      {/* Time (top) */}
                      {/* <div className="text-muted small mb-2">{job.timeAgo}</div> */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between col">
                        {/* Posted At */}
                        <div
                          className="badge  text-dark mb-4 px-3 py-2"
                          style={{
                            backgroundColor: "#efefef",
                            padding: "5px",
                          }}
                        >
                          {/* {Date.now()} */}
                          {formatRelativeTime(job.postDate)}
                        </div>

                        {/* Expiry */}
                        <div
                          className="badge  text-dark mb-4 px-3 py-2 "
                          style={{
                            backgroundColor: "#efefef",
                            padding: "5px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            fontSize: "15px",
                            gap: "4px",
                          }}
                        >
                          <img
                            src="/images/icons/Calendar.png"
                            alt="Type"
                            width="18"
                            className="me-1"
                          />
                          <p
                            style={{
                              lineHeight: "20px",
                              // fontSize:"15px",
                              margin: "0px",
                              paddingTop: "3px",
                            }}
                          >
                            {job.expireDate}
                          </p>
                        </div>
                      </div>

                      {/* Logo + Title/Company row */}
                      <div className="d-flex align-items-center mb-3">
                        <div className="me-3">
                          <img
                            src={job.logo}
                            alt={job.company}
                            width="50"
                            height="50"
                            className=" object-fit-contain img-fluid"
                          />
                        </div>
                        <div>
                          <h5 className="card-title mb-1">
                            <Link
                              href={`/careers/${job.id}`}
                              className="text-decoration-none text-dark"
                            >
                              {job.title}
                            </Link>
                          </h5>
                          <h6 className="card-subtitle text-muted">
                            {job.company}
                          </h6>
                        </div>
                      </div>

                      {/* Info items + Button row */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-start gap-3 gap-sm-4 mb-2 mb-sm-0">
                          <div
                            className="d-flex align-items-center"
                            id="careers-fulltime-container"
                            style={
                              {
                                // border: "1px solid red",
                              }
                            }
                          >
                            <img
                              src="/images/icons/Briefcase.png"
                              alt="Type"
                              width="18"
                              className="me-1"
                            />
                            <span className="px-2">{job.type}</span>
                          </div>

                          <div className="d-flex align-items-center">
                            <img
                              src="/images/icons/Wallet.png"
                              alt="Salary"
                              width="18"
                              className="me-1"
                            />
                            <span className="px-2">{job.salary}</span>
                          </div>

                          <div className="d-flex align-items-center">
                            <img
                              src="/images/icons/Location.png"
                              alt="Location"
                              width="18"
                              className="me-1"
                            />
                            <span className="px-2">{job.location}</span>
                          </div>
                        </div>

                        {/* Job Details Button – exactly the same style as before */}
                        <div className="career-job-detail-container">
                          <Link
                            href={`/careers/${job.id}`}
                            className="onovo-btn onovo-hover-btn"
                            id="careers-job-detail-button"
                          >
                            <i className="arrow">
                              <span />
                            </i>
                            <span>Job Details</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty state message
            <div className="text-center py-5">
              <div className="onovo-text-gray mb-3">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h4 className="onovo-title-4 mb-2">
                Sorry, currently we have no job openings.
              </h4>
              <p className="onovo-text-gray">
                Please check back later or follow us on social media for
                updates.
              </p>
            </div>
          )}
        </div>
        <style jsx>{`
          #careers-fulltime-container {
            width: auto;
          }

          @media (max-width: 600px) {
            #careers-fulltime-container {
              width: 100%;
            }
            .career-job-detail-container {
              width: 100%;
              padding:20px 0;
              // border: 1px solid red;
              display:flex;
              align-items: center;
              justify-content: center;
            }
          }
        `}</style>
      </section>
    </Layouts>
  );
};

export default Careers;
