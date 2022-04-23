import React from "react"

interface inputProps {
  placeholder: string
  onChange: (e: any) => void
}

const Input = ({ placeholder, onChange, ...props }: inputProps) => {
  return (
    <input className="input" placeholder={placeholder} onChange={onChange} />
  )
}
Input.defaultProps = {
  placeholder: "Placeholder",
  onChange: (e: any) => console.log("I am already changed", e.target.value),
}

export default Input
