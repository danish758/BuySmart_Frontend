import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Typography } from "@mui/material";
import Slide, { SlideProps } from "@mui/material/Slide";

import { closeSnackbar } from "../redux/snackbar/snack.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";

type TransitionProps = Omit<SlideProps, "direction">;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}
export default function SnackBar() {
  let dispatch = useAppDispatch();
  let { message, severity, status, autoHideDuration } = useAppSelector(
    (state) => state.snackSlice
  );
  function handleClose() {
    dispatch(closeSnackbar());
  }

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={status}
        autoHideDuration={autoHideDuration}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        TransitionComponent={TransitionLeft}
        aria-describedby="client-snackbar"
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={
            severity == "error"
              ? "error"
              : severity == "success"
              ? "success"
              : "warning"
          }
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          <Typography variant="h5">{message} </Typography>
        </Alert>
      </Snackbar>
    </Stack>
  );
}
