import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

const ApplyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    gitHub: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const [status, setStatus] = useState({
    submitting: false,
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed.");
      setCvFile(null);
      e.target.value = ""; // clear input
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setFileError("File size must be less than 5MB.");
      setCvFile(null);
      e.target.value = "";
      return;
    }

    setCvFile(file);
  };

  const validate = () => {
    const { firstName, lastName, email, phone } = formData;
    if (!firstName || !lastName || !email || !phone) {
      return "All fields are required.";
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!/^[\d\s\+\-\(\)]{7,}$/.test(phone)) {
      return "Please enter a valid phone number.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setStatus({ submitting: false, error: errorMsg, success: false });
      return;
    }
    if (!cvFile) {
      setStatus({
        submitting: false,
        error: "Please upload your CV.",
        success: false,
      });
      return;
    }

    setStatus({ submitting: true, error: "", success: false });

    // const formDataPayload = new FormData();
    // formDataPayload.append("firstName", formData.firstName);
    // formDataPayload.append("lastName", formData.lastName);
    // formDataPayload.append("email", formData.email);
    // formDataPayload.append("phone", formData.phone);
    // formDataPayload.append("jobTitle", job.title);
    // formDataPayload.append("company", job.company);
    // formDataPayload.append("cv", cvFile);

    const formDataPayload = new FormData();
    formDataPayload.append("firstName", formData.firstName);
    formDataPayload.append("lastName", formData.lastName);
    formDataPayload.append("email", formData.email);
    formDataPayload.append("phone", formData.phone);
    formDataPayload.append("jobTitle", job.title);
    formDataPayload.append("company", job.company);
    formDataPayload.append("jobId", job.id);

    // Append optional fields only if they have a value
    if (formData.linkedIn && formData.linkedIn.trim() !== "") {
      formDataPayload.append("linkedIn", formData.linkedIn);
    }
    if (formData.gitHub && formData.gitHub.trim() !== "") {
      formDataPayload.append("gitHub", formData.gitHub);
    }

    formDataPayload.append("cv", cvFile);

    try {
      // const response = await fetch("http://localhost:3001/api/apply", {
      //   method: "POST",
      //   body: formDataPayload,
      // });

      const response = await fetch(`https://backend.ahaz.io/api/apply`, {
        method: "POST",
        body: formDataPayload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      setStatus({ submitting: false, error: "", success: true });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedIn: "",
        gitHub: "",
      });
      setCvFile(null);
    } catch (error) {
      setStatus({ submitting: false, error: error.message, success: false });
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const API_BASE = "https://backend.ahaz.io/api";

    setLoading(true);
    setFetchError("");

    // fetch(`http://localhost:3001/api/job/${id}`)
    fetch(`https://backend.ahaz.io/api/job/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Job not found");
        if (!res.ok) throw new Error("Failed to fetch job");
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Layouts>
        <PageBanner pageTitle="Apply" pageDesc="Loading..." />
        <div className="text-center py-5">
          <h4>Loading job details…</h4>
        </div>
      </Layouts>
    );
  }

  if (!job) {
    return (
      <Layouts>
        <PageBanner pageTitle="Apply" pageDesc={fetchError || "Job not found"} />
        <div className="text-center py-5">
          <h4>Sorry, the job you're applying for doesn't exist.</h4>
          <Link href="/careers" className="ahaz-btn ahaz-hover-btn mt-3">
            <i className="arrow">
              <span />
            </i>
            <span>Back to Careers</span>
          </Link>
        </div>
      </Layouts>
    );
  }

  if (job.status == "closed") {
    return (
      <Layouts>
        <PageBanner pageTitle="Apply" pageDesc={job.title} />
        <div className="text-center py-5">
          <h4>Sorry, the job you're applying is closed stay tuned for another job position.</h4>
          <Link href="/careers" className="ahaz-btn ahaz-hover-btn mt-3">
            <i className="arrow">
              <span />
            </i>
            <span>Back to Careers</span>
          </Link>
        </div>
      </Layouts>
    );
  }

  return (
    <Layouts>
      <PageBanner pageTitle={`Apply for ${job.title}`} pageDesc={job.company} />

      <section className="ahaz-section gap-bottom-140">
        <div className="container">
          <div className="row justify-content-center">
            {/* Smaller column */}
            <div className="col-lg-5 col-md-7">
              <div className="card border-0">
                <div className="card-body p-3">
                  <h4
                    className="ahaz-title-4 mt-3 mb-3"
                    style={{ textAlign: "center" }}
                  >
                    Application Form
                  </h4>

                  {status.success ? (
                    <div className="text-center">
                      <div className="mb-3 text-success">
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1D4173"
                          strokeWidth="1.5"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                      <h5 className="ahaz-title-5 mb-2">
                        Application Submitted!
                      </h5>
                      <p className="small mb-3">
                        A confirmation email has been sent to {formData.email}.
                      </p>
                      <Link
                        href="/careers"
                        className="ahaz-btn ahaz-hover-btn"
                      >
                        <i className="arrow">
                          <span />
                        </i>
                        <span>Browse More Jobs</span>
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {status.error && (
                        <div
                          className="alert alert-danger py-2 small"
                          role="alert"
                        >
                          {status.error}
                        </div>
                      )}

                      <div className="row g-2">
                        <div className="col-md-6 mb-2">
                          <label
                            htmlFor="firstName"
                            className="form-label small mb-1"
                          >
                            First Name *
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={status.submitting}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-2">
                          <label
                            htmlFor="lastName"
                            className="form-label small mb-1"
                          >
                            Last Name *
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={status.submitting}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor="email"
                          className="form-label small mb-1"
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={status.submitting}
                          required
                        />
                      </div>

                      <div className="mb-2">
                        <label
                          htmlFor="phone"
                          className="form-label small mb-1"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-sm"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={status.submitting}
                          required
                        />
                      </div>
                      {/* Github */}
                      <div className="mb-2">
                        <label
                          htmlFor="gitHub"
                          className="form-label small mb-1"
                        >
                          {/* GitHub */}
                          Portfolio link
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="gitHub"
                          name="gitHub"
                          value={formData.gitHub}
                          onChange={handleChange}
                          disabled={status.submitting}
                        />
                      </div>

                      {/* linked in */}
                      <div className="mb-2">
                        <label
                          htmlFor="linkedIn"
                          className="form-label small mb-1"
                        >
                          Linkedin
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="linkedIn"
                          name="linkedIn"
                          value={formData.linkedIn}
                          onChange={handleChange}
                          disabled={status.submitting}
                        />
                      </div>

                      {/* CV File Upload */}
                      <div className="mb-5">
                        <label htmlFor="cv" className="form-label small">
                          CV / Resume * (PDF, DOC, DOCX only, max 5MB)
                        </label>
                        <input
                          type="file"
                          className="form-control form-control-lg rounded"
                          style={{
                            fontSize: "17px",
                          }}
                          id="cv"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          disabled={status.submitting}
                          required
                        />
                        {fileError && (
                          <div className="text-danger small mt-1">
                            {fileError}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="ahaz-btn ahaz-hover-btn w-100"
                        disabled={status.submitting}
                      >
                        {status.submitting ? (
                          <>
                            <span>Submitting ...</span>
                          </>
                        ) : (
                          <>
                            <i className="arrow">
                              <span />
                            </i>
                            <span>Submit</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            input {
              height: 45px;
            }
          `}
        </style>
      </section>
    </Layouts>
  );
};

export default ApplyPage;
