import React, {useEffect}from 'react'
import AOS from 'aos';
import client1 from '../assets/img/clients/client-1.png';
import client2 from '../assets/img/clients/client-2.png';
import client3 from '../assets/img/clients/client-3.png';
import client4 from '../assets/img/clients/client-4.png';
import client5 from '../assets/img/clients/client-5.png';
import client6 from '../assets/img/clients/client-6.png';



const Breadcrumbs = () => {
  return (
    <section id="breadcrumbs" className="breadcrumbs">
      <div className="breadcrumb-hero">
        <div className="container">
          <div className="breadcrumb-hero">
            <h2>Monthly Investor Spotlight</h2>
            <p> Investor Of The Month </p>
          </div>
        </div>
      </div>
      <div className="container">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Investors</li>
        </ol>
      </div>
    </section>
  );
};

const Member = ({ name, organization, description, imageSrc }) => {

    useEffect(() => {
        AOS.init({
          duration : 2000
        });
      }
        , [])

  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
      <div className="member" data-aos="fade-up">
        <div className="member-img">
          <img src={imageSrc} className="img-fluid" alt="" />
          <div className="social">
            <a href=""><i className="bi bi-twitter"></i></a>
            <a href=""><i className="bi bi-facebook"></i></a>
            <a href=""><i className="bi bi-instagram"></i></a>
            <a href=""><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
        <div className="member-info">
          <h4>{name}</h4>
          <span>{organization}</span>
          <p>We Appreciate Your Contribution to the Pot <i className="bi bi-coin"></i> </p>
          <p> Thank you so much for all you do. </p>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const members = [
    {
      name: "Dollar4Scholar",
      organization: "Dollar4Scholar",
      description: "We Appreciate Your Contribution to the Pot",
      imageSrc: client1
    },
    {
      name: "Dollar4Scholar",
      organization: "Dollar4Scholar",
      description: "We Appreciate Your Contribution to the Pot",
      imageSrc: client2
    },
    {
      name: "Dollar4Scholar",
      organization: "Dollar4Scholar",
      description: "We Appreciate Your Contribution to the Pot",
      imageSrc: client3
    },
    {
        name: "Dollar4Scholar",
        organization: "Dollar4Scholar",
        description: "We Appreciate Your Contribution to the Pot",
        imageSrc: client4
      },
      {
        name: "Dollar4Scholar",
        organization: "Dollar4Scholar",
        description: "We Appreciate Your Contribution to the Pot",
        imageSrc: client5
      },
      {
        name: "Dollar4Scholar",
        organization: "Dollar4Scholar",
        description: "We Appreciate Your Contribution to the Pot",
        imageSrc: client6
      }
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="row">
          {members.map((member, index) => (
            <Member 
              key={index}
              name={member.name}
              organization={member.organization}
              description={member.description}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Investors = () => {
  return (
    <main id="main">
      <Breadcrumbs />
      <TeamSection />
    </main>
  );
};

export default Investors;

