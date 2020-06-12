import { useState } from "react";

export default initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bindInput: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};