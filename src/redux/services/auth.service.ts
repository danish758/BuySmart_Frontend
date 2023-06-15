import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../../utils';



export interface User {
    email: string;
    token: string;
    success: boolean;
    User:any;
    accessToken:string;
    id:string
    error?:{
      data:{
        message:string
      }
    }
   
}
 
interface LoginDetails {
    email: string;
    password: string
}

export const authService = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({ baseUrl:`${baseUrl}` }),
    endpoints: (builder) => ({
      login: builder.mutation<User,LoginDetails >({
        query: (formdata) => ({
            url: `users/login`,
            method: "POST",
            body: formdata,
          }),
      }),
    
    }),
  })


  export const {useLoginMutation} = authService