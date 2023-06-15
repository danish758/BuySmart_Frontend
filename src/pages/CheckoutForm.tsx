import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Box, Stack } from "@mui/material";

interface Error {
  message?: string;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    console.log("after ifff", elements);
    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://127.0.0.1:5173/checkout/payment_success",
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      console.log("just checking");
      setErrorMessage((error as Error)?.message || "");
    } else {
    }
  };

  return (
    <Stack
      sx={{ width: "100%", height: "100vh" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ width: "500px" }}>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button
            disabled={!stripe}
            style={{
              marginTop: "20px",
              width: "100%",
              height: "50px",
              cursor: "pointer",
              background: "#192552",
              border: "none",
              borderRadius: "4px",
              color: "#979DB1",
            }}
          >
            Pay
          </button>
          {/* Show error message to your customers */}
          {errorMessage && <h5 style={{ color: "#df1b41" }}>{errorMessage}</h5>}
        </form>
      </Box>
    </Stack>
  );
};

export default CheckoutForm;
