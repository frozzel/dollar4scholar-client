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

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in userInfo) {
        if (key) formData.append(key, userInfo[key]);
    }


    const getToken = async (userId, email, refId, amount) => {
      const response = await getAnAcceptPaymentPageDonor( userId, email, refId, amount);
      // console.log("Form Token function", response);
      const form = document.createElement('form');
      form.method = 'post';
      form.action = 'https://test.authorize.net/payment/payment';
      form.id = 'formAuthorizeNetTestPage';
      form.name = 'formAuthorizeNetTestPage';
 
      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token';
      tokenInput.value = response;
 
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      
      form.submit();
    }
     getToken(initialState.id, initialState.email, initialState.type, Number(userInfo.wallet)); 
  
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
  
      <div className="d-flex justify-content-center align-items-center ">


      <Button
          className="getstarted2"
          type="submit"
          variant="outline-*"
        >
          {busy ? <ImSpinner3 className="spinner-border" /> : btnTitle}

        </Button>

        </div>

    </form>
    
  );
}
