import React, { useEffect } from 'react'
import AOS from 'aos';


export default function Member({ name, university, description, imageSrc }) {
    
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
        <img src={imageSrc} className="img-fluid" alt={name} />
        <div className="social">
          <a href=""><i className="bi bi-twitter"></i></a>
          <a href=""><i className="bi bi-facebook"></i></a>
          <a href=""><i className="bi bi-instagram"></i></a>
          <a href=""><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
      <div className="member-info">
        <h4>{name}</h4>
        <span>{university}</span>
        <p>{description}</p>
      </div>
    </div>
  </div>
  )
}
