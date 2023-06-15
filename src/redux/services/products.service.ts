import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils';

export interface Products {
    products: [];
    _id: string;
    price: number;  
    totalPages:number
}[]
interface Params {
  searchKey:string
  page:number
}
export const productsService = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({ baseUrl:`${baseUrl}` }),
    endpoints: (builder) => ({
      getProducts: builder.query<Products, Params>({
        query: (params) => ({
            url: `products/?key=${params.searchKey}&page=${params.page}`,
            method: "GET",
          }),
      }),
    
    }),
  })


  export const {useGetProductsQuery} = productsService