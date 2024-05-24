// Desc: Footer component for Dollar4Scholar
// import './footer.css'
import { Link } from 'react-router-dom'


export default function Footer() {
  return (
  <>
  <footer id="footer"  >
  <div className="footer-top " style={{padding: "2rem"}}>
    <div className="container"  >
        <div className="row" >
{/* 
        <div className="col-lg-3 col-md-6 footer-info">
            <h3>Dollar4Scholar</h3>
            <p>The University Powerball will provide scholarship opportunities for students currently enrolled
              in an accredited college or University. The way to enter to win the weekly raffle is by submitting
              a payment of $1 along with school credentials and an email address to be entered the lottery.
              The earning of the week will be raffled off through a randomized system to generate a winner.
              The winners name will then appear on the site with a “Congratulations, you’re this week’s
              WINNER!!!”</p>
          </div> */}

  


          </div>
       </div>
    </div>

    <div className="container" >
      <div className="copyright" style={{padding: "1rem"}}><small>
        &copy; Copyright 2023 - <strong><span>Dollar4Scholar</span></strong>. All Rights Reserved</small>
        <div>

          {/* <p><small >* Scholarship Total before 15% tax and site fees</small><br /> */}
          <p>
          <small><small>Designed by <Link className="text-white" to="https://cyrusgroupinnovations.com">Cyrus Group Innovations</Link></small></small></p>


        </div>
      </div>
    </div>
  </footer>
    

  </>
  )
}
