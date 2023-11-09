/* eslint-disable react/prop-types */
// Desc: Home page for the app
import {useState, useEffect} from 'react'
import { getCurrentPot } from '../api/scholarship';
import Hero from './Home/Hero.jsx'
import NotVerified from '../components/NotVerified.jsx';
import { useAuth } from "../hooks";
// import  videoPlaceHolder from '../assets/img/webpic.png'
import GLightbox from 'glightbox';
import CountdownTimer from '../components/Counter.jsx';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import { useNotification } from "../hooks";
import Gallery from './Home/Gallary.jsx';

const About = ({pot, date}) => {
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
    <CountdownTimer size={"col-lg-6"} pot={pot} date={date}  />

      <div className="row">
        <div className="col-lg-6 video-box align-self-baseline position-relative" >
        <Gallery />
          {/* <img src={videoPlaceHolder } className="img-fluid" alt="" />
          <a href="https://www.youtube.com/watch?v=RuZglxY4EuM" className="glightbox play-btn mb-4"></a> */}
        </div>
        <div className="col-lg-6 pt-3 pt-lg-0 content">
          <h3>Check Out This Video to See How it Works!</h3>
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
              <li><i className="bx bx-check-double"></i>The earning of the week will be raffled off through a randomized system to generate a winner.</li>
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


export default function Home() {
  function getPreviousFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToFriday = dayOfWeek >= 5 ? dayOfWeek - 5 : dayOfWeek + 2;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
  
    const previousFriday = new Date(today.getTime() - (daysToFriday * millisecondsInDay));
    previousFriday.setHours(16, 59, 0, 0);
  
    return previousFriday;
  }

  const [pot, setPot] = useState(0);
  const [date, setDate] = useState(getPreviousFriday());
  const { authInfo } = useAuth();
  const {isLoggedIn} = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  const { updateNotification } = useNotification();
  
  
  // get current pot amount
  const fetchPot = async () => {
    const {error, scholarship} = await getCurrentPot();
    if (error) return updateNotification("error", error);
    const dateStarted = new Date(scholarship.dateStarted); // Convert to valid date format
    // if(scholarship.pot !== undefined) {
    //   setPot(scholarship.pot);
    // }
    // if(dateStarted !== undefined) {
    //   setDate(dateStarted);
    // }
    
    setDate(dateStarted);
    setPot(scholarship.pot);
  }
  useEffect( () => {
      fetchPot();
  }, [])
 

  
  return (<>
     <NotVerified />   
    
      <Hero />


  <main id="main" >
    {!isVerified && isLoggedIn ? (<NotVerified />) : (null)}

  <About pot={pot} date={date}/>
  </main>
  

  </>)
}
