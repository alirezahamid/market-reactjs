import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

// const initialState = [];
interface cartItem {
  name: string
  price: number
  quantity: number
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state: any, { payload }) {
      const { name } = payload

      const find = state.find((item: cartItem) => item.name === name)

      if (find) {
        return state.map((item: cartItem) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      } else {
        state.push({
          ...payload,
          quantity: 1,
        })
      }
    },
    increment(state: any, { payload }) {
      return state.map((item: cartItem) =>
        item.name === payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    },
    decrement(state: any, { payload }) {
      return state.map((item: cartItem) =>
        item.name === payload
          ? item.quantity < 1
            ? _.remove(state, (o: any) => {
                return o.item === item.name
              })
            : {
                ...item,
                quantity: item.quantity - 1,
              }
          : item
      )
    },
    clear(state) {
      return []
    },
  },
})

export const { addToCart, increment, decrement, clear } = cartSlice.actions
const cartReducer = cartSlice.reducer

export default cartReducer
