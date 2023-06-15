import { configureStore,combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import snackSlice from "./snackbar/snack.slice"
import { authService } from "./services/auth.service";
import authSlice from "./slices/auth.slice";
import cartSlice from "./slices/cart.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { productsService } from "./services/products.service";
import { cartService } from "./services/cart.service";
import { paymentService } from "./services/payment.service";


const reducers=combineReducers({
  snackSlice,
  authSlice,
  cartSlice,
  [authService.reducerPath]: authService.reducer,
  [productsService.reducerPath]: productsService.reducer,
  [cartService.reducerPath]: cartService.reducer,
  [paymentService.reducerPath]: paymentService.reducer,
})
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["authSlice"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authService.middleware,
      productsService.middleware,
      cartService.middleware,
      paymentService.middleware,
    ),
});
export let persistore = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
