import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Button } from "react-bootstrap";
import PaymentForm from "../components/PaymentForm";
// import { Link } from "react-router-dom";


export default function WalletForm({
  title,
  initialState,
  btnTitle,
  busy,
  // onSubmit, // old onSubmit prop
  userName, // Add user name prop
  walletValue, // Add wallet value prop

}) {
  const [userInfo, setUserInfo] = useState({ 
    name: userName || "", 
    wallet: walletValue || ""
  });
  console.log("User Info", initialState,);

  const handleChange = ({ target }) => {
    console.log(target);
    const { value, name } = target;
    console.log(value, name);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // for (let key in userInfo) {
    //     if (key) formData.append(key, userInfo[key]);
    // }
    const walletValue = parseFloat(userInfo.wallet); // Convert wallet value to a number
    // const jsonPayload = { wallet: walletValue }; // Create JSON object

    // onSubmit(jsonPayload); // Submit the JSON object

     // Redirect to checkout page with query parameters
  // const queryString = `?cusRef=${initialState.stripeId}&id=${initialState.id}&amount=${userInfo.wallet}&email=${initialState.email}`;
  const queryString = `?cusRef=${initialState.stripeId}&id=${initialState.id}&amount=2.79&email=${initialState.email}`;

  window.location.href = `${import.meta.env.VITE_DOMAIN}/checkout${queryString}`;
  };
  const amount = 2.79;
  return (<>
    <div
      className="bg-light  p-3 rounded"
      // onSubmit={handleSubmit}
    >
      <div className="d-flex justify-content-center align-items-center mb-3" style={{minWidth: "300px"}}>
        <h1 className="font-weight-bold text-xl text-dark">
          {title}
        </h1>

      </div>
      <hr />
      <div className="d-flex flex-column flex-md-row align-items-stretch">
        <div className="flex-grow d-flex flex-column space-y-2 w-100">
          <div className="d-flex justify-content-evenly align-items-inline  ">

          {(initialState.subscription === false || initialState.subscription === undefined) ? (
           <><i className="bi bi-x-circle" style={{ color: '#f00',  fontSize: 32}} ></i>
            <p className="" style={{color: "#f00", fontSize: 32}}>No Subscription</p></>
          ):(<><i className="bi bi-check-circle " style={{ color: '#94c045',  fontSize: 32}} ></i>
          <p className="" style={{color: "#94c045", fontSize: 32}}>Subscribed!</p></>)}
            {/* <div className="d-flex justify-content-evenly align-items-inline  "> */}
                {/* <i className="bi bi-check-circle " style={{ color: '#94c045',  fontSize: 32}} ></i>
                <p className="" style={{color: "#94c045", fontSize: 32}}>{initialState.subscription === true ? ("Subscribed"):("Not Subscribed")}</p> */}
            </div>
            <div className="d-flex justify-content-center align-items-center " style={{fontSize: 20, color: '#94c045'}}>Only $2.79 per Month</div>
            <div className="d-flex justify-content-center align-items-center " style={{fontSize: 16, color: "black"}}>$1.50 Scholarship Fund </div>
            <div className="d-flex justify-content-center align-items-center " style={{fontSize: 16, color: "black"}}>$1.29 Operational Cost</div>
                <br />
          {/* <input
            placeholder="2.79"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="wallet"
            value={userInfo.wallet}
            onChange={handleChange}
          /> */}
        </div>
      </div>
     
      <hr />
      <div className="d-flex justify-content-center align-items-center " style={{fontSize: 25, color: "red"}}>Coming Soon! </div>
      
      {/* <div className="d-flex justify-content-end align-items-center "> */}
      <div className="d-flex justify-content-center align-items-center ">
     
       
      <PaymentForm userId={initialState.id} email={initialState.email} refId={initialState.type} amount={amount} />
      {/* <Button
          className="getstarted2"
          type="submit"
          variant="outline-*"
        >
          {busy ? <ImSpinner3 className="spinner-border" /> : btnTitle}

        </Button> */}
{/* 
          <Button variant="outline-*" target="_blank" href="https://www.skrill.com/en-us/business/integration/" >

          <img alt="Pay by Skrill purple button 245x75 PNG" src="https://www.skrill.com/fileadmin/content/images/brand_centre/Pay_by_Skrill/skrill-payby-btn-purple_245x75.png" width="245" height="75" />

          </Button> */}


        </div>
        <div className="d-flex justify-content-center align-items-center " style={{fontSize: 9, color: "red"}}>We are changing are payment provider please wait while we update our system!</div>

    </div>
    
    
    </>);
}
