import {useEffect, useState} from 'react';
import { getCurrentPot } from '../api/scholarship';
import { Button } from 'react-bootstrap';
import { useAuth } from "../hooks";
import NotVerified from '../components/NotVerified';
import { useParams } from 'react-router-dom';
import { useNotification } from "../hooks";
import { getProfile } from "../api/user";
import UserUpload from "../components/UserUpload";
import UserWallet from '../components/UserWallet';
import AOS from 'aos';
import DonorDashboard from './DonorDash';
import Counter from '../components/Counter2';
import UserBuyIn from '../components/UserBuyIn';
import AdminDash from './AdminDash';
import gooffy from '../assets/img/profile.jpeg';




const Breadcrumbs = () => {

    return (
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="breadcrumb-hero">
          <div className="container">
            <div className="breadcrumb-hero">
              <h2>Dashboard</h2>
              {/* <p>Contact Us</p> */}
            </div>
          </div>
        </div>
      </section>
    );
  };

const Dashboard = () => {
    const [pot, setPot] = useState({});
    const [date, setDate] = useState({});
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const {userId} = useParams();
    const { updateNotification } = useNotification();
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const {notification} = useNotification();
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [walletState, setWallet] = useState(null);
    const [showBuyInModal, setShowBuyInModal] = useState(false);
    const [buyInState, setBuyIn] = useState(null);
    
    

    const fetchProfile = async () => {
        const { error, user } = await getProfile(userId);
          if (error) return updateNotification("error", error);
  
          setUser(user);
          
    };
   
      // get current pot amount
    const fetchPot = async () => {
      const {error, scholarship} = await getCurrentPot();
      if (error) return updateNotification("error", error);
      const dateStarted = new Date(scholarship.dateStarted); // Convert to valid date format

    // setPot(scholarship.pot);
      setDate(dateStarted);
      setPot(scholarship.pot);
    };

    const handleOnEditClick = () => {
        const { id, name, phone, address, birth, school, major, avatar} = user;
        
        setSelectedUser({
          id,
          name,
          phone,
          address,
            birth,
            school,
            major,
          avatar,
        });
  
        setShowEditModal(true);
      };
      const hideEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
      };
      //add buy in funds on click
      const handleOnBuyInClick = () => {
        const { id, name, wallet } = user;
        setBuyIn({
          id,
          name,
          wallet,
          
        })
        setShowBuyInModal(true);
      };
      const hideBuyInModal = () => {
        setShowBuyInModal(false);
        setBuyIn(null);
      };

      //add wallet funds on click
      const handleOnEditClickWallet = () => {
        const { id, name, wallet, email, stripeId} = user;
        setWallet({
          id,
          name,
          wallet,
          email,
          stripeId
        })
        setShowWalletModal(true);
      };

      const hideWalletModal = () => {
        setShowWalletModal(false);
        setWallet(null);
      };

      //update wallet funds on finish
      const handleOnWalletUpdate = (updatedWallet) => {
        setUser(prevUser => {
          return {
            ...prevUser,
            wallet: updatedWallet
          };
        });
      };
  
      const handleOnUserUpdate = (user) => {
        const updatedUser = {
          ...user,
          name: user.name,
          phone: user.phone,
          address: user.address,
          birth: user.birth,
          school: user.school,
          major: user.major,
          avatar: user.avatar,
        };
      
        setUser(prevUser => {
          return {
            ...prevUser,
            ...updatedUser,
          };
        });
      };

    const handleOnBuyInUpdate = (updatedBuyIn) => {
      setUser(prevUser => {
        return {
          ...prevUser,
          wallet: updatedBuyIn
        };
      });
    };

    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
    }, [userId]);

    useEffect(() => {
        setMessage(notification)
    } , [notification])

    useEffect(() => {
      AOS.init({duration: 1000, once: true});
     
    }
      , []);

    useEffect(() => {
        fetchPot();
      }, []);
    

    if (!isLoggedIn) {
        return (
            <main id="main">
          <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
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
                <p className="text-muted">
                Please Log back in or Verify your account</p>
            </div>
            </main>
        );
    }

  const { name, avatar,  major, address, email, phone, birth, school, wallet, subscription} = user;
    console.log(subscription);
  if (userId !== authInfo.profile.id) {
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
    
    

  //check and see if user is student or not
  if (user.type === "student" || user.type === "fresh" && userId === authInfo.profile.id) {
  return (
    <main id="main">
                  <div className="text-danger text-center">{message}</div>

    <Breadcrumbs />
   <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5" data-aos="fade-up">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active"><a aria-current="page">Dashboard / Student</a></li>
                
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                {avatar ? (
                    <img src={avatar} alt={name} className="rounded-circle img-fluid mx-auto" style={{ width: '150px' }} />
                ) :(
                    <img src={gooffy} alt="avatar" className="rounded-circle img-fluid mx-auto" style={{ width: '150px' }} />

                )
                }
                <h5 className="my-3">{name}</h5>
                <p className="text-muted mb-1">{major}</p>
                <p className="text-muted mb-4">{address}</p>
                <div className="d-flex justify-content-center mb-2 ">
                  <Button onClick={handleOnEditClick} type="button" className="getstarted2 " variant="outline-*" style={{textDecoration: 'none', outline: "none"}}>Edit</Button>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                    <h5 className='mt-3 text-center'>Subscription Status</h5>
                  <li className=" d-flex justify-content-between align-items-center px-4 ">
                   {(subscription === false || subscription === "undefined")  ? (
                     <i className="bi bi-x-circle" style={{ color: '#f00',  fontSize: 45}} ></i>
                     
                    ) : (<i className="bi bi-check-circle" style={{ color: '#94c045',  fontSize: 45}} ></i>)  }
                    
                  {(subscription === false || subscription === undefined) ? (
                    <p className="" style={{color: "#f00", fontSize: 32}}>No Subscription</p>
                  ) : (
                    <p className="" style={{color: "#94c045", fontSize: 32}}>All Set</p>
                  )}
                  </li>
                  <li className=" d-flex justify-content-between align-items-center px-2">
                  <Button onClick={handleOnEditClickWallet} className="getstarted2 " variant="outline-*">Add Funds</Button>
                    </li>
 
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Birth date</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{birth}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Home Town</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{address}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">School Attending</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{school}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="text-center "> Current Scholarship Status</h5>
                    
                    <section id="about" className="about justify-content-between "  style={{padding: 0}}>
                      <Counter size={"col-lg-12"} pot={pot} date={date} />
  
                        <div className=" text-center mb-2">
                            <Button onClick={handleOnBuyInClick} className="getstarted2" variant="outline-*">Subscribe</Button>
                        </div>
                    </section>
                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    {/* //wallet modal */}
    <UserWallet
        visible={showWalletModal}
        initialState={walletState}
        onSuccess={handleOnWalletUpdate}
        onClose={hideWalletModal}
      />

      <UserUpload
        visible={showEditModal}
        initialState={selectedUser}
        onSuccess={handleOnUserUpdate}
        onClose={hideEditModal}
      />
      {/* buy in modal */}
      <UserBuyIn
        visible={showBuyInModal}
        initialState={buyInState}
        onSuccess={handleOnBuyInUpdate}
        onClose={hideBuyInModal}
      />
    </section>
    </main>
  );
  } 
//check if user is a donor
if (user.type === "donor" ) {
  return (
    <DonorDashboard pot={pot} date={date}/>  

  )
}
if (user.type === "admin") {
  return (
      <AdminDash pot={pot} date={date}/>
  )
}



}


export default Dashboard;
