import React from "react"
import "./styles/index.scss"

import Button from "./components/atoms/button/Button"
import Checkbox from "./components/atoms/checkbox/Checkbox"
import Input from "./components/atoms/input/Input"
import RadioButton from "./components/atoms/radio-button/Radio-Button"

function App() {
  return (
    <div className="App">
      <Button />
      <Checkbox id="checkbox" />
      <Input />
      <RadioButton />
    </div>
  )
}

export default App
