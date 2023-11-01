import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../assets/img/Dollar4Scholar-Logo.png';
import  NotificationProvider from '../context/NotificationProvider';
import { useAuth } from '../hooks';


export default function Header() {
  const {authInfo, handleLogout} = useAuth()
  const {isLoggedIn} = authInfo;
  const {profile} = authInfo;
  return (<>
 
      <header id="header" className="header fixed-top d-flex align-items-center">
      <NotificationProvider>
<Navbar id="header" className="fixed-top" collapseOnSelect expand="lg" >
      <div className="container">
        <Navbar.Brand href="/" className='logo'>
          <img
            alt="Dollar 4 scholar logo"
            src={logo}
            className="d-inline-block align-top img-fluid logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" className="mobile-nav-toggle" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <Nav>
            {/* <NavDropdown title="Partners & Affiliates" id="partners-dropdown">
              <NavDropdown.Item href="/collegesnuniversities">Universities</NavDropdown.Item>
              <NavDropdown.Item href="/investors">Investors</NavDropdown.Item>
            </NavDropdown> */}
            
            <Nav.Link href="/about">How It Works</Nav.Link>
            <Nav.Link href="/winner">Winner Spotlight</Nav.Link>
            <Nav.Link href="/DonorSpotLight">Donor Spotlight</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
            {isLoggedIn ? (<>
            <Nav.Link className='' href={"/dashboard/"+ profile?.id} >Dashboard</Nav.Link>
            <Nav.Link className='getstarted' href="/auth/signIn" onClick={handleLogout}>LogOut/Exit</Nav.Link></>
            ) : (<><Nav.Link className='getstarted' href="/auth/signIn">Login/Sign Up</Nav.Link></>)}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
    </NotificationProvider>
    </header>
  </>

  )
}
