import React, { useEffect, useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from "@stripe/react-stripe-js";

const StripeProvider = ({ children }) => {
  const isLocal = !!window.location.host.match(/local/);
  const isDev = !!window.location.host.match(/dev/);
  const STRIPE_PUBLISHABLE_KEY = (isLocal || isDev) ?
    // test Stripe Publishable Key
    'pk_test_CvOaedJTBPQLmI0YSnQsitzN' :
    // production Stripe Publishable Key
    'pk_dGKqAIFsUQonSYGPBM9Rek71IHOcL'
    ;

  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    if (!stripe) {
      setStripe(loadStripe(STRIPE_PUBLISHABLE_KEY))
    }
  }, [])

  return (<Elements
    stripe={stripe}
    options={{
      fonts: [{
        cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
      }],
    }}
  >
    {children}
  </Elements>)
}

export default StripeProvider
