// Note: Hero component for Home page
import { useEffect } from 'react';
import backgroundImage from '../../assets/img/AdobeStock_591753369.mp4';
import AOS from 'aos';
import { useAuth } from "../../hooks";

export default function Hero() {

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const userId = authInfo.profile?.id;

  useEffect(() => {
    AOS.init({duration: 2000, once: true});
  }, [])
  if(isLoggedIn){
  return (<>
    <section id="hero" 
    // style={{ 
    //   marginTop: "100px", 
    // }}
    >
      
        <div className="hero-container" data-aos="fade-up">
        <video  muted  loop autoPlay  >
          <source src={backgroundImage} type="video/mp4" />
        </video>
        </div>
        <div className="hero-container" data-aos="fade-up">
        
          <h1 className='mt-5'>Scholarships Made Simple!</h1>
          <form action="" method="post">
            {/* <input type="email" placeholder="Student Email" name="email" /> */}
            <a href={"/dashboard/"+ userId} className="btn-get-started2 scrollto">Join this months scholarship program!</a>
          </form>
          {/* <a href={"/dashboard/"+ userId} className="btn-get-started mb-3 scrollto">Donate to the Scholarship!</a> */}
        </div>
   
      </section>
      </>
  )
} else {
  return (<>
    <section id="hero" 
    // style={{ 
    //   backgroundImage: `url(${backgroundImage})` 
    // }}
    >
      
        <div className="hero-container mt-3 mb-3" data-aos="fade-up">
        <video  muted  loop autoPlay  >
          <source src={backgroundImage} type="video/mp4" />
        </video>
        </div>
        <div className="hero-container" data-aos="fade-up">
          <h1 className='mt-5'>Scholarships Made Simple!</h1>
          <form action="" method="post">
            {/* <input type="email" placeholder="Student Email" name="email" /> */}
            <a href={"/auth/signIn"} className="btn-get-started2 scrollto">Join this months scholarship program!</a>
          </form>
          {/* <a href={"/auth/signIn"} className="btn-get-started scrollto">Donate to the Scholarship!</a> */}
        </div>
   
      </section>
      </>
  )
}
}


  