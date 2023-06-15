import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils';
import { RootState } from '../store';

export interface Response {
    url:string
}
export interface ClientSecret {
  client_secret:string
}
interface Product {
  id:number
  quantity:number
}
interface Payload {
 items: Product[]
 
}
export const paymentService = createApi({
    reducerPath: 'payment',
    // keepUnusedDataFor:0,
    baseQuery: fetchBaseQuery({ 
      baseUrl:`${baseUrl}`,
      prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).authSlice;
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }, }),
    endpoints: (builder) => ({
      checkout: builder.mutation<Response, Payload>({
        query: (params) => ({
            url: `payment/create-checkout-session`,
            method: "POST",
            body:params
          }),
      }),
      clientSecret: builder.query<ClientSecret, void>({
        query: () => ({
            url: `payment/secret`,
            method: "GET",
          }),
      }),
    
    }),
  })


  export const {useCheckoutMutation,useClientSecretQuery,useLazyClientSecretQuery} = paymentService