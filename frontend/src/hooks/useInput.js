import { useState } from "react"

export default (name='', initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  return {
    [`${name}Value`]: value,
    setValue,
    reset: () => setValue(""),
    [`${name}BindInput`]: {
      value,
      onChange: event => {
        setValue(event.target.value)
      }
    }
  }
}