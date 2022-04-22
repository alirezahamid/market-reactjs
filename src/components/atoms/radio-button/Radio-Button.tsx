import React from "react"

interface radioButtonProps {
  value: string
  id?: string
  label: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
}

const RadioButton = ({
  label,
  value,
  id,
  handleChange,
  ...props
}: radioButtonProps) => {
  return (
    <>
      <input
        onChange={handleChange}
        className="radio-btn"
        type="radio"
        id={id}
        value={value}
        {...props}
      />
      <label className="radio-label" htmlFor={id}>
        {label}
      </label>
    </>
  )
}
RadioButton.defaultProps = {
  value: "Radio",
  label: "Just a funny radio Button",
  handleChange: () => console.log("hey"),
}

export default RadioButton
