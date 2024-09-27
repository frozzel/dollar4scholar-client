import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Button } from "react-bootstrap";
import {getAnAcceptPaymentPageDonor} from '../api/payment';


export default function WalletForm({
  title,
  initialState,
  btnTitle,
  busy,
//   onSubmit, // old onSubmit prop
  userName, // Add user name prop
  walletValue, // Add wallet value prop

}) {
  const [userInfo, setUserInfo] = useState({ 
    name: userName || "", 
    wallet: walletValue || ""
  });
  const [formToken, setFormToken] = useState('');

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Info", userInfo);
    const formData = new FormData();
    for (let key in userInfo) {
        if (key) formData.append(key, userInfo[key]);
    }
    const getToken = async (userId, email, refId, amount) => {
      const response = await getAnAcceptPaymentPageDonor( userId, email, refId, amount);
      setFormToken(response);
      return console.log("Form Token function", response);
    }
    getToken(initialState.id, initialState.email, initialState.type, Number(userInfo.wallet));
     // Perform a POST request using a dynamically created form
     const form = document.createElement('form');
     form.method = 'post';
     form.action = 'https://test.authorize.net/payment/payment';

     const tokenInput = document.createElement('input');
     tokenInput.type = 'hidden';
     tokenInput.name = 'token';
     tokenInput.value = formToken;

     form.appendChild(tokenInput);
     document.body.appendChild(form);
     
     form.submit();


    // window.location.href = `https://test.authorize.net/payment/payment/${formToken}`;
    // const walletValue = parseFloat(userInfo.wallet); // Convert wallet value to a number
    // const jsonPayload = { wallet: walletValue }; // Create JSON object

    // onSubmit(jsonPayload); // Submit the JSON object

     // Redirect to checkout page with query parameters
  // const queryString = `?cusRef=${initialState.stripeId}&id=${initialState.id}&amount=${userInfo.wallet}&email=${initialState.email}`;

  // window.location.href = `${import.meta.env.VITE_DOMAIN}/checkoutDonor${queryString}`;
  };

  return (
    <form
      className="bg-light  p-3 rounded"
      onSubmit={handleSubmit}
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
                <i className="bi bi-coin " style={{ color: '#94c045',  fontSize: 32}} ></i>
                <p className="" style={{color: "#94c045", fontSize: 32}}>${initialState.wallet}</p>
            </div>
          <input
            placeholder="How much do you want to add?"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="wallet"
            value={userInfo.wallet}
            onChange={handleChange}
          />
        </div>
      </div>
     
      <hr />
      {/* <div className="d-flex justify-content-center align-items-center " style={{fontSize: 12, color: "red"}}>Coming Soon! </div> */}
      
      {/* <div className="d-flex justify-content-end align-items-center "> */}
      <div className="d-flex justify-content-center align-items-center ">
        {/* {userInfo.wallet > 0 ? (
        <PaymentFormDonor userId={initialState.id} email={initialState.email} refId={initialState.type} amount={userInfo.wallet}  />
        ) : (<div className="d-flex justify-content-center align-items-center " style={{fontSize: 12, color: "red"}}>Please enter a valid amount! </div>)}
     */}

      <Button
          className="getstarted2"
          type="submit"
          variant="outline-*"
        >
          {busy ? <ImSpinner3 className="spinner-border" /> : btnTitle}

        </Button>
{/* 
          <Button variant="outline-*" target="_blank" href="https://www.skrill.com/en-us/business/integration/" >

          <img alt="Pay by Skrill purple button 245x75 PNG" src="https://www.skrill.com/fileadmin/content/images/brand_centre/Pay_by_Skrill/skrill-payby-btn-purple_245x75.png" width="245" height="75" />

          </Button> */}


        </div>
        {/* <div className="d-flex justify-content-center align-items-center " style={{fontSize: 9, color: "red"}}>We are changing are payment provider please wait while we update our system!</div> */}

    </form>
    
  );
}
