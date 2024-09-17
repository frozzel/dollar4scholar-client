import { useState, useEffect } from 'react';
import { AcceptHosted } from 'react-acceptjs';
import {getAnAcceptPaymentPage} from '../api/payment';

// const client = axios.create({
//     baseURL: 'http://localhost:8080/api/auth',
// });

// const testChild = "123456789"

export default function PaymentForm({userId, email}) {
  console.log("USR ID", userId);
  console.log("USR email", email);
    // const [response, setResponse] = useState('');
    const [formToken, setFormToken] = useState('');

    const getToken = async (userId, email) => {
        const response = await getAnAcceptPaymentPage( userId, email );
        return response;
      }

    useEffect(() => {
        getToken(userId, email).then((token) => setFormToken(token));
      }
    , []);

      return formToken ? (
        <div className="d-flex justify-content-between align-items-center px-2 ">
              <AcceptHosted
              className="d-flex justify-content-between align-items-center px-2 " 
              variant="outline-*"
                formToken={formToken}
                integration="iframe"
                settingName="hostedPaymentCustomerOptions"
                onTransactionResponse={(response) =>
                  setResponse(JSON.stringify(response, null, 2) + '\n')
                }
              >
                <AcceptHosted.Button  className="getstarted2 " variant="outline-*">
                  Subscribe
                </AcceptHosted.Button>
                <AcceptHosted.IFrameBackdrop />
                <AcceptHosted.IFrameContainer>
                  <AcceptHosted.IFrame />
                </AcceptHosted.IFrameContainer>
              </AcceptHosted>
              </div>
    //         <>
    //         	<form method="post" action="https://test.authorize.net/payment/payment" id="formAuthorizeNetTestPage" name="formAuthorizeNetTestPage">
	// 	<input type="hidden" name="token" value={formToken} />
	// 	Continue to Authorize.net to Payment Page
	// 	<button id="btnContinue">Continue to next page</button>
	// </form>         
    //         </>
            ) : (
              <div>
                ...Loading
              </div>
            );
          };


// export default PaymentForm;
