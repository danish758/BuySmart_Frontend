import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useLoginMutation } from "../redux/services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { setSnackbar } from "../redux/snackbar/snack.slice";

export interface Error {
  data: {
    message: string;
  };
}

const Login = () => {
  const {
    authSlice: { token },
  } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, error, isError, isSuccess }] = useLoginMutation();

  const [formData, setformData] = useState({ email: "", password: "" });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setformData({ ...formData, [name]: e.target.value });
  };
  useEffect(() => {
    if (token) {
      navigate("/ecom/products");
    }
  }, []);

  // Error handling After Login
  useEffect(() => {
    if (error) {
      dispatch(setSnackbar({ message: (error as Error).data.message }));
    }
    if (isSuccess) {
      navigate("/ecom/products");
    }
  }, [isError, isSuccess]);

  const Submit = async () => {
    await login(formData);
  };
  return (
    <Box>
      <Typography variant="h1">Login</Typography>
      <input
        name="email"
        placeholder="Email"
        onChange={(e) => handleChange(e, "email")}
      />
      <input
        name="password"
        placeholder="Password"
        onChange={(e) => handleChange(e, "password")}
      />
      <button onClick={Submit}>{isLoading ? "Loading..." : "Login"}</button>
    </Box>
  );
};

export default Login;
