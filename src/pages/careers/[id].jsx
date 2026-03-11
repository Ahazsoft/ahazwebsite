import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import jobsData from "@/src/lib/jobsData"; // adjust path if needed
import formatRelativeTime from "@/src/common/calculateTime";
import { useRouter } from "next/router";




const JobDetail = ({ job }) => {
  if (!job) {
    return (
      <Layouts>
        <PageBanner pageTitle="Job Details" pageDesc="Job not found" />
        <div className="text-center py-5">
          <h4>Sorry, the job you're looking for doesn't exist.</h4>
        </div>
      </Layouts>
    );
  }

  const router = useRouter();


  const shareUrl =
  typeof window !== "undefined"
    ? `${window.location.origin}${router.asPath}`
    : "";

  const shareText = `Apply for ${job.title} at ${job.company}`;

  return (
    <Layouts>
      <PageBanner pageTitle={"Job Details"} pageDesc={job.title} />
      <style jsx>{`
        @media (max-width: 600px) {
          #career-detail-title {
            font-size: 20px;
          }
          #career-detail-subtitle {
            font-size: 17px;
          }
        }
      `}</style>
      {/* Job Summary Card (full width) */}
      <section className="onovo-section gap-bottom-60">
        <div
          className="container border-bottom "
          style={{
            width: "90%",
            alignSelf: "center",
            boxShadow: "0 8px 10px -6px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="card border-0">
            <div className="card-body">
              {/* Time settings */}
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

              {/* Logo + Title/Company */}
              <div className="d-flex align-items-center mb-4">
                <div className="me-3">
                  <img
                    src={job.logo}
                    alt={job.company}
                    width="70"
                    height="70"
                  />
                </div>
                <div>
                  <h3 className="onovo-title-3 mb-1" id="career-detail-title">
                    {job.title}
                  </h3>
                  <h5 className="text-muted" id="career-detail-subtitle">{job.company}</h5>
                </div>
              </div>

              {/* Info items (no borders, using new icons) */}
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
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
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="onovo-section gap-bottom-140">
        <div className="container" style={{ width: "90%" }}>
          <div className="row">
            {/* Main content - 60% */}
            <div className="col-lg-8">
              {/* Job Description */}
              <div className="onovo-text mb-5">
                <h4 className="onovo-title-4 mb-4">Job Description</h4>
                {job.description.map((para, idx) => (
                  <p key={idx} className="mb-3">
                    {para}
                  </p>
                ))}
              </div>

              {/* Responsibilities */}
              <div className="onovo-text mb-5">
                <h4 className="onovo-title-4 mb-4">Key Responsibilities</h4>
                <ul className="list-unstyled">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="mb-3 d-flex">
                      {/* <span className="me-2 text-success">✅</span> */}

                      <span>
                        <svg
                          class="icon"
                          viewBox="0 0 16 16"
                          aria-label="solid dot"
                          role="img"
                          focusable="false"
                          width="30px"
                          height="30px"
                        >
                          <circle cx="8" cy="8" r="3" fill="currentColor" />
                        </svg>
                      </span>
                      <span
                        style={{
                          paddingLeft: "10px",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="onovo-text mb-5">
                <h4 className="onovo-title-4 mb-4">Requirements</h4>
                <ul className="list-unstyled">
                  {job.requirements.map((item, idx) => (
                    <li key={idx} className="mb-3 d-flex">
                      {/* <span className="me-2 text-primary">•</span> */}
                      <span>
                        <svg
                          class="icon"
                          viewBox="0 0 16 16"
                          aria-label="solid dot"
                          role="img"
                          focusable="false"
                          width="30px"
                          height="30px"
                        >
                          <circle cx="8" cy="8" r="3" fill="currentColor" />
                        </svg>
                      </span>
                      <span style={{ paddingLeft: "10px" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mb-5 mx-3">
                <strong>Contact Email:</strong>{" "}
                <a href={`mailto:${job.contact.email}`}>{job.contact.email}</a>
              </p>

              {/* Share options */}
              <div className="onovo-share">
                <h5
                  className="onovo-title-5 mb-3"
                  style={{ color: "#1d4173", textDecoration: "underline" }}
                >
                  Share this job
                </h5>

                <div className="d-flex gap-3 mb-5">

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onovo-btn onovo-hover-btn"
                    style={{ height: "50px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1 4.98 2.12 4.98 3.5zM0 8.4h5.1V24H0V8.4zm7.5 0h4.9v2.2h.1c.7-1.3 2.5-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8V24h-5.1v-8.3c0-2-.1-4.4-2.7-4.4-2.8 0-3.2 2.2-3.2 4.3V24H7.5V8.4z" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onovo-btn onovo-hover-btn"
                    style={{ height: "50px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onovo-btn onovo-hover-btn"
                    style={{ height: "50px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12.07C22 6.47 17.52 2 11.93 2S2 6.47 2 12.07C2 17.07 5.66 21.22 10.44 22v-6.99H7.9v-3H10.44V9.41c0-2.54 1.51-3.95 3.83-3.95 1.11 0 2.27.2 2.27.2v2.5h-1.28c-1.26 0-1.65.78-1.65 1.58V12h2.81l-.45 3h-2.36V22c4.78-.78 8.44-4.93 8.44-9.93z" />
                    </svg>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="onovo-btn onovo-hover-btn"
                    style={{ height: "50px", width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                    </svg>
                  </a>

                </div>
              </div>
            </div>

            {/* Sidebar - 40% */}
            <div className="col-lg-4">
              {/* Job Overview Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body border">
                  <h5 className="onovo-title-5 mb-3">Job Overview</h5>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>Job Title:</th>
                        <td>{job.title}</td>
                      </tr>
                      <tr>
                        <th>Category:</th>
                        <td>{job.overview.category}</td>
                      </tr>
                      <tr>
                        <th>Experience:</th>
                        <td>{job.overview.experience}</td>
                      </tr>
                      <tr>
                        <th>Degree:</th>
                        <td>{job.overview.degree}</td>
                      </tr>
                     
                      <tr>
                        <th>Location:</th>
                        <td>{job.overview.location}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex align-items-center">
                    <Link
                      href={`/careers/${job.id}/apply`}
                      className="onovo-btn onovo-hover-btn"
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <i className="arrow">
                        <span />
                      </i>
                      <span>Apply Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default JobDetail;

// Generate paths for all jobs
export async function getStaticPaths() {
  const paths = jobsData.map((job) => ({
    params: { id: job.id },
  }));

  return {
    paths,
    fallback: false, // or 'blocking' if you want to generate on-demand
  };
}

// Fetch job data for the given id
export async function getStaticProps({ params }) {
  const job = jobsData.find((j) => j.id === params.id);

  return {
    props: {
      job: job || null,
    },
  };
}
