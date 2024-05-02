import {useEffect} from 'react';
// import  videoPlaceHolder from '../../assets/img/webpic.png'
import GLightbox from 'glightbox';
import CountdownTimer from '../../components/Counter2.jsx';
import { Button, Container } from 'react-bootstrap';
import AOS from 'aos';
import Gallery from './Gallary.jsx';


const AboutSection = ({pot, date, message}) => {
  useEffect(() => {
    AOS.init({duration: 1000, once: false});
   
  }
    , []);

  useEffect(() => {
      GLightbox();
    }, [])

  

  return ( <>

<section id="about" className="about justify-content-between " data-aos="fade-up" data-aos-delay="400" style={{paddingBottom: "4rem" }} >
    <Container className="container " >
    <div className="text-danger text-center" style={{zIndex: "1000"}}>{message}</div>

    <CountdownTimer size={"col-lg-6"} pot={pot} date={date}  />

      <div className="row">
        <div className="col-lg-6 video-box align-self-baseline position-relative" >
        <Gallery />
        <Button type='button' href="/auth/signIn" className="  getstarted2 scrollto">Sign Up Today</Button>

        
        
        {/* <img src={videoPlaceHolder } className="img-fluid" alt="" />
          <a href="https://www.youtube.com/watch?v=RuZglxY4EuM" className="glightbox play-btn mb-4"></a> */}
        </div>
        <div className="col-lg-6 pt-3 pt-lg-0 content">
          <h3>🎓 Who We Are</h3>
          <p className="fst-italic">
          We're a community built by students, for students—envisioned by a college professor and brought to life by students just like you. Our mission is to provide easy, accessible scholarships to support your educational journey, whether you're a high school senior, a university student, or attending trade school. No hurdles, just help!
          </p>
          <h3>🤝 Join Our Community</h3>
          <ul>
            <li><i className="bx bx-check-double"></i>Ready to get started? Joining is as simple as it gets:</li>
            <li><i className="bx bx-check-double"></i>Sign Up: Quickly create your profile with just a few clicks.</li>
              {/* <li><i className="bx bx-check-double"></i>Join the Community: Connect with fellow students—all driven to support each other’s educational dreams.</li> */}
              {/* <li><i className="bx bx-check-double"></i>The earning of the week will be raffled off through a randomized system to generate a winner.</li> */}
              {/* <li><i className="bx bx-check-double"></i>Keep an eye out for your emails! You may have the luck of the draw.</li> */}
            {/* Add more list items as needed */}
          </ul>
          <h3> 🚀 How It Works</h3>
            <p>
         Every month, we pool together subscriptions from our community to fund scholarships that are truly for the students, by the students. And the best part? There are no GPA requirements, essays, or applications. Your participation is your ticket to potential scholarship awards!
          </p>
          <h3>🌟 Why Us?</h3>
    
            <p>Don’t miss out on your chance to be part of a unique scholarship community. Sign up, create your profile, and see how simple and rewarding giving and receiving support can be!</p>

    
        
        </div>
      </div>
      {/* <div className="row mt-3">
        <div className="col-lg-12 pt-3 pt-lg-0 content">
        <p> 🚀 How It Works</p>
          <p>
         Every month, we pool together subscriptions from our community to fund scholarships that are truly for the students, by the students. And the best part? There are no GPA requirements, essays, or applications. Your participation is your ticket to potential scholarship awards!
          </p>
          <p>✨ Sign Up Today</p>
          <ul>
            <li><i className='bx bx-check-double'></i>Why get bogged down by endless requirements when you can focus on what really matters—your education and future? With us, it’s not about fitting a mold; it’s about giving every student a fair chance at financial support.</li>
            <li><i className='bx bx-check-double'></i>Feel free to adjust the wording or add any additional elements you think might be needed. If there’s anything else you’d like to refine or add, just let me know!</li>
          </ul>


          </div>

        </div> */}
    </Container>
  </section>
  </>

  )
}

export default AboutSection;