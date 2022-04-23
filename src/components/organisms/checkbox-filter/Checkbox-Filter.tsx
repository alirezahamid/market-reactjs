import React, { useState } from "react"
import Checkbox from "../../atoms/checkbox/Checkbox"
import Input from "../../atoms/input/Input"

interface checkboxFilterProps {
  placeholder?: string
  searchBox?: boolean
  options: string[]
  checkboxHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CheckboxFilter = ({
  options,
  checkboxHandler,
  placeholder,
  ...props
}: checkboxFilterProps) => {
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])

  const handleFilterOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredOptions(
      options.filter((o) => o.toLowerCase().includes(e.target.value))
    )
  }
  return (
    <>
      <div className="filters_container">
        <Input placeholder={placeholder} onChange={handleFilterOptions} />
        <form>
          {filteredOptions.length
            ? filteredOptions?.map((o) => (
                <div className="filters_container-item" key={o}>
                  <Checkbox
                    handleChange={checkboxHandler}
                    id={o.toLowerCase()}
                    value={o.toLowerCase()}
                    label={o}
                  />
                </div>
              ))
            : options?.map((o) => (
                <div className="filters_container-item" key={o}>
                  <Checkbox
                    handleChange={checkboxHandler}
                    id={o.toLowerCase()}
                    value={o.toLowerCase()}
                    label={o}
                  />
                </div>
              ))}
        </form>
      </div>
    </>
  )
}

export default CheckboxFilter
