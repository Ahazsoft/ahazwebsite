import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";
import Accordion from 'react-bootstrap/Accordion';
import appData from "@data/app.json";
import { Formik } from 'formik';

const Contact = () => {
  const faqData = {
    "title": "Client’s FAQ",
    "subtitle": "Solving Business Problems <br>is An Everyday",
    "items": [
        {
            "title": "Secure Management and Workforce?",
            "text": "Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Etiam ante ex fermentum litora aorquper conuauris ine odi. Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Et iam ante ex fermentum litora aorquper conuauris ine odi."
        },
        {
            "title": "Logistics Workforce on Track?",
            "text": "Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Etiam ante ex fermentum litora aorquper conuauris ine odi. Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Et iam ante ex fermentum litora aorquper conuauris ine odi."
        },
        {
            "title": "Online Courses & Certification?",
            "text": "Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Etiam ante ex fermentum litora aorquper conuauris ine odi. Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Et iam ante ex fermentum litora aorquper conuauris ine odi."
        },
        {
            "title": "Figures and data representative of an organization's?",
            "text": "Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Etiam ante ex fermentum litora aorquper conuauris ine odi. Duis sed odio sit amet nibh vulputate cursus a sit tellus a odio tincdunt ilm auctor Class apten sociosqu a ds Et iam ante ex fermentum litora aorquper conuauris ine odi."
        }
    ]
  }

  return (
    <Layouts
  pageTitle="Contact Us"
  pageDescription="Get in touch with Ahaz. We are based in Addis Ababa, Ethiopia. Reach out to discuss your custom software or website project."
  pageCanonical="https://ahaz.io/contact"
>
        <PageBanner pageTitle={"Contact Us"} pageDesc={"Have ideas for your business? Let’s build something awesome together."} />

        {/* Onovo Contact Info */}
        <section className="ahaz-section gap-top-140">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">

                        {/* Heading */}
                        <div className="ahaz-text gap-bottom-40">
                            <h4>Send Us A Message</h4>
                            Then let us know about it and we can see what we can do to help
                        </div>

                        {/* Form */}
                        <div className="ahaz-form">
                        <Formik
                            initialValues = {{ email: '', name: '', tel: '', message: '' }}
                            validate = { values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit = {( values, { setSubmitting } ) => {
                                const form = document.getElementById("contactForm");
                                const status = document.getElementById("contactFormStatus");
                                const data = new FormData();

                                data.append('name', values.name);
                                data.append('tel', values.tel);
                                data.append('email', values.email);
                                data.append('message', values.message);

                                fetch(form.action, {
                                    method: 'POST',
                                    body: data,
                                    headers: {
                                        'Accept': 'application/json'
                                    }
                                }).then(response => {
                                    if (response.ok) {
                                        status.innerHTML = "Thanks for your submission!";
                                        form.reset()
                                    } else {
                                        response.json().then(data => {
                                            if (Object.hasOwn(data, 'errors')) {
                                                status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                                            } else {
                                                status.innerHTML = "Oops! There was a problem submitting your form"
                                            }
                                        })
                                    }
                                }).catch(error => {
                                    status.innerHTML = "Oops! There was a problem submitting your form"
                                });

                                setSubmitting(false);
                            }}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                /* and other goodies */
                            }) => (
                            <form onSubmit={handleSubmit} id="contactForm" action={appData.settings.formspreeURL} className="cform" method="post">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>
                                            <input 
                                              placeholder="Full Name" 
                                              type="text" 
                                              name="name" 
                                              required="required"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.name}
                                            />
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>
                                            <input 
                                              placeholder="Email Address" 
                                              type="email" 
                                              name="email" 
                                              required="required"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.email}
                                            />
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>
                                            <input 
                                              placeholder="Phone Number" 
                                              type="tel" 
                                              name="tel" 
                                              required="required"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.tel}
                                            />
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>
                                            <textarea 
                                              placeholder="Message" 
                                              name="message"
                                              required="required"
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.message}
                                            />
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <p>
                                            <button type="submit" className="ahaz-btn ahaz-hover-btn">
                                                <span>Send Message</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>

                                <div className="form-status alert-success" id="contactFormStatus" />
                            </form>
                            )}
                        </Formik>
                        </div>

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">

                        {/* Contact Info */}
                        <div className="ahaz-contact-info ahaz-text-white">
                            <ul>
                                <li>
                                    <h5>Contact Info</h5>
                                    <a href="tel:+251910315980 " className="ahaz-lnk lnk--white" target="_blank">+ 251 (910) 31-59-80 </a><br/>
                                    <a href="mailto:info@ahaz.io" className="ahaz-lnk lnk--white" target="_blank">info@ahaz.io</a>
                                    
                                    {/* <div className="ahaz-social-1 ahaz-social-active" style={{"marginTop": "10px"}}>
                                        <ul>
                                            {appData.social.map((item, key) => (
                                            <li key={`contact-social-item-${key}`}>
                                                <a href={item.link} target="_blank" className="ahaz-social-link ahaz-hover-2" title={item.title}>
                                                    <i className={`icon ${item.icon}`} />
                                                </a>
                                            </li>
                                            ))}
                                        </ul>
                                    </div> */}
                                </li>
                                <li>
                                    <h5>Addis Ababa</h5>
                                    <div>Noble and Trustworthy Building,<br/>Bole Sub-City</div>
                                </li>
                                {/* <li>
                                    <h5>Los Angeles</h5>
                                    <div>2001 N. Clybourn Avenue Suite 202</div>
                                </li> */}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* Onovo Faq */}
        
      
    </Layouts>
  );
};
export default Contact;
