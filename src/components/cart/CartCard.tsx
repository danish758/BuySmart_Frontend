import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Product, ProductCardProps } from "../../pages/Products";
import {
  useAddToCartMutation,
  useRemoveCartMutation,
} from "../../redux/services/cart.service";
import { setSnackbar } from "../../redux/snackbar/snack.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

interface Error {
  data: {
    message: string;
  };
}
const CartCard: React.FC<ProductCardProps> = ({ prod }) => {
  const [removeCart, { error, isError }] = useRemoveCartMutation();

  const [
    addToCart,
    {
      error: addToCartError,
      isError: isAddToCartError,
      isSuccess: isAddToCartSuccess,
      data: addToCartData,
    },
  ] = useAddToCartMutation();
  const products = useAppSelector((state) => state?.cartSlice?.cart);
  console.log("products", products);
  const dispatch = useAppDispatch();
  // J
  useEffect(() => {
    if (error) {
      dispatch(setSnackbar({ message: (error as Error).data.message }));
    }
  }, [isError]);

  //

  useEffect(() => {
    if (addToCartError) {
      dispatch(
        setSnackbar({ message: (addToCartError as Error).data.message })
      );
    }
    if (isAddToCartSuccess) {
      dispatch(
        setSnackbar({ message: addToCartData?.message, severity: "success" })
      );
    }
  }, [isAddToCartError, isAddToCartSuccess]);
  const handleAddToCart = async (p: Product) => {
    await addToCart({ product: p?._id });
  };
  const handleRemoveCart = async (p: Product) => {
    await removeCart({ product: p._id });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      <img
        src={prod?.picture}
        width={"200px"}
        height="auto"
        style={{ objectFit: "contain" }}
      />

      <Typography
        variant="h4"
        style={{
          marginBottom: "8px",
          color: "#373F50",
          textTransform: "none",
        }}
      >
        {prod?.product}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          onClick={() => handleRemoveCart(prod)}
          sx={{
            border: "1px solid #D23F57",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="h6">-</Typography>
        </Box>
        <h3
          style={{
            fontWeight: 600,
            lineHeight: 1.5,
            color: "#2e7d32",
            textTransform: "none",
          }}
        >
          {prod?.count}
        </h3>
        <Box
          onClick={() => handleAddToCart(prod)}
          sx={{
            border: "1px solid #D23F57",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="h6">+</Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          // variant="h6"
          sx={{ fontWeight: 600, color: "#D23F57" }}
        >
          {`$${prod?.price * prod?.count}`}
        </Typography>
      </Box>
      {/* <Box
        onClick={() => handleRemoveCart(prod)}
        sx={{
          border: "1px solid #D23F57",

          width: "20px",
          height: "20px",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography variant="h6">-</Typography>
      </Box> */}
    </Box>
  );
};

export default CartCard;
