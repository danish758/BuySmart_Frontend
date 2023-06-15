import { createSlice } from '@reduxjs/toolkit'
import { authService } from '../services/auth.service'

type AuthState = {
  email: string
  token: string | null
  id:string
} 

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: "", token: null,id:"" } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authService.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log('Slicepayload', payload)
        state.token = payload.accessToken
        state.email = payload.email
        state.id = payload.id
       
      }
    )
  },
})

export default authSlice.reducer

