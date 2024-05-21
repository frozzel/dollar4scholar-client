/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import PureCounter from "@srexi/purecounterjs";

const CountdownTimer2 = ({ size, pot }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Calculate the first day of the next month
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1; // If December, next month is January
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear; // If December, increment the year
    const targetTime = new Date(nextYear, nextMonth, 1);

    let difference = targetTime - now;

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
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const firstDayOfNextMonth = new Date(nextYear, nextMonth, 1);
    const timeUntilReset = firstDayOfNextMonth - now;

    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, timeUntilReset);
  }, [timeLeft]);

  useEffect(() => {
    if (isNaN(timeLeft.days)) {
      return;
    }
    new PureCounter();
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.days > 0 ? (
        <>
          <div className=" justify-content-between ">
            <div className="row justify-content-center">
              <div className={size}>
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-coin text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={pot} className="purecounter">0</span>
                      <p>This Month`s Award </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-clock text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={timeLeft.days} className="purecounter">0</span>
                      <p>Days Remaining</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-journal-richtext text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={timeLeft.hours} className="purecounter">0</span>
                      <p>Hours Remaining</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" justify-content-between ">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-coin text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={pot} className="purecounter">0</span>
                      <p>This Month`s Pot</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-clock text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={timeLeft.days} className="purecounter">0</span>
                      <p>Days Remaining</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 col-6 text-center">
                    <div className="count-box py-4 text-center">
                      <i className="bi bi-journal-richtext text-center"></i>
                      <span data-purecounter-start="0" data-purecounter-end={timeLeft.hours > 0 ? `${timeLeft.hours}` : `${timeLeft.minutes}`} className="purecounter">0</span>
                      <p>{timeLeft.hours > 0 ? `Hours Left` : `Minutes Left`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer2;
