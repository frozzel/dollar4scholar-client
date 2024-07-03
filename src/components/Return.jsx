import  { useState, useEffect } from "react";
import {Link, Navigate} from "react-router-dom";
import { getSessionStatus } from "../api/scholarship";
import logo from "../assets/img/Dollar4Scholar-Logo.png";
import {BsCheckCircleFill, BsCalendar2DateFill} from "react-icons/bs";
import {BiSolidUser} from "react-icons/bi";
import {MdEmail} from "react-icons/md";
import {GrStripe} from "react-icons/gr";
import {FaCalendarCheck} from "react-icons/fa";



const Return = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [invoiceId, setInvoiceId] = useState('');
    const [session, setSession] = useState('');
    const [amount, setAmount] = useState('');
    const [userId, setUserId] = useState('');
  
  
    const fetchSession = async (sessionId) => {
      const data = await getSessionStatus(sessionId);
      setStatus(data.status);
      setCustomerEmail(data.customer_email);
      setInvoiceId(data.session.id);
      setSession(data.session);
      setAmount(data.session.metadata.amount);
      setUserId(data.session.metadata.userId);
    }
  
    useEffect(() => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get('session_id');
  
      fetchSession(sessionId);
    }, []);
  
    if (status === 'open') {
      return (
        <Navigate to="/checkout" />
      )
    }
    const {customer_details, client_reference_id, created, amount_total, mode} = session;
    const total = (amount_total/100).toFixed(2)
    const fees = (total - amount).toFixed(2)
    if (status === 'complete' && mode === 'subscription') {
      return (<main id="main" style={{marginTop: "100px", backgroundColor: "#eee"}}>
        <div className="card" >
      <div className="card-body">
        <div className="container mb-5 mt-3">
          
  
          <div className="container">
            <div className="col-md-12">
              <div className="text-center">
                <i className="far fa-building fa-4x ms-0" style={{ color: '#8f8061' }}></i>
                <img alt="Dollar 4 scholar logo" src={logo} className="d-inline-block align-top img-fluid logo" style={{width: "150px"}}/>

              </div>
            </div>
            <div className="row">
              <div className="col-xl-8">
              <p className="text-muted">Customer Info:</p>
                <ul className="list-unstyled">
                  <li className="text-muted"><BiSolidUser className="" style={{ color: '#94c045' }}></BiSolidUser> Name: {customer_details.name}</li>
                  <li className="text-muted"><MdEmail className="fas fa-circle" style={{ color: '#94c045' }}></MdEmail> Email: {customerEmail}</li>
                  <li className="text-muted"><FaCalendarCheck className="fas fa-circle" style={{ color: '#94c045' }}></FaCalendarCheck> UserId: {userId}</li>
                  
                </ul>
              </div>
              <div className="col-xl-4">
                <p className="text-muted">Invoice</p>
                <ul className="list-unstyled">
                  <li className="text-muted"><GrStripe className="fas fa-circle" style={{ color: '#94c045' }}></GrStripe> <span className="fw-bold">Stripe ID:</span> {client_reference_id}</li>
                  <li className="text-muted"><BsCalendar2DateFill className="fas fa-circle" style={{ color: '#94c045' }}></BsCalendar2DateFill> <span className="fw-bold">Created: </span>{new Date(created * 1000).toLocaleString()}</li>
                  <li className="text-muted"><BsCheckCircleFill className="fas fa-circle" style={{ color: '#94c045' }}></BsCheckCircleFill> <span className="me-1 fw-bold">Status:</span><span className="badge bg-info text-black fw-bold">Paid</span></li>
                </ul>
              </div>
            </div>
            <div className="row my-2 mx-1 justify-content-center">
              <div className="col-md-2 mb-4 mb-md-0">
                <div className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block" data-ripple-color="light">
                  <img src='https://www.trusselltrust.org/wp-content/uploads/sites/2/2020/11/tfc-wallet-icon@2x-300x300.png' className="w-100" height="" alt="Subscribed Monthly" />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'hsla(0, 0%, 98.4%, 0.2)' }}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-7 mb-4 mb-md-0">
                <p className="fw-bold">Subscription</p>
                <p className="mb-1">
                  <span className="text-muted me-2">Monthly:</span><span>$2.79</span>
                </p>
                {/* <p>
                  <span className="text-muted me-2">Color:</span><span>Gray</span>
                </p> */}
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <h5 className="mb-2">
                  <p className="text-muted me-2 small align-middle" ></p><span className="align-middle" style={{fontSize: "3rem"}}>$2.79</span>
                </h5>
                <p className="text-info"><small>Thank you!</small></p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xl-8">
                <Link to={"/dashboard/"+ userId} className="btn btn-outline-info ">
                <p className="p-4">Go to your Dashboard to View Subscription Status</p>
                </Link>
              </div>
              <div className="col-xl-3 mt-2">
                <ul className="list-unstyled">
                  {/* <li className="text-muted ms-3"><span className="text-black me-4">Sub Total</span>${amount}</li>
                  <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Card Fees</span>${fees}</li> */}
                </ul>
                <p className=" float-start"><span className="text-black me-3"> Total Amount</span><span style={{ fontSize: '25px', color: "#94c045" }}>${total}</span></p>
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </div>
    <div className="container mb-5 mt-3">
    <div className="row d-flex align-items-baseline">
            <div className="col-xl-12">
              <p style={{ color: '#0063aa', fontSize: '1rem', textAlign: "center", wordBreak: "break-word" }}>
                Session &gt;&gt; <strong>ID: #{invoiceId}</strong>
              </p>
            </div>
          </div>
          </div>
        </main>
      )
    } else if (status === 'complete' && mode === 'payment') {
      return(<>
      <main id="main" style={{marginTop: "100px", backgroundColor: "#eee"}}>
        <div className="card" >
      <div className="card-body">
        <div className="container mb-5 mt-3">
          
  
          <div className="container">
            <div className="col-md-12">
              <div className="text-center">
                <i className="far fa-building fa-4x ms-0" style={{ color: '#8f8061' }}></i>
                <img alt="Dollar 4 scholar logo" src={logo} className="d-inline-block align-top img-fluid logo" style={{width: "150px"}}/>

              </div>
            </div>
            <div className="row">
              <div className="col-xl-8">
              <p className="text-muted">Customer Info:</p>
                <ul className="list-unstyled">
                  <li className="text-muted"><BiSolidUser className="" style={{ color: '#94c045' }}></BiSolidUser> Name: {customer_details.name}</li>
                  <li className="text-muted"><MdEmail className="fas fa-circle" style={{ color: '#94c045' }}></MdEmail> Email: {customerEmail}</li>
                  <li className="text-muted"><FaCalendarCheck className="fas fa-circle" style={{ color: '#94c045' }}></FaCalendarCheck> UserId: {userId}</li>
                  
                </ul>
              </div>
              <div className="col-xl-4">
                <p className="text-muted">Invoice</p>
                <ul className="list-unstyled">
                  <li className="text-muted"><GrStripe className="fas fa-circle" style={{ color: '#94c045' }}></GrStripe> <span className="fw-bold">Stripe ID:</span> {client_reference_id}</li>
                  <li className="text-muted"><BsCalendar2DateFill className="fas fa-circle" style={{ color: '#94c045' }}></BsCalendar2DateFill> <span className="fw-bold">Created: </span>{new Date(created * 1000).toLocaleString()}</li>
                  <li className="text-muted"><BsCheckCircleFill className="fas fa-circle" style={{ color: '#94c045' }}></BsCheckCircleFill> <span className="me-1 fw-bold">Status:</span><span className="badge bg-info text-black fw-bold">Paid</span></li>
                </ul>
              </div>
            </div>
            <div className="row my-2 mx-1 justify-content-center">
              <div className="col-md-2 mb-4 mb-md-0">
                <div className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block" data-ripple-color="light">
                  <img src='https://www.trusselltrust.org/wp-content/uploads/sites/2/2020/11/tfc-wallet-icon@2x-300x300.png' className="w-100" height="" alt="Funds Added to Wallet" />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: 'hsla(0, 0%, 98.4%, 0.2)' }}></div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-7 mb-4 mb-md-0">
                <p className="fw-bold">Wallet</p>
                <p className="mb-1">
                  <span className="text-muted me-2">Added:</span><span>${amount}</span>
                </p>
                {/* <p>
                  <span className="text-muted me-2">Color:</span><span>Gray</span>
                </p> */}
              </div>
              <div className="col-md-3 mb-4 mb-md-0">
                <h5 className="mb-2">
                  <p className="text-muted me-2 small align-middle" ></p><span className="align-middle" style={{fontSize: "3rem"}}>${amount}</span>
                </h5>
                <p className="text-info"><small>Thank you!</small></p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-xl-8">
                <Link to={"/dashboard/"+ userId} className="btn btn-outline-info ">
                <p className="p-4">Go to your Dashboard to begin buying into the Pot!</p>
                </Link>
              </div>
              <div className="col-xl-3 mt-2">
                <ul className="list-unstyled">
                  <li className="text-muted ms-3"><span className="text-black me-4">Sub Total</span>${amount}</li>
                  <li className="text-muted ms-3 mt-2"><span className="text-black me-4">Card Fees</span>${fees}</li>
                </ul>
                <p className=" float-start"><span className="text-black me-3"> Total Amount</span><span style={{ fontSize: '25px', color: "#94c045" }}>${total}</span></p>
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </div>
    <div className="container mb-5 mt-3">
    <div className="row d-flex align-items-baseline">
            <div className="col-xl-12">
              <p style={{ color: '#0063aa', fontSize: '1rem', textAlign: "center", wordBreak: "break-word" }}>
                Session &gt;&gt; <strong>ID: #{invoiceId}</strong>
              </p>
            </div>
          </div>
          </div>
        </main>
        </>)
          }
  
    return null;
  }



export default Return;