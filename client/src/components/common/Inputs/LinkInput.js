import { Block } from "baseui/block";
import { Input, SIZE } from "baseui/input";
import { Button } from "baseui/button";
import React from "react";
import { useInput } from "../../../utils/hooks";

const LinkInput = ({isError, onSubmit}) => {

  const {inputValues, reset, setInputValues: onChange} = useInput(
    {
      linkInput: ""
    }
  );

  return (
    <Block
      display={"flex"}
      maxWidth={"35em"}
      padding={"0.3em"}
      margin={"1.5em auto"}
      backgroundColor={"#dadada"}
    >
      <Input
        error={isError}
        type={"text"}
        size={SIZE.large}
        placeholder={"Input link"}
        name={"linkInput"}
        onChange={event => onChange(event)}
        value={inputValues.linkInput}
      />
      <Button onClick={e => onSubmit(e, inputValues, reset)} type={"submit"}>
        Save
      </Button>
    </Block>
  )
};

export default LinkInput;