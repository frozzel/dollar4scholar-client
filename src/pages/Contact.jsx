import React, {useEffect, useRef} from 'react';
import AOS from 'aos';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { useNotification } from '../hooks';

const Breadcrumbs = () => {
  return (
    <>
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h4>Contact</h4>
          </div>
        </div>
      </div>

    </section>
        <div className="container py-3" data-aos="fade-up">
            <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="/">Home</a></li>
                  <li className="breadcrumb-item active"><a aria-current="page">Contact</a></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>  
          </>
  );
};

const ContactSection = () => {
    const form = useRef();
    const [message, setMessage] = useState("");
    const {updateNotification} = useNotification()
    const {notification} = useNotification();


    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_7id53gb', 'template_jnslxz5', form.current, '9-U_xZJNUduY3ojDx')
        .then(
            (result) => {
            updateNotification("ok", result.text)
            form.current.reset()
            },
            (error) => {
              updateNotification("error", error.text)
            }
          )
      }

    useEffect(() => {
        AOS.init({
        duration : 2000
        });
    }
        , [])
    
    useEffect(() => {
        setMessage(notification)
        } , [notification])
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div data-aos="fade-up">
          <iframe title="Google Map" style={{ border: '0', width: '100%', height: '270px' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7972.190319837506!2d-84.40328245139975!3d33.75487531686385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5038f8228fc33%3A0x70aea5627f522825!2sGeorgia%20State!5e0!3m2!1sen!2sus!4v1696779772368!5m2!1sen!2sus" frameBorder="0" allowFullScreen="" />
        </div>
        <div className="row mt-5">
          <div className="col-lg-4" data-aos="fade-up">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>Atlanta, GA</p>
              </div>
              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>info@dollar4scholar.com</p>
              </div>
              {/* <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>(678) 555-5555</p>
              </div> */}
            </div>
          </div>
          <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-up">
            <form ref={form} onSubmit={sendEmail} className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-danger text-center">{message}</div>

              <div className="text-center"><button type="submit" value="send">Send Message</button></div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <main id="main">
      <Breadcrumbs />
      <ContactSection />
    </main>
  );
};

export default Contact;
