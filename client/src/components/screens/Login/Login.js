import React, { useState } from "react";
import { handleLogin } from "../../../services/api";

import { Input, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useInput } from "../../../utils/hooks";

export default function Login() {
  //TODO replace several constants to one - need to use one state for except extra code

  const defaultState = {
    inputValues: { login: "", password: "" }
  };
  const { inputValues, setInputValues } = useInput(defaultState);
  const { login, password } = inputValues;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputValues, "----")
    (async function() {
      await handleLogin({ login, password });
    })();
  }

  return (
    <React.Fragment>
      <Block maxWidth={"40em"} margin={"2em auto 0"}>
        <Block marginBottom={"1em"}>
          <Input
            type={"text"}
            size={SIZE.compact}
            placeholder={"Login"}
            name={"login"}
            onChange={event => setInputValues(event)}
            value={login}
          />
        </Block>
        <Block marginBottom={"1.5em"}>
          <Input
            type={"password"}
            size={SIZE.compact}
            placeholder={"Password"}
            name={"password"}
            onChange={event => setInputValues(event)}
            value={password}
          />
        </Block>
        <Button
          kind={KIND.secondary}
          type={"submit"}
          onClick={event => handleSubmit(event)}
        >
          Login
        </Button>
      </Block>
    </React.Fragment>
  );
}
