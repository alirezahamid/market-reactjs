import React from "react"
import RadioButton from "../../atoms/radio-button/Radio-Button"

interface radioFilterProps {
  searchBox?: boolean
  options: any[]
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  state: string
}

const RadioFilter = ({
  options,
  state,
  onChangeHandler,
  ...props
}: radioFilterProps) => {
  return (
    <>
      <div className="filters_container">
        {options?.map((o, index) => (
          <div className="filters_container-item" key={index}>
            <RadioButton
              handleChange={onChangeHandler}
              checked={state === o.value}
              value={o.value}
              id={o.value.toLowerCase()}
              label={o.title}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default RadioFilter
