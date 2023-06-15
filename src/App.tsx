import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import SnackBar from "./utils/Snack";

function App() {
  return (
    <>
      <>
        <SnackBar />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
