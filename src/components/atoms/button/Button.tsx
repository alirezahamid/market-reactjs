import React from "react"
import classnames from "classnames"

interface ButtonProps {
  type: "primary" | "secondary"
  onClick: (e: any) => void
  size: "normal" | "dense"
  content: string
}

const Button = ({ type, onClick, size, content, ...props }: ButtonProps) => {
  const classProps: string = classnames("button", {
    "primary-btn": type === "primary",
    "secondary-btn": type === "secondary",
    "normal-btn": size === "normal",
    "dense-btn": size === "dense",
  })

  return (
    <button className={classProps} onClick={onClick} {...props}>
      {content}
    </button>
  )
}

Button.defaultProps = {
  type: "primary",
  onClick: () => console.log("I am clicked already! :)"),
  size: "normal",
  content: "Click Me",
}
export default Button
