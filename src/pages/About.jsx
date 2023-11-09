import { useEffect, useState } from 'react';
import AOS from 'aos';
import cau from '../assets/img/work-process-1.png';
import lsu from '../assets/img/work-process-2.png';
import columbia from '../assets/img/work-process-4.png';
import mh from '../assets/img/work-process-3.png'; 
import { getCurrentPot } from '../api/scholarship';
import AboutSection from './Home/About.jsx';
import { useNotification } from "../hooks";



const Breadcrumbs = () => {
  
  return (<>
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h4>About</h4>
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
                  <li className="breadcrumb-item active"><a aria-current="page">About</a></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>  
          </>
  );
};


const WorkProcessSection = () => {

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }, []);

  return (
    <section id="work-process" className="work-process" >
      <div className="container">
        <div className="section-title" data-aos="fade-right">
          <h2>Work Process</h2>
          <p>This Lottery is open for College and University student Country wide. With access to an edu administered email address you are qualified to win the weekly pot. The pot submissions will be sorted through and pulled weekly for a winner. Keep an eye out for your emails! You may have the luck of the draw.</p>
        </div>

        <div className="row content">
          <div className="col-md-5 d-flex align-items-center justify-content-center" data-aos="fade-right">
            <img src={lsu} className="img-fluid mx-auto" alt="student" style={{width: "100%", transform: "scaleX(-1)"}}/>
          </div>
          <div className="col-md-7 pt-4 " data-aos="fade-left" style={{marginTop: '99px'}}>
            <div className="fst-italic " style={{display: "inline-block"}}>
                <h3>Enter Student Email</h3>
              <ul>
                <li><i className="bx bx-check-double"></i> The email address must be from an accredited College or University ending in .edu to be accepted into the drawing.</li>
                <li><i className="bx bx-check-double"></i> Participants must be enrolled in an Accredited College or University</li>
                <li><i className="bx bx-check-double"></i> Participants must have access to this email address</li>
                <li><i className="bx bx-check-double"></i> New Student Fresh may enter without .edu but will need to provide school information for payment</li>

              </ul>
            </div>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-5 order-1 order-md-2" data-aos="fade-left">
            <img src={columbia} className="img-fluid" alt=""/>
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right" style={{marginTop: '99px'}}>
            <h3>Create Student Profile</h3>
            <p>The University Lottery will provide scholarship opportunities for students currently enrolled in an accredited college or University. The way to enter to win the weekly raffle is by submitting a payment of $1 along with school credentials and an email address to be entered the lottery. The earning of the week will be raffled off through a randomized system to generate a winner. The winners name will then appear on the site with a “Congratulations, you’re this week’s WINNER!!!” </p>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-5" data-aos="fade-right">
            <img src={mh} className="img-fluid" alt="" style={{width: "80%", transform: "scaleX(-1)"}}/>
          </div>
          <div className="col-md-7 pt-5" data-aos="fade-left" style={{marginTop: '99px'}}>
            <h3>Enter to win!!!</h3>
            <ul>
              <li><i className="bi bi-check"></i> Test your luck at the Drawing</li>
              <li><i className="bi bi-check"></i> Enter your Dollar you Scholar</li>
              <li><i className="bi bi-check"></i> Wait for an email confirmation of your submission.</li>
            </ul>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-5 order-1 order-md-2" data-aos="fade-left">
            <img src={cau} className="img-fluid" alt=""/>
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
            <h3>Check for the Winner</h3>
            <p className="fst-italic">
              The Winner will appear on the site every Friday at 5:00 PM! 
            </p>
            <div>
                <ul>
                    <li><i className="bx bx-check-double"></i> Check your email to see if you were this weeks lucky winner</li>
                    <li><i className="bx bx-check-double"></i> Congratulations to our Winner!!!</li>
                    <li><i className="bx bx-check-double"></i> If you were not this weeks lucky winner, try your hand for next week!!!</li>
                    <li><i className="bx bx-check-double"></i> Check-out our scholarship page for government funded scholarships!</li>
                    <li><i className="bx bx-check-double"></i> Lets Find a Way or Make one for your academic aspirations to become reality</li>
                    <li><i className="bx bx-check-double"></i> The only way to lose is to stop trying, Try Again! </li>
                  </ul>
                  <h3>You Got This!!!</h3>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { updateNotification, notification } = useNotification();
  const [message, setMessage] = useState("");


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

  const fetchPot = async () => {
    const {error, scholarship} = await getCurrentPot();
    if (error) return updateNotification("error", error);
    const dateStarted = new Date(scholarship.dateStarted); // Convert to valid date format
      // console.log(scholarship.pot);

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
    fetchPot()
  }, [])

  useEffect(() => {
    setMessage(notification)
} , [notification])
   
   

  return (
    <main id="main" >

      <Breadcrumbs />
      <div className="text-danger text-center">{message}</div>

      <AboutSection pot={pot} date={date}/>
      <WorkProcessSection />
    </main>
  );
};

export default About;
