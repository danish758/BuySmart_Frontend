import { Grid, Box } from "@mui/material";
import { useGetProductsQuery } from "../redux/services/products.service";
import ProductCard from "../components/products/ProductCard";
import { useState } from "react";
import Paginate from "../utils/pagination/Paginate";

export interface Product {
  picture: string;
  price: number;
  product: string;
  _id: string;
  count: number;
}
export interface ProductCardProps {
  prod: Product;
}
const Products = () => {
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const { data: { products = [], totalPages = 1 } = {} } = useGetProductsQuery({
    searchKey,
    page,
  });

  return (
    <>
      <Box>
        <input
          placeholder="Search Product by name"
          onChange={(e) => {
            setSearchKey(e.target.value);
            setPage(1);
          }}
          style={{
            // width: "560px",
            height: "56px",
            border: "1px solid rgba(68, 88, 98, 0.4)",
            borderRadius: "40px",
            marginBottom: "16px",
            padding: "0px 20px ",
          }}
        />
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        alignItems={"space-between"}
      >
        {products?.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            {/**/}
            <ProductCard prod={product} />
          </Grid>
        ))}
      </Grid>
      <Paginate totalPages={totalPages} setPage={setPage} page={page} />
    </>
  );
};

export default Products;
