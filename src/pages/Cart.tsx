import { Grid, Button, Stack, Typography, Box } from "@mui/material";
import { Product } from "./Products";
import CartCard from "../components/cart/CartCard";
import { useAppSelector } from "../redux/hooks/hooks";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [totalPrice, settotalPrice] = useState(0);

  const products = useAppSelector((state) => state?.cartSlice?.cart);
  // const [checkout, { isSuccess, data, error: paymentError, isError }] =
  //   useCheckoutMutation();
  const navigate = useNavigate();
  const handlePayment = async () => {
    navigate("/checkout");
    // let res = await checkout({
    //   items: products,
    // });
    // console.log("stripe resss", res);
  };

  // Calculate Total Price
  useEffect(() => {
    let total_price = 0;
    products?.map((p: Product) => {
      total_price = total_price + p?.price * p?.count;
    });
    settotalPrice(total_price);
  }, [JSON.stringify(products)]);
  return (
    <>
      <Grid container rowSpacing={1}>
        {products.length > 0 ? (
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
              p: 2,
            }}
          >
            {products?.map((product: Product) => (
              <Grid key={product?._id} item xs={12}>
                <CartCard prod={product} />
              </Grid>
            ))}
          </Card>
        ) : (
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Typography variant="h6" sx={{ color: "#b71c1c" }}>
              Oops! Cart is empty.
            </Typography>
          </Box>
        )}
        {products.length > 0 && (
          <Stack sx={{ width: "100%" }} alignItems={"end"}>
            <Button
              onClick={handlePayment}
              variant="contained"
              sx={{
                bgcolor: "#AECFFA",
                borderRadius: "16px",
                mt: 2,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#AECFFA",
                  borderColor: "#AECFFA",
                  boxShadow: "none",
                },
                textTransform: "none",
                color: "#558b2f",
              }}
            >
              {`Pay $${totalPrice} Now`}
            </Button>
          </Stack>
        )}
      </Grid>
    </>
  );
};

export default Cart;
