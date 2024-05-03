import { useEffect, useState } from 'react';
import AOS from 'aos';
import cau from '../assets/img/work-process-1.png';
import lsu from '../assets/img/work-process-2.png';
import columbia from '../assets/img/work-process-4.png';
import mh from '../assets/img/work-process-3.png'; 
import { getCurrentPot } from '../api/scholarship';
import AboutSection from './Home/About.jsx';
import { useNotification } from "../hooks";
import { Button, Container } from 'react-bootstrap';





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
          <h2>How It Works</h2>
          <h3>Joining Our Scholarship Community Is As Easy As 1-2-3!</h3>
        </div>

        <div className="row content">
          <div className="col-md-5 d-flex align-items-center justify-content-center" data-aos="fade-right">
            <img src={lsu} className="img-fluid mx-auto" alt="student" style={{width: "100%", transform: "scaleX(-1)"}}/>
          </div>
          <div className="col-md-7 pt-4 " data-aos="fade-left" style={{marginTop: '99px'}}>
            <div className="fst-italic " style={{display: "inline-block"}}>
                <h3>Step 1: Sign Up</h3>
              <ul>
                <li><i className="bx bx-check-double"></i><strong>Create Your Profile:</strong><br></br> Start by signing up on our website. All you need is some basic information to create your profile. It’s quick and easy!</li>
                <li><i className="bx bx-check-double"></i><strong>Customize Your Experience: </strong><br></br>Tell us a bit about your educational goals and interests. This helps us tailor your experience and keep you informed about scholarship opportunities that might interest you.</li>
                {/* <li><i className="bx bx-check-double"></i> Participants must have access to this email address</li>
                <li><i className="bx bx-check-double"></i> New Student Fresh may enter without .edu but will need to provide school information for payment</li> */}

              </ul>
                 <div className="text-center">
                  <Button type='button' href="/auth/signIn" className="  getstarted3 scrollto center">Sign Up Today!</Button>
                </div>
            </div>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-5 order-1 order-md-2" data-aos="fade-left">
            <img src={columbia} className="img-fluid" alt=""/>
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right" style={{marginTop: '99px'}}>
            <h3>Step 2: Explore Scholarships</h3>
            <ul>
            <li><i className="bx bx-check-double"></i><strong>Automatic Enrollment:</strong><br></br> Once you subscribe, you're automatically considered for all upcoming scholarships. No need to apply for each one separately!</li>
                <li><i className="bx bx-check-double"></i><strong>Monthly Scholarships:</strong><br></br> New scholarship opportunities are available every month. Stay active and check back often to see what’s new!</li>
          
              </ul>
          </div>
        </div>

        <div className="row content">
          <div className="col-md-5" data-aos="fade-right">
            <img src={mh} className="img-fluid" alt="" style={{width: "80%", transform: "scaleX(-1)"}}/>
          </div>
          <div className="col-md-7 pt-5" data-aos="fade-left" style={{marginTop: '99px'}}>
            <h3>Step 3: Support and Be Supported</h3>
            <br />
            <h5><strong>Community Engagement:</strong> Our platform is more than just scholarships; it’s a community. Engage with other students, share experiences, and support each other.</h5>
            <br />
            <h3>Step 4: Scholarship Selection</h3>
            <br />
            <h5><strong>Random Draws: </strong>  Scholarships are awarded through a random draw system, ensuring fairness. Notification: Winners are notified via email each month. Make sure to keep your contact information up to date!</h5>

          </div>
        </div>

        <div className="row content">
          <div className="col-md-5 order-1 order-md-2" data-aos="fade-left">
            <img src={cau} className="img-fluid" alt=""/>
          </div>
          <div className="col-md-7 pt-5 order-2 order-md-1" data-aos="fade-right">
            <h3>Step 5: Receive Your Scholarship</h3>
            <div>
                <ul>
                    <li><i className="bx bx-check-double"></i><strong>Quick and Easy Transfer:</strong><br></br> Scholarships are transferred directly to your school/university.</li>
                    <li><i className="bx bx-check-double"></i><strong> No Strings Attached: </strong><br></br>Use your scholarship for tuition, books, or other educational expenses. It's your choice!</li>
                    <br />
                    <h3>Community Funded, Community Focused</h3>
                    <li><i className="bx bx-check-double"></i> <strong>Funding:</strong> Each scholarship is funded by the collective contributions of our student subscribers. Your minimal subscription not only supports your own chances but also helps other students achieve their educational dreams.</li>
                    <li><i className="bx bx-check-double"></i> <strong>Transparency: </strong>We provide complete transparency about how funds are used and scholarships are awarded. Trust and transparency are at the core of our community.</li>
                 
                  </ul>
                  {/* <h3>You Got This!!!</h3> */}
            </div>
          </div>
          
        </div>
         <div className="row content">
          <h3 className="text-center">Join Us Today!</h3>
          <h5 className='text-center'>Experience a new way of earning scholarships where your involvement truly counts. Sign up, become a part of our supportive community, and take one step closer to your educational goals with less financial burden.</h5>
          <br />
          <div className="text-center">
            <Button type='button' href="/auth/signIn" className="btn  getstarted3 scrollto center">Sign Up Today!</Button>
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
