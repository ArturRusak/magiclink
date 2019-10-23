import { useState } from "react";

export function useInput(initialValue) {
  const [state, setState] = useState(initialValue);

  return {
    inputValues: state,
    reset: () => setState(initialValue), //reset state
    setInputValues: event => {
      event.persist();
      setState(prevState => {
        return {
          ...prevState,
          inputValues: {
            ...prevState.inputValues,
            [event.target.name]: event.target.value
          }
        };
      });
    } // change value of input
  };
}
