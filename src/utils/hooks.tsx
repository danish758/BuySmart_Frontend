import { useEffect } from "react";
import { Response } from "../redux/services/cart.service";
import { useAppDispatch } from "../redux/hooks/hooks";
import { setSnackbar } from "../redux/snackbar/snack.slice";

const useSnackbarHook = (response: Response) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.values(response).length > 0) {
      if (response.error) {
        dispatch(
          setSnackbar({
            message: response.error?.data?.message,
            severity: "error",
          })
        );
      } else {
        dispatch(
          setSnackbar({
            message: response?.data?.message,
            severity: "success",
          })
        );
      }
    }
  }, [response]);

  return;
};

export default useSnackbarHook;
