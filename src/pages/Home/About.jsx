import {useEffect} from 'react';
import  videoPlaceHolder from '../../assets/img/webpic.png'
import GLightbox from 'glightbox';
import CountdownTimer from '../../components/Counter.jsx';
import { Container } from 'react-bootstrap';
import AOS from 'aos';


export default function About({pot, date}) {
  console.log("pot about home", pot)
  console.log("date about home", date)


  useEffect(() => {
    AOS.init({duration: 1000, once: true});
  }, []);

  useEffect(() => {
      GLightbox();
    }, [])

    console.log("date about", date)

  return ( <>

<section id="about" className="about justify-content-between " data-aos="fade-up" data-aos-delay="400" style={{paddingBottom: "4rem" }} >
    <Container className="container " >
    <CountdownTimer size={"col-lg-6"} pot={pot} date={date}  />

      <div className="row">
        <div className="col-lg-6 video-box align-self-baseline position-relative">
          <img src={videoPlaceHolder } className="img-fluid" alt="" />
          <a href="https://www.youtube.com/watch?v=RuZglxY4EuM" className="glightbox play-btn mb-4"></a>
        </div>
        <div className="col-lg-6 pt-3 pt-lg-0 content">
          <h3>Check Out This Video to See How it Works!</h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
          <ul>
            <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
            <li><i className="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><i className="bx bx-check-double"></i> Voluptate repellendus pariatur reprehenderit corporis sint.</li>
              <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
            {/* Add more list items as needed */}
          </ul>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    </Container>
  </section>
  </>

  )
}

  