import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistore, store } from "./redux/store";
import { Provider } from "react-redux";
import { theme } from "./theme.ts";
import { ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
