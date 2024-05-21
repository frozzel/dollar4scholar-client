/* eslint-disable react/prop-types */
import   {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from "../hooks";
import NotVerified from '../components/NotVerified';
import { useParams } from 'react-router-dom';
import { useNotification } from "../hooks";
import { getProfile } from "../api/user";
import UserUploadDonor from "../components/UserUploadDonor";
import UserWallet from '../components/UserWallet';
import AOS from 'aos';
import logo from '../assets/img/clients/client-1.png';
import UserDonate from '../components/UserDonate';
import Counter from '../components/Counter2';



const Breadcrumbs = () => {
    return (
      <section id="breadcrumbs" className="breadcrumbs">
        <div className="breadcrumb-hero">
          <div className="container">
            <div className="breadcrumb-hero">
              <h2>Dashboard</h2>
              {/* <p>Donor</p> */}
            </div>
          </div>
        </div>
      </section>
    );
  };

const DonorDashboard = ({pot, date}) => {
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
    const [contribution, setContribution] = useState([]);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [donateState, setDonate] = useState(null);
  

    const fetchProfile = async () => {
        const { error, user } = await getProfile(userId);
          if (error) return updateNotification("error", error);
          setContribution(...user.contribution);
          setUser(user);
    };

    const handleOnEditClick = () => {
        const { id, name, address, phone, avatar} = user;
        
        setSelectedUser({
          id,
          name,
          address,
          phone,
          avatar,
        });
  
        setShowEditModal(true);
      };
      const hideEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
      };
      //add donate funds on click
      const handleOnDonateClick = () => {
        const { id, name, wallet} = user;
        setDonate({
          id,
          name,
          wallet,
        })
        setShowDonateModal(true);
      };
      const hideDonateModal = () => {
        setShowDonateModal(false);
        setDonate(null);
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
            wallet: updatedWallet,
          };
        });
      };
  
      const handleOnUserUpdate = (updatedUser) => {
        const updatedFields = {
          name: updatedUser.name,
          address: updatedUser.address,
          avatar: updatedUser.avatar,
          phone: updatedUser.phone,
        };
      
        setUser(prevUser => {
          return {
            ...prevUser,
            ...updatedFields,
          };
        });
      };

      // handle on donate update
      const handleOnDonateUpdate = (updatedDonate, contributions) => {
        setUser(prevUser => {
          return {
            ...prevUser,
            wallet: updatedDonate,
            contribution: [...prevUser.contribution, contributions]
          };
        });
        setContribution([...contribution, contributions])
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

  const { name, avatar, address, phone, wallet } = user;

  return (
    <main id="main">
    <Breadcrumbs />
   <section style={{ backgroundColor: '#eee', paddingBottom: '0' }}>
      <div className="container py-5" data-aos="fade-up">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active"><a aria-current="page">Dashboard / Donar</a></li>
                
              </ol>
              
            </nav>
          </div>
        </div>
        <div className="text-danger text-center">{message}</div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center" >
                {avatar ? (
                    <img src={avatar} alt={name} className="rounded-rectangle img-fluid mx-auto" style={{  width: "250px", objectFit: 'cover' }} />
                ) :(
                    <img src={logo} alt="avatar" className="rounded-rectangle img-fluid mx-auto" style={{ width: '250px', objectFit: 'cover' }} />

                )
                }
                <h5 className="mt-3 mb-1">{name}</h5>
                <p className="text-muted mb-1">{phone}</p>
                <p className="text-muted mb-1">{address}</p>
                <div className="d-flex justify-content-center mb-0">
                  <Button onClick={handleOnEditClick} type="button" className="getstarted2 " variant="outline-*" style={{textDecoration: 'none', outline: "none"}}>Edit</Button>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                    <h5 className='mt-3 text-center'>Wallet</h5>
                  <li className=" d-flex justify-content-between align-items-center px-4 ">
                    
                  <i className="bi bi-coin " style={{ color: '#94c045',  fontSize: 45}} ></i>
                    <p className="" style={{color: "#94c045", fontSize: 32}}>${wallet}</p>
                  </li>
                  <li className=" d-flex justify-content-between align-items-center px-2">
                  <Button onClick={handleOnEditClickWallet} className="getstarted2 " variant="outline-*">Add Funds</Button>
                    </li>
 
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            
            
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="text-center "> Current Pot Status</h5>
                    
                    <section id="about" className="about justify-content-between "  style={{padding: 0}}>
                      <Counter size={"col-lg-12"} pot={pot} date={date}/>
                     
                                <div className=" text-center mb-2">
                                    <Button onClick={handleOnDonateClick} className="getstarted2" variant="outline-*">Donate</Button>
                                </div>
                        
                    </section>
                    
                  </div>
                </div>
              </div>
              {/* <StatisticsSection /> */}
              <div className="container-fluid">
              <section>
                  <div className="row">
                    {contribution.slice().reverse().map((c, index) => (
                      <CardComponent
                        key={index}
                        amount={c.amount}
                        date={c.date}
                      />
                    ))}
                  </div>
              </section>
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

      <UserUploadDonor
        visible={showEditModal}
        initialState={selectedUser}
        onSuccess={handleOnUserUpdate}
        onClose={hideEditModal}
      />
          <UserDonate
        visible={showDonateModal}
        initialState={donateState}
        onSuccess={handleOnDonateUpdate}
        onClose={hideDonateModal}
      />
    </section>
    </main>
  );




}


const CardComponent = ({ amount, date }) => {
  // Convert date to desired format
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="col-xl-6 col-md-12 mb-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between p-md-1">
            <div className="d-flex flex-row">
              <div className="align-self-center">
                <i className="bi bi-coin me-4" style={{ fontSize: "35px", color: "#94c045" }}></i>
              </div>
              <div>
                <h4>Donation</h4>
                <p className="mb-0">{formattedDate}</p> {/* Use the formatted date here */}
              </div>
            </div>
            <div className="align-self-center">
              <h2 className="h1 mb-0">{amount}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





export default DonorDashboard;
