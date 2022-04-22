import React from "react"
import Button from "../../atoms/button/Button"

interface cardProps {
  image: string
  price: number
  title: string
  onAdd(item: any): any
}

const Card = ({ price, title, image, onAdd }: cardProps) => {
  return (
    <div className="card">
      <div className="card_img">
        <div className="card_img-frame">
          <img src={image} alt="" />
        </div>
      </div>
      <div className="card_details">
        <span className="card_details-price">₺{price}</span>
        <span className="card_details-title">{title}</span>
      </div>
      <div className="card_action">
        <Button content="Add" size="dense" onClick={onAdd} />
      </div>
    </div>
  )
}

Card.defaultProps = {
  image:
    "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1212&q=80",
  title: "Example Product",
  price: 39.0,
}

export default Card
