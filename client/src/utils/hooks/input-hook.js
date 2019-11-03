import { useState } from "react";

/**
 *
 * @param initialValue
 * @returns {{setInputValues: setInputValues, reset: (function(): void), inputValues: any}}
 */
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
          [event.target.name]: event.target.value
        };
      });
    } // change value of input
  };
}
