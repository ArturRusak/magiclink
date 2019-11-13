import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import validate from "../../../services/validation"
import { useInput } from "../../../utils/hooks";
import { handleLogin } from "../../../services/api";
import { errorsToObj } from "../../../utils/mapper";
import { StyledInputError, StyledFormError } from "../../common/Styled";


export default function Login() {

  const defaultState = {
    login: "",
    password: ""
  };
  const {inputValues, setInputValues, reset} = useInput(defaultState);
  const {login, password} = inputValues;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate.signIn(inputValues)
      .then(validValues => {
        (async () => {
          const response = await handleLogin(validValues);
          const isError = response instanceof Error;

          if (response.status === "error") {
            setErrors({authorization: response.data});
            setIsLoading(false);
            return;
          }
          if (isError) {
            setErrors({authorization: "Authorization was failed! Something was wrong!"});
            setIsLoading(false);
            return;
          }
          setIsLoading(false);
          reset();
        })();
      })
      .catch(errors => {
        const errorsList = errors.inner;
        if (errorsList.length) {
          const errorsMap = errorsToObj(errorsList);
          setErrors(errorsMap);
        }
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Block maxWidth={"40em"} margin={"2em auto 0"}>
        <Block marginBottom={"1em"}>
          <Input
            error={errors.login}
            type={"text"}
            size={SIZE.compact}
            placeholder={"Login"}
            name={"login"}
            onChange={event => setInputValues(event)}
            value={login}
          />
          {errors.login && <StyledInputError>{errors.login}</StyledInputError>}
        </Block>
        <Block marginBottom={"1.5em"}>
          <Input
            error={errors.password}
            type={"password"}
            size={SIZE.compact}
            placeholder={"Password"}
            name={"password"}
            onChange={event => setInputValues(event)}
            value={password}
          />
          {errors.password && <StyledInputError>{errors.password}</StyledInputError>}
        </Block>
        {errors.authorization && <StyledFormError>{errors.authorization}</StyledFormError>}
        <Button
          kind={KIND.secondary}
          type={"submit"}
          onClick={event => handleSubmit(event)}
          isLoading={isLoading}
          overrides={{
            BaseButton: {
              style: {
                marginRight: "1em"
              }
            }
          }}
        >
          Login
        </Button>
        <NavLink to="/registration">
          Registration
        </NavLink>
      </Block>
    </React.Fragment>
  );
}
