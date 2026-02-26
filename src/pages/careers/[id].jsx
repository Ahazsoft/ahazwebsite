import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import jobsData from "@/src/lib/jobsData"; // adjust path if needed

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

  return (
    <Layouts>
      <PageBanner pageTitle={"Job Details"} pageDesc={job.title} />

      {/* Job Summary Card (full width) */}
      <section className="onovo-section gap-bottom-60">
        <div className="container">
          <div className="card border-0">
            <div className="card-body">
              {/* Time badge */}
              <div className="badge bg-light text-dark mb-3">{job.timeAgo}</div>

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
                  <h3 className="onovo-title-3 mb-1">{job.title}</h3>
                  <h5 className="text-muted">{job.company}</h5>
                </div>
              </div>

              {/* Info items (no borders, using new icons) */}
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
                  <img
                    src="/images/icons/Clock.png"
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
        <div className="container">
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
                      <span className="me-2 text-success">✅</span>
                      <span>{item}</span>
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
                      <span className="me-2 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share options */}
              <div className="onovo-share">
                <h5 className="onovo-title-5 mb-3">Share this job</h5>
                <div className="d-flex gap-3">
                  <Link href="#" className="onovo-btn onovo-hover-btn">
                    <i className="arrow">
                      <span />
                    </i>
                    <span>LinkedIn</span>
                  </Link>
                  <Link href="#" className="onovo-btn onovo-hover-btn">
                    <i className="arrow">
                      <span />
                    </i>
                    <span>Twitter</span>
                  </Link>
                  <Link href="#" className="onovo-btn onovo-hover-btn">
                    <i className="arrow">
                      <span />
                    </i>
                    <span>Facebook</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar - 40% */}
            <div className="col-lg-4">
              {/* Job Overview Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
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
                        <th>Offered Salary:</th>
                        <td>{job.overview.offeredSalary}</td>
                      </tr>
                      <tr>
                        <th>Location:</th>
                        <td>{job.overview.location}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact Section */}
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="onovo-title-5 mb-3">Contact</h5>
                  <p className="mb-2">
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${job.contact.email}`}>
                      {job.contact.email}
                    </a>
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${job.contact.phone}`}>{job.contact.phone}</a>
                  </p>
                  <p className="mb-0">
                    <strong>Apply now</strong> – send your CV to the email
                    above.
                  </p>
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
