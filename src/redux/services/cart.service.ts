import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils";
import { RootState } from "../store";

export interface Products {
  products: [];
  _id: string;
  price: number;
}
[];
interface CartPayload {
  product: string;
}

export interface Response {
    message?: string;
    picture?: string;
    price?: string;
    product?: string;
 
}




export const cartService = createApi({
  reducerPath: "cart",
  tagTypes: ["cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authSlice;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getCart: builder.query<Products, void>({
      query: () => ({
        url: `cart`,
        method: "GET",
      }),

      providesTags: ["cart"],
    }),
    addToCart: builder.mutation<Response, CartPayload>({
      query: (formdata) => ({
        url: `cart`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["cart"],
    }),
    removeCart: builder.mutation<Products, CartPayload>({
      query: (formdata) => ({
        url: `cart`,
        method: "DELETE",
        body: formdata,
      }),
      invalidatesTags: ["cart"],
    }),
    clearCart: builder.mutation<string, void>({
      query: () => ({
        url: `cart/delete_all`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveCartMutation,useClearCartMutation } =
  cartService;
