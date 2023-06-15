import React from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface Props {
  children: React.ReactNode;
}
const index = () => {
  return (
    <>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default index;
