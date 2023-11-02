// Note: Hero component for Home page
import { useEffect } from 'react';
import backgroundImage from '../../assets/img/AdobeStock_591753369_Video_Hd_Preview.mp4';
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
    //   backgroundImage: `url(${backgroundImage})` 
    // }}
    >
      
        <div className="hero-container" data-aos="fade-up">
        <video  muted  loop autoPlay  >
          <source src={backgroundImage} type="video/mp4" />
        </video>
        </div>
        <div className="hero-container" data-aos="fade-up">
          <h1>Add a Play To Your Financial Aid!</h1>
          <form action="" method="post">
            {/* <input type="email" placeholder="Student Email" name="email" /> */}
            <a href={"/dashboard/"+ userId} className="btn-get-started2 scrollto">Enter to win this week’s pot!</a>
          </form>
          <a href={"/dashboard/"+ userId} className="btn-get-started scrollto">Donate to the pot!</a>
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
      
        <div className="hero-container" data-aos="fade-up">
        <video  muted  loop autoPlay  >
          <source src={backgroundImage} type="video/mp4" />
        </video>
        </div>
        <div className="hero-container" data-aos="fade-up">
          <h1>Add a Play To Your Financial Aid!</h1>
          <form action="" method="post">
            {/* <input type="email" placeholder="Student Email" name="email" /> */}
            <a href={"/auth/signIn"} className="btn-get-started2 scrollto">Enter to win this week’s pot!</a>
          </form>
          <a href={"/auth/signIn"} className="btn-get-started scrollto">Donate to the pot!</a>
        </div>
   
      </section>
      </>
  )
}
}


  