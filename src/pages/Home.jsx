// Desc: Home page for the app
import {useState, useEffect} from 'react'
import { getCurrentPot } from '../api/scholarship';
import Hero from './Home/Hero.jsx'
import NotVerified from '../components/NotVerified.jsx';
import { useAuth } from "../hooks";
import  videoPlaceHolder from '../assets/img/webpic.png'
import GLightbox from 'glightbox';
import CountdownTimer2 from '../components/Counter2.jsx';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import { useNotification } from "../hooks";

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
    <CountdownTimer2 size={"col-lg-6"} pot={pot} date={date}  />

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


export default function Home() {
  function getPreviousSunday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
  
    const previousSunday = new Date(today.getTime() - (daysToSunday * millisecondsInDay));
    previousSunday.setHours(11, 59, 0, 0);
  
    return previousSunday;
  }

  const [pot, setPot] = useState(0);
  const [date, setDate] = useState(getPreviousSunday());
  const { authInfo } = useAuth();
  const {isLoggedIn} = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  const { updateNotification } = useNotification();
  
  
  // get current pot amount
  const fetchPot = async () => {
    const {error, scholarship} = await getCurrentPot();
    if (error) return updateNotification("error", error);
    const dateStarted = new Date(scholarship.dateStarted); // Convert to valid date format
    if(scholarship.pot !== undefined) {
      setPot(scholarship.pot);
    }
    if(dateStarted !== undefined) {
      setDate(dateStarted);
    }
  
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
