import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import { useRouter } from "next/router";
import { useState } from "react";
import jobsData from "../../../lib/jobsData";
import Link from "next/link";

const ApplyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const job = jobsData.find((j) => j.id === id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = useState({
    submitting: false,
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setStatus({ submitting: true, error: "", success: false });

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      jobTitle: job.title,
      company: job.company,
    };

    try {
      const response = await fetch("http://localhost:3001/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ submitting: false, error: "", success: true });
      } else {
        setStatus({
          submitting: false,
          error: data.error || "Something went wrong.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        submitting: false,
        error: "Network error. Please try again.",
        success: false,
      });
    }
  };

  if (!job) {
    return (
      <Layouts>
        <PageBanner pageTitle="Apply" pageDesc="Job not found" />
        <div className="text-center py-5">
          <h4>Sorry, the job you're applying for doesn't exist.</h4>
          <Link href="/careers" className="onovo-btn onovo-hover-btn mt-3">
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

      <section className="onovo-section gap-bottom-140">
        <div className="container">
          <div className="row justify-content-center">
            {/* Smaller column */}
            <div className="col-lg-5 col-md-7">
              <div className="card border-0">
                <div className="card-body p-3">
                  <h4 className="onovo-title-4 mt-3 mb-3" style={{textAlign:"center"}}>Application Form</h4>

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
                      <h5 className="onovo-title-5 mb-2">
                        Application Submitted!
                      </h5>
                      <p className="small mb-3">
                        A confirmation email has been sent to {formData.email}.
                      </p>
                      <Link
                        href="/careers"
                        className="onovo-btn onovo-hover-btn"
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

                      <div className="mb-3">
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

                      <button
                        type="submit"
                        className="onovo-btn onovo-hover-btn w-100"
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
                            <span>Submit Application</span>
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
