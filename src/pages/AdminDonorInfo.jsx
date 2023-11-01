import React, {useEffect, useState} from 'react';
import { useAuth } from "../hooks";
import NotVerified from '../components/NotVerified';
import { useParams } from 'react-router-dom';
import { useNotification } from "../hooks";
import { getProfile } from "../api/user";
import AOS from 'aos';
import NotFound from './NotFound';




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

const AdminDonorInfo = () => {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState("");
    const { authInfo } = useAuth();
    const { isLoggedIn } = authInfo;
    const isVerified = authInfo.profile?.isVerified;
    const {userId} = useParams();
    const { updateNotification } = useNotification();
    const {notification} = useNotification();
    const [contribution, setContribution] = useState([]);
    

    const fetchProfile = async () => {
        const { error, user } = await getProfile(userId);
          if (error) return updateNotification("error", error);
          setContribution(...user.contribution);
          setUser(user);
    };

    useEffect(() => {
        if (userId)fetchProfile() && window.scrollTo(0, 0);
    }, [userId]);

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

    const { name, avatar, address, phone, email } = user;

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
                          <img src={avatar} title="" alt="" className=" img-fluid mx-auto"/>
                      ) : (
                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="avatar holder" className=" img-fluid mx-auto mt-5" />
                      )}
                  </div>
              </div>
              <div className="col-lg-6 " style={{marginTop: "0rem"}}>
                  <div className="about-text go-to">
                      <h3 className="dark-color">{name}</h3>
                      <h6 className="text-info lead">Phone: {phone} </h6>
                      <h6 className='text-info lead'>Email: {email}</h6>
                      <h6 className="text-info lead">Address: {address} </h6>
                      
                  </div>
              </div>
          </div>
          <div className="row">
                 <div className="container-fluid">
                    <section className='p-0'>
                        <div className="row mb-0">
                        {contribution.slice().reverse().map((c, index ) => (
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

        </section>
    </main>
  );
} else {
    return (
        <main id="main">
            <NotFound />
        </main>
    );
}
};


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

export default AdminDonorInfo;
