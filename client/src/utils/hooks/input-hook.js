import { useState } from "react";

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  return [
    value, //current state
    () => setValue(''), //reset state
    event => setValue(event.target.value) // change value of input
  ]
}
