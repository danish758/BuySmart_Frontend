import * as React from "react";
import {
  Box,
  IconButton,
  Grid,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Product } from "../../pages/Products";
import { useAddToCartMutation } from "../../redux/services/cart.service";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setSnackbar } from "../../redux/snackbar/snack.slice";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
}
export interface Error {
  data: {
    message: string;
  };
}
const StyledDialog = styled(Dialog)(({}) => ({
  "& .MuiDialog-paper": {
    background: "#fff",
    color: "#000",
    maxWidth: "50vw",
    height: "auto",
  },
}));

export default function ViewProductModal({
  open,
  setOpen,
  product,
}: ModalProps) {
  const [addToCart, { error, isError, isSuccess, data }] =
    useAddToCartMutation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (error) {
      dispatch(setSnackbar({ message: (error as Error).data.message }));
    }
    if (isSuccess) {
      dispatch(setSnackbar({ message: data?.message, severity: "success" }));
    }
  }, [isError, isSuccess]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddToCart = async (p: Product) => {
    await addToCart({ product: p?._id });
  };
  return (
    <div>
      <StyledDialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{ position: "absolute", right: 5, top: 5 }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Grid container sx={{}} alignItems={"center"}>
          <Grid item xs={6}>
            <img src={product.picture} height={400} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {product?.product}
            </Typography>

            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "rgb(210, 63, 87)", mt: 3 }}
            >
              ${product?.price}
            </Typography>
            <Rating name="read-only" value={5} readOnly sx={{ mt: 1 }} />
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "rgb(43, 52, 69)" }}
            >
              Sed egestas, ante et vulputate volutpat, eros pede semper est,
              vitae luctus metus libero eu augue. Morbi purus liberpuro ate vol
              faucibus adipiscing.
            </Typography>
            <Button
              onClick={() => handleAddToCart(product)}
              variant="contained"
              disableElevation
              sx={{
                background: "rgb(210, 63, 87)",
                mt: 2,
                "&:hover": {
                  backgroundColor: "rgb(210, 63, 87)",
                  borderColor: "#0062cc",
                  boxShadow: "none",
                },
              }}
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
      </StyledDialog>
    </div>
  );
}
