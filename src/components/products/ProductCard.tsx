import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Rating, Stack } from "@mui/material";
import { ProductCardProps } from "../../pages/Products";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewProductModal from "./ViewProductModal";

const ProductCard: React.FC<ProductCardProps> = ({ prod }) => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleViewProduct = () => {
    setOpen(true);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          cursor: "pointer",
          position: "relative",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => handleViewProduct()}
      >
        <Box sx={{ filter: hovered ? "blur(5px)" : "unset" }}>
          <img
            src={prod?.picture}
            width={"100%"}
            height="200px"
            style={{ objectFit: "contain" }}
          />

          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography
              variant="h5"
              style={{
                marginBottom: "8px",
                fontWeight: 600,
                lineHeight: 1.5,
                color: "#373F50",
                textTransform: "none",
              }}
            >
              {prod?.product}
            </Typography>
            <Rating name="read-only" value={5} readOnly />
            <Stack
              sx={{ width: "100%", color: "#D23F57", mt: 1 }}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h5">{`$${prod?.price}`}</Typography>
              {/* <Box
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
              </Box> */}
            </Stack>
          </Box>
        </Box>
        {hovered && (
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              left: "45%",
              background: "#fff",
              borderRadius: "10px",
              width: "43px",
              height: "43px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VisibilityIcon />
          </Box>
        )}
      </Card>
      <ViewProductModal open={open} setOpen={setOpen} product={prod} />
    </>
  );
};

export default ProductCard;
