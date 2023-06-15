import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useClearCartMutation } from "../redux/services/cart.service";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setSnackbar } from "../redux/snackbar/snack.slice";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

interface Error {
  data: {
    message: string;
  };
}
const PaymentReject = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Empty Cart
  const [clearCart, { error, isError }] = useClearCartMutation();
  useEffect(() => {
    clearCart();
  }, []);

  //   Error handle
  useEffect(() => {
    if (error) {
      dispatch(setSnackbar({ message: (error as Error).data?.message }));
    }
  }, [isError]);
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
        <Card sx={{ width: "30vw" }}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              //  borderBottom: "1px dashed gray",
              my: 1,
            }}
          >
            <CancelIcon sx={{ color: "rgb(210, 63, 87)" }} fontSize="large" />
            <Typography variant="h5" sx={{ color: "rgb(210, 63, 87)" }}>
              Payment Rejected!
            </Typography>
          </Stack>
          <Stack alignItems={"center"}>
            <Button
              onClick={() => navigate("/ecom/products")}
              variant="contained"
              sx={{
                bgcolor: "rgb(210, 63, 87)",
                borderRadius: "16px",
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

export default PaymentReject;
