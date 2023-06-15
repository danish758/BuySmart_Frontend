import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useClearCartMutation } from "../redux/services/cart.service";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setSnackbar } from "../redux/snackbar/snack.slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

interface Error {
  data: {
    message: string;
  };
}
interface Payment {
  amount: number;
}
const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<Payment>({ amount: 0 });
  console.log("payment", payment);
  // Empty Cart
  const [clearCart, { error, isError }] = useClearCartMutation();

  const stripe = useStripe();
  const [message, setMessage] = useState("");
  //   Error handle
  useEffect(() => {
    if (error) {
      dispatch(setSnackbar({ message: (error as Error).data?.message }));
    }
  }, [isError]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret =
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      ) || "";

    // Retrieve the PaymentIntent
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      // Inspect the PaymentIntent `status` to indicate the status of the payment
      // to your customer.
      //
      // Some payment methods will [immediately succeed or fail][0] upon
      // confirmation, while others will first enter a `processing` state.
      //
      if (paymentIntent) {
        console.log("paymentIntent", paymentIntent);

        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            setPayment(paymentIntent);
            clearCart();
            break;

          case "processing":
            setMessage(
              "Payment processing. We'll update you when payment is received."
            );
            break;

          case "requires_payment_method":
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      }
    });
  }, [stripe]);
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#FAFCFF",
        }}
      >
        <Card sx={{ width: "25vw", px: 3, pb: 3 }}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            sx={{
              //  borderBottom: "1px dashed gray",
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <CheckCircleIcon color="success" fontSize="large" />
              <Typography variant="h5" sx={{ color: "#2e7d32" }}>
                {message}
              </Typography>
            </Box>
            <Box sx={{ color: "#9e9e9e" }}>
              <Stack
                // width={"100%"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <h4>Amount Paid : </h4>
                <h4>${payment?.amount}</h4>
              </Stack>
            </Box>
          </Stack>
          <Stack alignItems={"center"} sx={{}}>
            <Button
              fullWidth
              onClick={() => navigate("/ecom/products")}
              variant="contained"
              sx={{
                bgcolor: "#2e7d32",
                borderRadius: "4px",
                mt: 2,
                mb: 1,
                "&:hover": {
                  backgroundColor: "rgb(210, 63, 87)",
                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
                textTransform: "none",
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Card>
      </Box>
    </>
  );
};

export default PaymentSuccess;
