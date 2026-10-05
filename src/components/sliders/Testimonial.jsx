import { useEffect, useRef } from "react";
import Data from "@data/sliders/testimonial";

const avatars = ["/images/avatars/yishak.webp", "/images/avatars/abrham.png"];

const TestimonialSlider = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveal = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      section.classList.add("is-visible");
      reveal.disconnect();
    }, { rootMargin: "0px 0px -15% 0px" });
    reveal.observe(section);
    return () => reveal.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="ahaz-section ahaz-voices">
      <div className="container">
        <div className="ahaz-voices-heading">
          <h2 className="ahaz-title-2">
            <span data-splitting data-ahaz-scroll>{Data.title}</span>
          </h2>
        </div>

        <div className="ahaz-voices-scroller">
          {Data.items.map((item, key) => (
            <article key={`voice-card-${key}`} className="ahaz-voice-card">
              <div className="ahaz-voice-card-head">
                <div className="ahaz-voice-card-person">
                  <span className="ahaz-voice-card-avatar">
                    <img src={avatars[key % avatars.length]} alt="" />
                  </span>
                  <div>
                    <h5 className="ahaz-voice-card-name">{item.name}</h5>
                    <p className="ahaz-voice-card-role">{item.role}</p>
                  </div>
                </div>
                <span className="ahaz-voice-card-stars" aria-hidden="true">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </span>
              </div>
              <p className="ahaz-voice-card-mark" aria-hidden="true">“</p>
              <div className="ahaz-voice-card-quote" dangerouslySetInnerHTML={{ __html: item.text }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
