import React from "react"

interface checkboxProps {
  value: string
  id: string
  label: string
  handleChange?: (e: any) => void
  checked?: boolean
}

const Checkbox = ({
  label,
  value,
  id,
  handleChange,
  ...props
}: checkboxProps) => {
  return (
    <>
      <input
        className="checkbox-custom"
        type="checkbox"
        id={id}
        onChange={handleChange}
        value={value}
        {...props}
      />
      <label className="checkbox-custom-label " htmlFor={id}>
        {label}
      </label>
    </>
  )
}
Checkbox.defaultProps = {
  value: "checkbox",
  label: "Just a funny Checkbox",
}

export default Checkbox
