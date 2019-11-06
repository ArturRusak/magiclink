import React, { useState } from "react";
import { handleLogin } from "../../../services/api";

import { NavLink } from "react-router-dom";
import { Input, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";
import { useInput } from "../../../utils/hooks";

export default function Registration() {

  const defaultState = {
    login: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const {inputValues, setInputValues} = useInput(defaultState);
  const {login, email, password, confirmPassword} = inputValues;
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorLogin, setIsErrorLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    (async () => {
      const response = await handleLogin({login, password});
      const isError = response instanceof Error;
      if (isError) {
        setIsErrorLogin(true);
        setIsLoading(false)
      }
    })();
  };

  return (
    <React.Fragment>
      <Block maxWidth={"40em"} margin={"2em auto 0"}>
        <Block marginBottom={"1em"}>
          <Input
            error={isErrorLogin}
            type={"text"}
            size={SIZE.compact}
            placeholder={"Login"}
            name={"login"}
            onChange={event => setInputValues(event)}
            value={login}
          />
        </Block>
        <Block marginBottom={"1em"}>
          <Input
            error={isErrorLogin}
            type={"email"}
            size={SIZE.compact}
            placeholder={"email"}
            name={"email"}
            onChange={event => setInputValues(event)}
            value={email}
          />
        </Block>
        <Block marginBottom={"1.5em"}>
          <Input
            error={isErrorLogin}
            type={"password"}
            size={SIZE.compact}
            placeholder={"Password"}
            name={"password"}
            onChange={event => setInputValues(event)}
            value={password}
          />
        </Block> <Block marginBottom={"1.5em"}>
        <Input
          error={isErrorLogin}
          type={"password"}
          size={SIZE.compact}
          placeholder={"Confirm password"}
          name={"confirmPassword"}
          onChange={event => setInputValues(event)}
          value={confirmPassword}
        />
      </Block>
        <Button
          kind={KIND.secondary}
          type={"submit"}
          onClick={event => handleSubmit(event)}
          isLoading={isLoading}
        >
          Save
        </Button>
        <NavLink to="/home">
          Sign in
        </NavLink>
      </Block>
    </React.Fragment>
  );
}