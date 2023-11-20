import {useEffect} from 'react';
// import  videoPlaceHolder from '../../assets/img/webpic.png'
import GLightbox from 'glightbox';
import CountdownTimer from '../../components/Counter3.jsx';
import { Container } from 'react-bootstrap';
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
          {/* <img src={videoPlaceHolder } className="img-fluid" alt="" />
          <a href="https://www.youtube.com/watch?v=RuZglxY4EuM" className="glightbox play-btn mb-4"></a> */}
        </div>
        <div className="col-lg-6 pt-3 pt-lg-0 content">
          <h3>Check This Out to See How it Works!</h3>
          <p className="fst-italic">
          The University lottery will provide scholarship opportunities for students currently enrolled
              in an accredited college or University.
          </p>
          <ul>
            <li><i className="bx bx-check-double"></i>The way to enter to win the weekly raffle is by submitting
              a payment of $1 along with school credentials and an email address to be entered the lottery.</li>
            <li><i className="bx bx-check-double"></i>The earning of the week will be raffled off through a randomized system to generate a winner.</li>
              <li><i className="bx bx-check-double"></i>The winners name will then appear on the site with a “Congratulations, you’re this week’s
              WINNER!!!”</li>
              {/* <li><i className="bx bx-check-double"></i>The earning of the week will be raffled off through a randomized system to generate a winner.</li> */}
              <li><i className="bx bx-check-double"></i>Keep an eye out for your emails! You may have the luck of the draw.</li>
            {/* Add more list items as needed */}
          </ul>
          <p>
          This Lottery is open for College and University student Country wide. With access to an edu administered email address you are qualified to win the weekly pot. The pot submissions will be sorted through and pulled weekly for a winner. Keep an eye out for your emails! You may have the luck of the draw.
          </p>
        </div>
      </div>
    </Container>
  </section>
  </>

  )
}

export default AboutSection;