import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import formatRelativeTime from "@/src/common/calculateTime";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const API_BASE = "https://ahaz-attendance.vercel.app";
// const API_BASE = "http://localhost:3000";

const JobDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    const controller = new AbortController();

    async function fetchJob() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/public/jobs/${id}`, {
          signal: controller.signal,
        });

        if (res.status === 404) {
          if (mounted) setJob(null);
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (mounted) setJob(data);
      } catch (err) {
        if (mounted) setError(err.message || "Failed to fetch job");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchJob();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Layouts>
        <PageBanner pageTitle="Job Details" pageDesc="Loading..." />
        <div className="text-center py-5">Loading job details...</div>
      </Layouts>
    );
  }

  // Error state
  if (error) {
    return (
      <Layouts>
        <PageBanner pageTitle="Job Details" pageDesc="Error" />
        <div className="text-center py-5 text-danger">Error: {error}</div>
      </Layouts>
    );
  }

  // Not found state
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

  // Share links (commented out, kept as requested)
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const shareUrl = typeof window !== 'undefined'
  //   ? `${window.location.origin}${pathname}${searchParams ? '?' + searchParams : ''}`
  //   : '';
  // const shareText = `Apply for ${job.title} at ${job.company}`;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
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
      <section className="ahaz-section gap-bottom-60">
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
                  {formatRelativeTime(job.post_date?.split("T")[0] ?? "")}
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
                    {job.expiry_date?.split("T")[0] ?? ""}
                  </p>
                </div>
              </div>

              {/* Logo + Title/Company */}
              <div className="d-flex align-items-center mb-4">
                <div className="me-3">
                  <img
                    src={
                      job.company == "Ahaz Solutions"
                        ? "/images/logo/logo1.png"
                        : "/images/logo/Bala4.jpg"
                    }
                    alt={job.company}
                    width="70"
                    height="70"
                  />
                </div>
                <div>
                  <h3 className="ahaz-title-3 mb-1" id="career-detail-title">
                    {job.title}
                  </h3>
                  <h5 className="text-muted" id="career-detail-subtitle">
                    {job.company}
                  </h5>
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
                  <span className="px-2">{job.job_type}</span>
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
      <section className="ahaz-section gap-bottom-140">
        <div className="container" style={{ width: "90%" }}>
          <div className="row">
            {/* Main content - 60% */}
            <div className="col-lg-8">
              {/*Live Preview */}
              <div className="space-y-2">
                <div className="markdown-body p-6 bg-white overflow-auto">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                  >
                    {job.description}
                  </ReactMarkdown>
                </div>
              </div>

              <p className="mb-5 mx-3">
                <strong>Contact Email:</strong>{" "}
                <a href={`mailto:${job.email}`}>{job.email}</a>
              </p>

              {/* Share options */}
              <div className="ahaz-share">
                <h5
                  className="ahaz-title-5 mb-3"
                  style={{ color: "#1d4173", textDecoration: "underline" }}
                >
                  Share this job
                </h5>

                <div className="d-flex gap-3 mb-5">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-dark rounded-circle d-flex align-items-center justify-content-center hover:bg-gray"
                    style={{
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <i className="fab fa-linkedin-in" aria-hidden="true" />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-dark rounded-circle d-flex align-items-center justify-content-center hover:bg-gray"
                    style={{
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <i className="fab fa-twitter" aria-hidden="true" />
                  </a>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-dark rounded-circle d-flex align-items-center justify-content-center hover:bg-gray"
                    style={{
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <i className="fab fa-facebook-f" aria-hidden="true" />
                  </a>

                  <a
                    href={`https://t.me/{encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-dark rounded-circle d-flex align-items-center justify-content-center hover:bg-gray"
                    style={{
                      height: "50px",
                      width: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <i className="fab fa-telegram-plane" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar - 40% */}
            <div className="col-lg-4">
              {/* Job Overview Card */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body border">
                  <h5 className="ahaz-title-5 mb-3">Job Overview</h5>
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <th>Job Title:</th>
                        <td>{job.title}</td>
                      </tr>

                      {job.company == "Ahaz Solutions" && (
                        <tr>
                          <th>Category:</th>
                          <td>Software Development</td>
                        </tr>
                      )}

                      <tr>
                        <th>Experience:</th>
                        <td>{job.job_level}</td>
                      </tr>

                      {job.company == "Ahaz Solutions" && (
                        <tr>
                          <th>Degree:</th>
                          <td>{job.education}</td>
                        </tr>
                      )}

                      <tr>
                        <th>Location:</th>
                        <td>{job.location}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="d-flex align-items-center">
                    <Link
                      href={`/careers/${job.id}/apply`}
                      className="ahaz-btn ahaz-hover-btn"
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
