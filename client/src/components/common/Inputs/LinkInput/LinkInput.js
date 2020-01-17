import React, { useState } from "react";
import { Block } from "baseui/block";
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";

import {StyledInputError} from "../../Styled";
import {validate} from "../../../../services";
import {useInput, errorsToObj} from "../../../../utils";

const LinkInput = ({onSubmit}) => {
  const [validationError, setValidationError] = useState(false);
  const {inputValues, reset, setInputValues: onChange} = useInput(
    {
      linkInput: ""
    }
  );

  const handleSubmit = (e, inputValues) => {
    e.preventDefault();
    validate.addLink(inputValues)
      .then(validValues => {
        onSubmit(validValues, reset);
        setValidationError(false);
      })
      .catch(errors => {
        const errorsList = errors.inner;
        if (errorsList.length) {
          const errorsMap = errorsToObj(errorsList);
          setValidationError(errorsMap);
        }
      });
  };
  console.log(inputValues.linkInput)
  return (
    <Block
      maxWidth={"35em"}
      margin={"1.5em auto"}
    >
      {validationError.linkInput && <StyledInputError>{validationError.linkInput}</StyledInputError>}
      <Block
        display={"flex"}
        padding={"0.3em"}
        backgroundColor={"#dadada"}
      >
        <Input
          error={validationError.linkInput}
          type={"text"}
          size={SIZE.large}
          placeholder={"Input link"}
          name={"linkInput"}
          onChange={event => onChange(event)}
          value={inputValues.linkInput}
        />
        <Button onClick={e => handleSubmit(e, inputValues)} type={"submit"}>
          Save
        </Button>
      </Block>
    </Block>
  )
};

export default LinkInput;
