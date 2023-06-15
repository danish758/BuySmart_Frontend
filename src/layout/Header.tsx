import { Box, IconButton, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../redux/services/cart.service";
import LogoutIcon from "@mui/icons-material/Logout";
import { persistore } from "../redux/store";
import { useAppSelector } from "../redux/hooks/hooks";
// import logo from "../assets/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    authSlice: { token },
  } = useAppSelector((state) => state);
  const { data: { products = [] } = {} } = useGetCartQuery();
  const handleLogout = () => {
    persistore.purge();
    navigate("/ecom/products");
    window.location.reload();
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          zIndex: 999,
          background: "rgba(158,158,158,.2)",
          borderRadius: "4px",
          // px: 2,
          mb: 5,
          py: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: "2px",
            width: "150px",
          }}
        >
          <Typography
            variant="h3"
            style={{
              marginLeft: "5px",
              cursor: "pointer",
              // color: color,
            }}
            onClick={() =>
              pathname !== "/ecom/products" && navigate("/ecom/products")
            }
          >
            Buy smart
          </Typography>
          <Box sx={{ width: "6px", height: "6px", bgcolor: "red" }} />
        </Box>

        <Stack spacing={2} direction={"row"} alignItems={"center"}>
          <IconButton
            aria-label="cart"
            onClick={() => pathname !== "/ecom/cart" && navigate("/ecom/cart")}
          >
            <Badge badgeContent={products.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {token ? (
            <IconButton aria-label="cart" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <button
              style={{
                border: "1px solid #FFC727",
                borderRadius: "16px",
                cursor: "pointer",
                marginRight: "5px",
                padding: "3px 10px",
              }}
              onClick={() => navigate("/")}
            >
              Login
            </button>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Header;
