// Desc: Footer component for Dollar4Scholar
// import './footer.css'


export default function Footer() {
  return (
  <>
  <footer id="footer"  bg="#223D59">
  <div className="footer-top " bg="#223D59">
    <div className="container" bg="#223D59">
        <div className="row">

        <div className="col-lg-3 col-md-6 footer-info">
            <h3>Dollar4Scholar</h3>
            <p>The University Powerball will provide scholarship opportunities for students currently enrolled
              in an accredited college or University. The way to enter to win the weekly raffle is by submitting
              a payment of $1 along with school credentials and an email address to be entered the lottery.
              The earning of the week will be raffled off through a randomized system to generate a winner.
              The winners name will then appear on the site with a “Congratulations, you’re this week’s
              WINNER!!!”</p>
          </div>

          <div className="col-lg-3 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="//DonorSpotLight">Donor Spotlight</a></li>
              <li><a href="/Winner">Winner</a></li>
              <li><a href="/Contact">Contact</a></li>
              <li><a href="/About">About</a></li>
              
              <li><a href="/auth/SignIn">Login</a></li>
              
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 footer-contact">
            <h4>Contact Us</h4>
            <p>
              New Orleans <br></br>
              LA<br></br>
              United States <br></br>
              <strong>Phone:</strong> (678) 555-5555<br></br>
              <strong>Email:</strong> info@dollar4scholar.com<br></br>
            </p>
         

         <div className="social-links">
              <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
              <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>

        </div>

        <div className="col-lg-3 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna veniam enim veniam illum dolore legam minim quorum culpa amet magna export quem marada parida nodela caramase seza.</p>
            {/* <form action="" method="post">
              <input type="email" name="email"><input type="submit" value="Subscribe" ></input>
            </form> */}
          </div>



        </div>
    </div>
      
    </div>

    <div className="container">
      <div className="copyright">
        &copy; Copyright 2023 - <strong><span>Dollar4Scholar</span></strong>. All Rights Reserved
      </div>

    </div>
  </footer>
    

  </>
  )
}
