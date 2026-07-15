import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const API_BASE = "https://ahaz-attendance.vercel.app";
// const API_BASE = "http://localhost:3000";

const CalEmbed = dynamic(
  () => import("@calcom/embed-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading calendar…</span>
        </div>
      </div>
    ),
  },
);

export default function ScheduleMeetingPage() {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicant, setApplicant] = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingFinished, setBookingFinished] = useState(false);

  useEffect(() => {
    if (!token) return;

    const validateToken = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/public/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        console.log(res.status, data);
        if (res.status === 400) {
          setBookingDone(true);
          if (data.name || data.email) {
            setApplicant(data);
          }
          return; 
        }
        if (!res.ok) throw new Error(data.error || "Invalid token");

        setApplicant(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  useEffect(() => {
    if (!applicant) return;

    (async function () {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi({});

      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#003F76" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      cal("prefill", {
        name: applicant.name,
        email: applicant.email,
      });

      cal("on", {
        action: "bookingSuccessful",
        callback: async (e) => {
          const { date, eventType, uid } = e.detail.data;
          try {
            console.log({ date, uid, token });
            const res = await fetch(`${API_BASE}/api/public/booking`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token,
                bookingUid: uid,
                bookedTime: date,
              }),
            });
            if (!res.ok) {
              const errorData = await res.json().catch(() => ({}));
              throw new Error(errorData.error || `HTTP ${res.status}`);
            }
            setBookingFinished(true);
          } catch (err) {
            console.error("Failed to update booking", err);
          }
        },
      });
    })();
  }, [applicant, token]);

  if (loading) {
    return (
      <Layouts>
        <PageBanner pageTitle="Schedule Interview" pageDesc="Loading..." />
        <div className="text-center py-5">
          <h4>Loading scheduling page…</h4>
        </div>
      </Layouts>
    );
  }

  if (error) {
    return (
      <Layouts>
        <PageBanner pageTitle="Schedule Interview" pageDesc="Error" />
        <div className="text-center py-5">
          <h4 className="text-danger">{error}</h4>
        </div>
      </Layouts>
    );
  }

  if (!applicant) {
    return (
      <Layouts>
        <PageBanner pageTitle="Schedule Interview" pageDesc="Not found" />
        <div className="text-center py-5">
          <h4>No applicant data found.</h4>
        </div>
      </Layouts>
    );
  }

  if (bookingDone) {
    return (
      <Layouts>
        <PageBanner
          pageTitle="Schedule Interview"
          pageDesc="Booking Confirmed"
        />
        <div className="text-center py-5">
          <h4 className="text-success">
            Your booking has already been confirmed!
          </h4>
          <p>Thank you, {applicant.name}.</p>
        </div>
      </Layouts>
    );
  }

  return (
    <Layouts>
      <PageBanner
        pageTitle="Schedule Your Interview"
        pageDesc="Choose a time slot"
      />
      <section className="ahaz-section gap-bottom-140">
        <div className="container" style={{ width: "90%" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card border-0 ">
                <div className="card-body p-4">
                  {/* Show greeting only if neither finished nor done */}
                  {!bookingFinished && !bookingDone && (
                    <h4 className="ahaz-title-4 text-center mb-3">
                      Hi {applicant.name}, select a convenient time
                    </h4>
                  )}

                  {/* Show confirmation if either finished or done */}
                  {bookingFinished || bookingDone ? (
                    <>
                      <h4 className="ahaz-title-4 text-center mb-3">
                        Thank You {applicant.name}
                      </h4>
                      <div className="text-center py-4">
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
                          ✅ Booking Confirmed!
                        </h5>
                        <p className="small mb-3">
                          Your interview has been scheduled. You will receive a
                          confirmation email shortly.
                        </p>
                      </div>
                    </>
                  ) : (
                    // Show calendar when pending
                    <div
                      className="overflow-hidden"
                      style={{ height: "600px" }}
                    >
                      <CalEmbed
                        calLink="fine-guy-cpowob/interview-meetings"
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "scroll",
                        }}
                        config={{ layout: "month_view" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
}
