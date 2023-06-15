import { createSlice } from '@reduxjs/toolkit'
import { cartService } from '../services/cart.service'

type CartState = {
    cart: [],
    cartNotification:string | undefined
}

const cartSlice = createSlice({
  name: 'cart_slice',
  initialState: { cart:[],cartNotification:""} as CartState,
  reducers: {},
  extraReducers: (builder) => {
    // const dispatch=useAppDispatch()
    builder.addMatcher(
      cartService.endpoints.getCart.matchFulfilled,
      (state, { payload }) => {
        state.cart = payload.products
      }
    )
  },
})

export default cartSlice.reducer

