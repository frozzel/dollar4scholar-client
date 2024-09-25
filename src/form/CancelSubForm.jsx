/* eslint-disable react/prop-types */
import {  useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { Button } from "react-bootstrap";


export default function DonateForm({
  title,
//   initialState,
  btnTitle,
  busy,
  onSubmit,
  userName, // Add user name prop
  walletValue, // Add wallet value prop
  subscriptionId,
}) {
  
  const [userInfo, setUserInfo] = useState({ 
    name: userName || "", 
    wallet: walletValue || ""
  });

  // console.log(userInfo);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'wallet') {
      if (parseFloat(value) > 10) {
        alert("Please enter a value less than or equal to 10.");
        return;
      }
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      // Check if wallet value is empty
//   if (!userInfo.wallet.trim()) {
//     alert("Please enter a donation amount.");
//     return; // Stop the submission process
//   }
//   if(userInfo.wallet > initialState.wallet){
//     alert("Please enter a donation amount less than your current wallet balance.");
//     return; // Stop the submission process
//   }


    const formData = new FormData();
    for (let key in userInfo) {
        if (key) formData.append(key, userInfo[key]);
    }
    const walletValue = parseFloat(userInfo.wallet); // Convert wallet value to a number
    const jsonPayload =  subscriptionId; // Create JSON object
    console.log(jsonPayload);

    onSubmit(subscriptionId); // Submit the JSON object
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
                <p className="" style={{color: "#94c045", fontSize: 32}}>$2.79</p>
            </div>
          {/* <input
            placeholder="Tickets $1, max 10 entries"
            type="text"
            className="form-control border-bottom bg-transparent mb-1"
            name="wallet"
            value={userInfo.wallet}
            onChange={handleChange}
          /> */}
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-end align-items-center ">
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
