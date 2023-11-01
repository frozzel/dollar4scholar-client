import React, { useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { getSessionData } from "../api/scholarship";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51O5rZwDJqC99h37UQJhl03wcFWHOb46p3x4mnXZ8bmDQX7fCTLYcKB9YbL6yoR6aZFIgHl9ndAU9FVjaX2hNDJX900DwIGs0aI");

const CheckoutForm = () => {
    const [cusId, setCusId] = useState('');
    const [email, setEmail] = useState('');
    const [clientSecret, setClientSecret] = useState('');
  
    const fetchSession = async (transactionAmount) => {
      const data = await  getSessionData(transactionAmount);
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
    <main id="main" style={{marginTop: "200px"}}>
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


export default CheckoutForm;