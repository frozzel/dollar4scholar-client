import { useState, useEffect } from 'react';
// import { AcceptHosted } from 'react-acceptjs';
import {getAnAcceptPaymentPage} from '../api/payment';


function PaymentForm({userId, email, refId, amount}) {
  console.log("USR ID", userId);
  console.log("USR email", email);
  console.log("USR refId", refId);
  console.log("USR amount", amount);
    const [formToken, setFormToken] = useState('');

    const getToken = async (userId, email, refId, amount) => {
        const response = await getAnAcceptPaymentPage( userId, email, refId, amount);
        return response;
      }

    useEffect(() => {
        getToken(userId, email, refId, amount).then((token) => setFormToken(token));
      }
    , [userId, email, refId, amount]);

      return formToken ? (
              // <div className="d-flex justify-content-between align-items-center px-2 ">
        //       <AcceptHosted
        //       className="d-flex justify-content-between align-items-center px-2 " 
        //       variant="outline-*"
        //         formToken={formToken}
        //         integration="iframe"
        //         settingName="hostedPaymentCustomerOptions"
        //         onTransactionResponse={(response) =>
        //           setResponse(JSON.stringify(response, null, 2) + '\n')
        //         }
        //       >
        //         <AcceptHosted.Button  className="getstarted2 " variant="outline-*" >
        //           Subscribe
        //         </AcceptHosted.Button >
        //         <AcceptHosted.IFrameBackdrop />
        //         <AcceptHosted.IFrameContainer>
        //           <AcceptHosted.IFrame />
        //         </AcceptHosted.IFrameContainer>
        //       </AcceptHosted>
        //       </div>
          <form method="post" action="https://test.authorize.net/payment/payment" id="formAuthorizeNetTestPage" name="formAuthorizeNetTestPage">
            <input type="hidden" name="token" value={formToken} />
             <button id="btnContinue"  className="getstarted2 border-0 ">Subscribe</button>
           </form>         
            
            ) : (
              <div>
                ...Loading
              </div>
            );
          }


export default PaymentForm;
