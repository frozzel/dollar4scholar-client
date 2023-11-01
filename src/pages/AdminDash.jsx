import React, {useEffect, useState} from 'react';
import { useAuth } from "../hooks";
import NotVerified from '../components/NotVerified';
import { useParams, Link } from 'react-router-dom';
import { useNotification } from "../hooks";
import { getDonations, getAllWinners, getNumberOfUsers } from '../api/scholarship';
import AOS from 'aos';
import Counter from '../components/Counter';
import {CgProfile} from "react-icons/cg";
import {FaUserGraduate} from "react-icons/fa";
import {BsCoin} from "react-icons/bs";
import admin from '../assets/img/admin.jpg';
import women from '../assets/img/women.png';



const Breadcrumbs = () => {
    return (
      <section id="breadcrumbs" className="breadcrumbs" >
        <div className="breadcrumb-hero">
          <div className="container">
            <div className="breadcrumb-hero">
              {/* <h2>Dashboard</h2> */}
              {/* <p>Donor</p> */}
            </div>
          </div>
        </div>
      </section>
    );
  };

const AdminDash = ({pot, date}) => {
    const [message, setMessage] = useState("");
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const {userId} = useParams();
    const { updateNotification } = useNotification();
    const {notification} = useNotification();
 


    useEffect(() => {
        setMessage(notification)
    } , [notification])

    useEffect(() => {
      AOS.init({duration: 1000, once: true});
     
    }
      , []);


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

  return (
    <main id="main">
    <Breadcrumbs />
   <section style={{ backgroundColor: '#eee', paddingBottom: '0' }}>
      <div className="container py-4" data-aos="fade-up">
        <div className="text-danger text-center">{message}</div>
        <div className="row">
        <StatisticsSection />
        </div>
        <div className="row ">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center p-0">
            
                <img src={admin} alt="admin" className="rounded-rectangle img-fluid mx-auto" style={{ width: '250px', objectFit: 'cover', backgroundColor: '#eee'}} />
                <div className="mb-1 text-center">
                  Image by <a href="https://www.freepik.com/free-vector/flat-customer-support-illustration_13184991.htm#query=admin&position=7&from_view=search&track=sph">Freepik</a>
                </div>
              </div>
             
            </div>
    
            <ResentDonations />
     
          </div>
          <div className="col-lg-8">
            
            
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="text-center "> Current Pot Status</h5>
                    
                    <section id="about" className="about justify-content-between "  style={{padding: 0}}>
                      <Counter size={"col-lg-12"} pot={pot} date={date}/>
                        
                    </section>
                    
                  </div>
                </div>
              </div>
             
             <ActiveWinners />
            
          

            </div>
          </div>
          
        </div>
      </div>

    </section>
    </main>
  );




}



function StatisticsSection() {
  const [users, setUsers] = useState([]);
  const { updateNotification } = useNotification();

  const fetchUsers = async () => {
    const {error, users} = await getNumberOfUsers();
    if (error) return updateNotification("error", error);
    setUsers(...users);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="container-fluid">
      <section className='' style={{padding: 0}}>

        <div className="row">
          <div className="col-xl-4 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <CgProfile className="text-info fa-3x me-4" style={{ fontSize: "3.2rem",  }} />
                    </div>
                    <div>
                      <h4>Total</h4>
                      <p className="mb-0">All Users</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{users.count}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <FaUserGraduate className=" fa-3x me-4" style={{ fontSize: "3.2rem", color: "#0063aa" }} />
                    </div>
                    <div>
                      <h4>Students</h4>
                      <p className="mb-0">Student Users</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{users.studentCount}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <BsCoin className=" fa-3x me-4" style={{ fontSize: "3.2rem", color: "#94c045" }} />
                    </div>
                    <div>
                      <h4>Donors</h4>
                      <p className="mb-0">Donor Users</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">{users.donorCount}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </section>
    </div>
  );
}

const ResentDonations = () => {
  const [donations, setDonations] = useState([]);
  const { updateNotification } = useNotification();

  const fetchDonations = async () => {
    const {error, donations} = await getDonations();
    if (error) return updateNotification("error", error);
    setDonations(donations);
  }

  useEffect(() => {
    fetchDonations();
  }, [])

  return (
    <>
      <div className="card mb-4 mb-lg-0">
        <div className="mt-3 text-center">
          <h5 className="">Recent Donors</h5>
        </div>
        
        <div className="card-body p-0">
          <ul className="list-group list-group-flush rounded-3">
            {donations.slice(0, 5).reverse().map((donation, index) => (
              <Link to={`/AdminDonorInfo/${donation.userId._id}`} key={index}>
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3">
                <img className="fas fa-globe fa-lg text-warning" src={donation.userId.avatar?.url} style={{ width: '50px', objectFit: 'cover', }} ></img>
                <p className="mb-0">{donation.userId.name}</p>
                <p className="mb-0 " style={{color: '#94c045'}}>{`$${donation.amount}`}</p>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

const ActiveWinners = () => {
  const [winners, setWinners] = useState([]);
  const { updateNotification } = useNotification();


  const fetchWinners = async () => {
    const {error, winners} = await getAllWinners();
    if (error) return updateNotification("error", error);
    setWinners(winners);
  }

  useEffect(() => {
    fetchWinners();
  }, [])

  
    return (
      <div className="col-md-16">
      <div className="card mb-4 mb-lg-0">
        <div className="mt-3 text-center">
          <h5 className="">Winners</h5>
        </div>
        <hr></hr>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush rounded-3">
            <li className="list-group-item d-flex align-items-center justify-content-between align-items-center p-3">
              <div className="col-2">
                <p className="mb-0">Image</p>
              </div>
              <div className="col-2" style={{textAlign: "center"}}>
                <p className="mb-0">Name</p>
              </div>
              <div className="col-2" style={{textAlign: "right"}}>
                <p className="mb-0">Start Date</p>
              </div>
              <div className="col-2" style={{textAlign: "right"}}>
              <p className="mb-0 ">Status</p>
            </div>
            <div className="col-2 " style={{textAlign: "right"}}>
              <p className="mb-0 ">Total</p>
            </div>
            </li>
            {winners.map((w, index) => (
              <Link to={`/AdminWinnerInfo/${w._id}`} key={index}>
              <li className="list-group-item d-flex align-items-center justify-content-between p-3" key={index}>
                <div className="col-2">
                  <img src={w.winner?.avatar.url} alt="avatar" className="fas fa-globe fa-lg text-warning rounded-circle img-fluid" style={{ width: '40px', objectFit: 'cover' }} />
                </div>
                <div className="col-2" style={{textAlign: "center"}}>
                  <p className="mb-0">{w.winner?.name}</p>
                </div>
                <div className="col-2"style={{textAlign: "right"}}>
                  <p className="mb-0">{new Date(w.dateStarted).toLocaleDateString()}</p>
                </div>
                <div className="col-2" style={{textAlign: "right"}}>
                  <p className="mb-0 ">{w.active? "Open" : "Closed"}</p>
                </div>
                <div className="col-2 " style={{textAlign: "right"}}>
                  <p className="mb-0 " style={{ color: '#94c045' }}>{`$${w.pot}`}</p>
                </div>
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
    )
}




export default AdminDash;
