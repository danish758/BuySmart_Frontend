import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useClientSecretQuery } from "../../redux/services/payment.service";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51NFxvWEqQQyDJWzOkeKkPfEZOe67UaX5g78VPsgNsJD3M3t85qZo5CiN9HnH7em48cPfHmS7WauQDUfxUnfMvrGH00UWkimLLR"
);
const appearance = {
  // theme: "Bubblegum",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    fontFamily: "Ideal Sans, system-ui, sans-serif",
    spacingUnit: "5px",
    borderRadius: "4px",
    // See all possible variables below
  },
};
const Wrapper = () => {
  const { data } = useClientSecretQuery();
  const options = {
    clientSecret: data?.client_secret,
    appearance,
  };

  return (
    <>
      {data ? (
        <Elements stripe={stripePromise} options={options}>
          <Outlet />
        </Elements>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>LOADING...</h1>
        </Box>
      )}
    </>
  );
};

export default Wrapper;
