/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import PureCounter from "@srexi/purecounterjs";


const CountdownTimer2 = ({size, date, pot}) => {
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date(date);

    let difference = targetTime - now;

    if (difference < 0) {
      difference += 7 * 24 * 60 * 60 * 1000; // Add a week if the target time has passed
    }

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return {
      days,
      hours,
      minutes
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const daysUntilSunday = 7 - now.getUTCDay(); // Days until next Sunday
    const timeUntilReset = (daysUntilSunday * 24 * 60 * 60 * 1000) + (11 * 60 * 60 * 1000) + (49 * 60 * 1000); // Time until next Sunday 11:49 EST
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, timeUntilReset);
  }, [timeLeft]);
  

  useEffect(() => {
    if(isNaN(timeLeft.days)) {
    return;
    }
    new PureCounter();
  }, [timeLeft]);

  return (
    <div>
      { timeLeft.days > 0 ? (<>
                            {/* <section id="about" className="about justify-content-between "  style={{padding: 0}}> */}
                            <div className=" justify-content-between " >
                            <div className="row justify-content-center" >
                                <div className={size}>
                                <div className="row justify-content-center" >
                                    <div className="col-lg-4 col-md-5 col-6 text-center">
                                    <div className="count-box py-4 text-center">
                                        <i className="bi bi-coin text-center"></i>
                                        <span data-purecounter-start="0" data-purecounter-end={pot} className="purecounter">0</span>

                                        {/* <span>{pot}</span> */}
                            
                                                                                <p>This Weeks Pot *</p>
                                    </div>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-6 text-center">
                                    <div className="count-box py-4 text-center">
                                        <i className="bi bi-clock text-center"></i>
                                        <span data-purecounter-start="0" data-purecounter-end={timeLeft.days} className="purecounter">0</span>
                                        {/* <span>{timeLeft.days}</span> */}
                                        <p>Days Remaining</p>
                                    </div>
                                    </div>
                                    <div className="col-lg-4 col-md-5 col-6 text-center">
                                    <div className="count-box py-4 text-center">
                                        <i className="bi bi-journal-richtext text-center"></i>
                                        <span data-purecounter-start="0" data-purecounter-end={timeLeft.hours} className="purecounter">0</span>
                                        {/* <span>{timeLeft.hours}</span> */}
                                        <p>Hours Remaining</p>
                                    </div>
                                    </div>
                                    {/* <div className=" text-center mb-2">
                                        <Button className="getstarted2" variant="outline-*">Buy In</Button>
                                    </div> */}
                                    {/* Add more count boxes as needed */}
                                </div>
                                </div>
                            </div>
                            </div>
                        {/* </section> */}
                        </>
      ) : (<>
        {/* <section id="about" className="about justify-content-between "  style={{padding: 0}}> */}
        <div className=" justify-content-between " >
        <div className="row justify-content-center" >
            <div className="col-lg-12">
            <div className="row justify-content-center" >
                <div className="col-lg-4 col-md-5 col-6 text-center">
                <div className="count-box py-4 text-center">
                    <i className="bi bi-coin text-center"></i>
                    <span data-purecounter-start="0" data-purecounter-end={pot} className="purecounter">0</span>
                    {/* <span>{pot}</span>                     */}
                    <p>This Weeks Pot</p>
                </div>
                </div>
                <div className="col-lg-4 col-md-5 col-6 text-center">
                <div className="count-box py-4 text-center">
                    <i className="bi bi-clock text-center"></i>
                    <span data-purecounter-start="0" data-purecounter-end={timeLeft.days} className="purecounter">0</span>
                    {/* <span>{timeLeft.days}</span> */}
                    <p>Days Remaining</p>
                </div>
                </div>
                <div className="col-lg-4 col-md-5 col-6 text-center">
                <div className="count-box py-4 text-center">
                    <i className="bi bi-journal-richtext text-center"></i>
                    <span data-purecounter-start="0" data-purecounter-end={timeLeft.hours > 0 ? `${timeLeft.hours}` : `${timeLeft.minutes} `} className="purecounter">0</span>
                    {/* <span>{timeLeft.hours > 0 ? `${timeLeft.hours}` : `${timeLeft.minutes} `}</span> */}
                    <p>{timeLeft.hours > 0 ? `Hours Left` : `Minutes Left` }</p>
                </div>
                </div>
   
            </div>
            </div>
        </div>
        </div>
    {/* </section> */}
    </>
      )}
    </div>
    
  )
    
  
}; 

export default CountdownTimer2;
