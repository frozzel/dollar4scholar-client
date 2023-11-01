import React, { useEffect, useState} from 'react';
import { getDonations } from '../api/scholarship';
import AOS from 'aos';



const Breadcrumbs = () => {
  
  return (
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h2>Donor Spotlight</h2>
          </div>
        </div>
      </div>
 
    </section>
  );
};
const Member = ({ name, date, amount, phone, address, imageSrc }) => {
    useEffect(() => {
      AOS.init({
        duration: 2000
      });
    }, []);
  
    return (
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div className="member card p-3" data-aos="fade-up">
            <div className="member-img">
              <img src={imageSrc} className="img-fluid" alt={name} />
              {/* <div className="social">
                <a href=""><i className="bi bi-twitter"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
                <a href=""><i className="bi bi-linkedin"></i></a>
              </div> */}
            </div>
            <div className="member-info">
              <div className="info-row">
                <h4 className="name">{name}</h4>
                <h4 className='amount-text'>${amount}</h4>
              </div>
              <h6 className="address">{address}</h6>
              <div className="info-row">
                <div className="phone">{phone}</div>
                <small className="date">{new Date(date).toLocaleString()}</small>
              </div>
              
            </div>
          </div>
        </div>
      );
  };

  const TeamSection = () => {
    const [donations, setDonations] = useState([]);

    const fetchDonations = async () => {
        const {error, donations} = await getDonations();
        if (error) return updateNotification("error", error);
        setDonations(donations);
        }


    useEffect( () => {
            fetchDonations();
    }, [])
    
    return (
        
      <section id="team" className="team" style={{ backgroundColor: '#eee' }}>
    <div className="container py-3" data-aos="fade-up"></div>
        <div className="container">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active"><a aria-current="page">Spotlight</a></li>
                
              </ol>
            </nav>
          </div>
        </div>
          <div className="row">
            {donations.toReversed().map((member, index) => (
              <Member
                key={index}
                name={member.userId.name}
                amount={member.amount}
                date={member.date}
                phone={member.userId.phone}
                address={member.userId.address}
                imageSrc={member.userId.avatar.url}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };



const DonorSpotLight = ({pot}) => {
  return (
    <main id="main">
      <Breadcrumbs />
      <TeamSection />
    </main>
  );
};

export default DonorSpotLight;
