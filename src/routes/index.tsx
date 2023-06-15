import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Products from "../pages/Products";
import Layout from "../layout/index";
import Cart from "../pages/Cart";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentReject from "../pages/PaymentReject";
import CheckoutForm from "../pages/CheckoutForm";
import Wrapper from "../components/checkout/Wrapper";
export default function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/ecom",
      element: <Layout />,
      children: [
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/checkout",
      element: <Wrapper />,
      children: [
        { path: "", element: <CheckoutForm /> },
        {
          path: "payment_success",
          element: <PaymentSuccess />,
        },
      ],
    },

    {
      path: "/payment_reject",
      element: <PaymentReject />,
    },
  ]);

  return routes;
}
