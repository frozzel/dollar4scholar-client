import { useEffect, useState} from 'react';
import AOS from 'aos';
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from 'react-confetti'
import { getWinner } from '../api/scholarship';
import './winner.css'
import { getCurrentPot } from '../api/scholarship';
import CountdownTimer2 from '../components/Counter2.jsx';
import gooffy from '../assets/img/profile.jpeg';


const Breadcrumbs = () => {
  
  return (
    <>
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h4>Winner</h4>
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
                  <li className="breadcrumb-item active"><a aria-current="page">Winner</a></li>
                </ol>
              </nav>
            </div>
          </div>
        </div>  
          </>
    
  );
};


  const WinnerSection = ({potWinner, winner, pot, date}) => {
    useEffect(() => {
      AOS.init({duration: 2000, once: true});
    }
    , []);
 
    const { name, school, major, avatar } = winner;
    return (
        
      <section className=" about section about-section " id="about" data-aos="fade-up">
      <div className="container">
          <div className="row">
              <div className="col-lg-6 ">
                  <div className="about-avatar">
                      {avatar ? (
                          <img src={avatar.url} title="" alt="" className="rounded-circle img-fluid mx-auto"/>
                      ) : (
                          <img src={gooffy} title="" alt="avatar holder" className=" rounded-circle img-fluid mx-auto" style={{maxHeight: "450px"}}/>
                      )}

                      
                  </div>
              </div>
              <div className="col-lg-6 " style={{marginTop: "5rem"}}>
                  <div className="about-text go-to">
                      <h3 className="dark-color">{name}</h3>
                      <h6 className="text-info lead">School: {school} </h6>
                      <h6 className="text-info lead">Major: {major} </h6>
                      <p>"Cheers to a brighter future! This lucky students hit the jackpot with dollar4scholar scholarship, paving the way for their educational dreams to come true.  #ScholarshipWinners #BrightFutureAhead #dollar4scholar"</p>
                      <div className="row about-list">
                          <div className="col-md-6">
                              <h2 className="theme-color">Winnings ${potWinner}</h2>   
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <CountdownTimer2 size={"col-lg-6"} pot={pot} date={date}  />

            </div>
            
           
          
        </section>
        

    );
  };



const Winner = () => {
    const width = useWindowSize().width;
    const height = useWindowSize().height;
    const [potWinner, setPotWinner] = useState(0);
    const [winner, setWinner] = useState({});
    const [pot, setPot] = useState();
    const [date, setDate] = useState();

    const fetchPot = async () => {
      const {error, scholarship} = await getCurrentPot();
      if (error) return alert("error", error);
      const dateStarted = new Date(scholarship.dateStarted); // Convert to valid date format
      if(scholarship.pot !== undefined) {
        setPot(scholarship.pot);
      }
      if(dateStarted !== undefined) {
        setDate(dateStarted);
      }
    
    }

    const fetchWinner = async () => {
        const {error, winner} = await getWinner();
        const {pot} = winner;
        if (error) return alert("error", error);
        setWinner(winner.winner);
        setPotWinner(pot);
      }


    useEffect(() => {
        fetchWinner();
    }, []) 
    useEffect( () => {
      fetchPot()
    }, []) 
  

  return (<>
    <main id="main">
      <Breadcrumbs />
      <Confetti
      width={width}
      height={height}
      recycle={false}
      
    />
    {date === undefined  || pot === undefined  ? (<> </> ) : (<WinnerSection pot={pot} date={date} potWinner={potWinner} winner={winner}/>)}

    </main>
    </>
    );
};

export default Winner;
