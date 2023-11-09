/* eslint-disable react/prop-types */
// Desc: Home page for the app
import {useState, useEffect} from 'react'
import { getCurrentPot } from '../api/scholarship';
import Hero from './Home/Hero.jsx'
import NotVerified from '../components/NotVerified.jsx';
import { useAuth } from "../hooks";
import { useNotification } from "../hooks";
import AboutSection from './Home/About.jsx';



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
  const [message, setMessage] = useState("");
  const [pot, setPot] = useState(0);
  const [date, setDate] = useState(getPreviousFriday());
  const { authInfo } = useAuth();
  const {isLoggedIn} = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  const { updateNotification, notification } = useNotification();
  
  
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


  useEffect(() => {
    setMessage(notification)
} , [notification])
 

  return (<>
        {!isVerified && isLoggedIn ? (<NotVerified />) : (null)}
     <Hero />  
     


      <main id="main" >


  <AboutSection pot={pot} date={date} message={message}/>

  </main>
  

  </>)
}
