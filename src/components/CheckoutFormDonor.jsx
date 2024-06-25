import { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { getSessionDataDonor } from "../api/scholarship";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutFormDonor = () => {
    const [cusId, setCusId] = useState('');
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');
  
    const fetchSession = async (transactionAmount) => {
      const data = await  getSessionDataDonor(transactionAmount);
      setClientSecret(data.clientSecret);
    }
  
  
    useEffect(() => {
      // Extracting id and amount from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      const amount = parseInt(searchParams.get("amount"), 10); // Using parseInt with base 10  
      setCusId(searchParams.get("cusRef"));
      setEmail(searchParams.get("email"));
      const transactionAmount = { transactionAmount: amount, userId: id, email: searchParams.get("email"), client_reference_id: searchParams.get("cusRef"), amount: amount};
      fetchSession(transactionAmount);
    }, []);

  return (
    <main id="main" style={{marginTop: "200px", marginBottom: "20px"}}>
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
          client_reference_id={cusId}
          customer={{id: cusId, email: email}} // Corrected
          customerEmail={email} // Add this line to pre-populate the email


        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
    </main>
  )
}


export default CheckoutFormDonor;