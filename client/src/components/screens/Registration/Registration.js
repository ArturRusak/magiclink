import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Input, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import {registration, validate} from "../../../services";
import {errorsToObj, useInput} from "../../../utils"

import {StyledInputError, StyledFormError} from "../../common/Styled";

export default function Registration() {

  const defaultState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const {inputValues, setInputValues, reset} = useInput(defaultState);
  const {userName, email, password, confirmPassword} = inputValues;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    validate.registration(inputValues)
      .then(validValues => {
        (async () => {

          const response = await registration(validValues);
          const isError = response instanceof Error;

          if (response.status === "error") {
            setErrors({
              registration: response.data.message || "Registration was failed! Something was wrong!"
            });
            setIsLoading(false);
            return;
          }

          if (isError) {
            setErrors({
              registration: "Registration was failed! Something was wrong!"
            });
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
            error={errors.userName}
            type={"text"}
            size={SIZE.compact}
            placeholder={"Login"}
            name={"userName"}
            onChange={event => setInputValues(event)}
            value={userName}
          />
          {errors.userName && (
            <StyledInputError>{errors.userName}</StyledInputError>
          )}
        </Block>
        <Block marginBottom={"1em"}>
          <Input
            error={errors.email}
            type={"email"}
            size={SIZE.compact}
            placeholder={"Email"}
            name={"email"}
            onChange={event => setInputValues(event)}
            value={email}
          />
          {errors.email && <StyledInputError>{errors.email}</StyledInputError>}
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
          {errors.password && (
            <StyledInputError>{errors.password}</StyledInputError>
          )}
        </Block>
        <Block marginBottom={"1.5em"}>
          <Input
            error={errors.confirmPassword}
            type={"password"}
            size={SIZE.compact}
            placeholder={"Confirm password"}
            name={"confirmPassword"}
            onChange={event => setInputValues(event)}
            value={confirmPassword}
          />
          {errors.confirmPassword && (
            <StyledInputError>{errors.confirmPassword}</StyledInputError>
          )}
        </Block>
        {errors.registration && (
          <StyledFormError>{errors.registration}</StyledFormError>
        )}
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
          Registration
        </Button>
        <NavLink to="/login">Sign in</NavLink>
      </Block>
    </React.Fragment>
  );
}
