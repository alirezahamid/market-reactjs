import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { decrement, increment } from "../../../redux/features/cartSlice"

interface cartItemsProps {
  items: any[]
}
interface cartItemProps {
  name: string
  price: number
  quantity: number
}

const CartItem = ({ items }: cartItemsProps) => {
  const dispatch = useDispatch()

  const onIncrement = (item: cartItemProps) => {
    dispatch(increment(item.name))
  }
  const onDecrement = (item: cartItemProps) => {
    dispatch(decrement(item.name))
  }
  return (
    items &&
    items.map((item, index) =>
      item.quantity === 0 ? (
        ""
      ) : (
        <div className="cart_row" key={index}>
          <div className="cart_row-right">
            <div className="cart_row-add" onClick={() => onIncrement(item)}>
              +
            </div>

            {/* @ts-ignore */}
            <div className="cart_row-quantity">{item.quantity}</div>
            <div className="cart_row-delete" onClick={() => onDecrement(item)}>
              -
            </div>
          </div>

          <div className="cart_row-left">
            {/* @ts-ignore */}

            <span className="cart_row-title">{item.name}</span>
            {/* @ts-ignore */}

            <span className="cart_row-price">₺{item.price}</span>
          </div>
        </div>
      )
    )
  )
}

export default CartItem
