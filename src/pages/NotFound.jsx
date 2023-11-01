import React from "react";
import image from '../assets/img/8030430_3828537.jpg'
import { Container,  } from 'react-bootstrap';

export default function NotFound() {
  return (<>
    {/* <main id="main" className=""> */}
    <div className="text-center justify-content-center" style={{marginTop: "75px", justifyContent: "center", backgroundColor: '#FAF9F6'}}>
      
    <img src={image} alt="404" className="img-fluid justify-content-center center-block" style={{maxWidth: "30%", }} />
    
    </div>
  <div className="text-center"><small><a href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_8030430.htm#query=404%20page%20found&position=3&from_view=keyword&track=ais">Image by storyset</a> on Freepik</small></div>

  {/* </main> */}
  </>
  );
}
