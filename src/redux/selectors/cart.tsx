const { createSelector } = require("@reduxjs/toolkit")

const cartSelector = (state: any) => state.cart

export const cartTotalSelector = createSelector([cartSelector], (cart: any[]) =>
  cart.reduce((total: number, current: any) => (total += current.quantity), 0)
)

export const cartTotalPriceSelector = createSelector(
  [cartSelector],
  (cart: any[]) =>
    cart.reduce(
      (total, current) => (total += current.price * current.quantity),
      0
    )
)
