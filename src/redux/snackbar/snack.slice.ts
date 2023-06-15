import { createSlice } from "@reduxjs/toolkit";

const snackSlice = createSlice({
  name: "snack slice",
  initialState: {
    message: "",
    severity: "error",
    status: false, 
    autoHideDuration: 2000,
  }, 
  reducers: {
    setSnackbar: (state, { payload }) => {
      // console.log("setSnack", payload);
      state.message =
        payload.message != undefined
          ? JSON.stringify(payload.message).replaceAll(`"`, "")
          : "500 Internal Error";
      state.severity = payload.severity || "error";
      state.status = true;
      state.autoHideDuration = payload.autoHideDuration || 2000;
    },
    closeSnackbar: (state) => {
      state.status = false;
    },
  },
});
export const { setSnackbar, closeSnackbar } = snackSlice.actions;
export default snackSlice.reducer;
