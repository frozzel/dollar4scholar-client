/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import { useAuth } from "../hooks";
import './winner.css'
import NotVerified from '../components/NotVerified';
import { useParams } from 'react-router-dom';
import { useNotification } from "../hooks";
import { getWinnerById, setActiveStatus } from "../api/scholarship";
import AOS from 'aos';
import { Button } from 'react-bootstrap';
import gooffy from '../assets/img/profile.jpeg';




const Breadcrumbs = ({id}) => {
    return (<>
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="breadcrumb-hero">
          <div className="container">
            <div className="breadcrumb-hero">
            
              {/* <p>Donor</p> */}
            </div>
          </div>
        </div>
      </section>
       <div className="container py-3" data-aos="fade-up">
       <div className="row">
       <div className="col">
         <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
           <ol className="breadcrumb mb-0">
             <li className="breadcrumb-item"><a href={`/dashboard/${id}`} >Dashboard</a></li>
             <li className="breadcrumb-item active"><a aria-current="page">Donor Information</a></li>
           </ol>
         </nav>
       </div>
     </div>
   </div>  
     </>
    );
  };

const AdminWinnerInfo = () => {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const {userId} = useParams();
    const { updateNotification } = useNotification();
    const {notification} = useNotification();
    const [active, setActive] = useState(true); // Add active state
    

    const fetchProfile = async () => {
        const { error, winner } = await getWinnerById(userId);
          if (error) return updateNotification("error", error);
          setActive(winner.active)
          setUser(winner);
    };

    const handleClick = () => {
        if (active) {
            const { error } = setActiveStatus(userId, {active: false});
            if (error) return updateNotification("error", error);
    
            setActive(false); // Update active state to false
        }
        if (!active) {
        const { error } = setActiveStatus(userId, {active: true});
        if (error) return updateNotification("error", error);

        setActive(true); // Update active state to false
        }
    }

    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
    }, [authInfo, userId]);

    useEffect(() => {
        setMessage(notification)
    } , [notification])

    useEffect(() => {
      AOS.init({duration: 1000, once: true});
    }, []);

    if (!isLoggedIn) {
        return (
            <main id="main">
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="text-danger text-center">{message}</div>

            <p className="text-muted">
              Please Login
            </p>
          </div>
            </main>
        );
      }
    if (!isVerified) {
        return (
            <main id="main">
                <NotVerified />
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-danger text-center">{message}</div>

                <p className="text-muted">
                    Please Verify your account or Log back in
                </p>
            </div>
            </main>
        );
    }

    const { name, avatar, address, phone, email, major, school, birth } = user.winner? user.winner : {};

    if (authInfo.profile?.type === "admin") {
    return (
    <main id="main">
        <Breadcrumbs id={authInfo.profile?.id}/>
         <section className=" about section about-section " id="about" data-aos="fade-up">
      <div className="container">
          <div className="row mb-5">
              <div className="col-lg-6 ">
                  <div className="about-avatar">
                      {avatar ? (
                          <img src={avatar.url} title="" alt="" className="rounded-circle img-fluid mx-auto"/>
                      ) : (
                          <img src={gooffy} title="" alt="avatar holder" className="rounded-circle img-fluid mx-auto" style={{maxHeight: "400px"}} />
                      )}
                  </div>
              </div>
              <div className="col-lg-6 mt-5" style={{marginTop: "0rem"}}>
                  <div className="about-text go-to">
                      <h3 className="dark-color">{name}</h3>
                      <h6 className="text-info lead ">{school}</h6>
                      <h6 className="text-info lead ">{major} </h6>

                      
                  </div>
                  <CardComponent address={address} phone={phone} email={email} birth={birth} dateStarted={user.dateStarted} dateFinished={user.dateFinished} pot={user.pot} active={active}/>
              </div>
              <div className="d-flex justify-content-center mb-2 ">
                  <Button onClick={handleClick} type="button" className="getstarted2 " variant="outline-*" style={{textDecoration: 'none', outline: "none"}}>Open/Close</Button>
                </div>
          </div>
          







         
            </div>

        </section>
    </main>
  );
} else {
    return (
        <main id="main">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <p className="text-muted">
          You are not authorized to view this page
        </p>
      </div>
        </main>
    );
}
};

const CardComponent = ({ birth, email, address, phone, dateStarted, dateFinished, pot, active }) => {
    return (
        <div className="row about-list">
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>Birthday</label>
                                        <p>{birth}</p>
                                    </div>
                                    <div className="media">
                                        <label>Address</label>
                                        <p>{address}</p>
                                    </div>
                                    <div className="media">
                                        <label>Start Date</label>
                                        <p>{new Date(dateStarted).toLocaleDateString()}</p>
                                    </div>
                                    <div className="media">
                                        <label>Total</label>
                                        <p>${pot}</p>
                                    </div>
                                    <div className="media">
                                        <label>Profit</label>
                                        <p>${Math.round(pot * 10)/100}</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="media">
                                        <label>E-mail</label>
                                        <p>{email}</p>
                                    </div>
                                    <div className="media">
                                        <label>Phone</label>
                                        <p>{phone}</p>
                                    </div>
                                    <div className="media">
                                        <label>Date End</label>
                                        <p>{new Date(dateFinished).toLocaleDateString()}</p>
                                    </div>
                                    <div className="media">
                                        <label>Pay Out</label>
                                        <p>${pot - Math.round(pot * 10)/100}</p>
                                    </div>
                                    <div className="media">
                                        <label>Active</label>
                                        <p>{active? "Open" : "Closed"}</p>
                                    </div>
                                </div>
                            </div>
    );
};
  


export default AdminWinnerInfo;
