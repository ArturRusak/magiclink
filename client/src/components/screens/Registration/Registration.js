import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { StyledInputError, StyledFormError } from "../../common/Styled";

import { Input, SIZE } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Block } from "baseui/block";

import validate from "../../../services/validation"
import { registration } from "../../../services/api";
import { useInput } from "../../../utils/hooks";
import { errorsToObj } from "../../../utils/mapper"

export default function Registration() {

  const defaultState = {
    nickName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  const {inputValues, setInputValues} = useInput(defaultState);
  const {nickName, userName, email, password, confirmPassword} = inputValues;
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
          if (isError) {
            setErrors({registration: "Registration was failed!"});
            setIsLoading(false)
          }
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
            error={errors.nickName}
            type={"text"}
            size={SIZE.compact}
            placeholder={"Nick name"}
            name={"nickName"}
            onChange={event => setInputValues(event)}
            value={nickName}
          />
          {errors.nickName && <StyledInputError>{errors.nickName}</StyledInputError>}
        </Block>
        <Block marginBottom={"1em"}>
          <Input
            error={errors.userName}
            type={"text"}
            size={SIZE.compact}
            placeholder={"Name"}
            name={"userName"}
            onChange={event => setInputValues(event)}
            value={userName}
          />
          {errors.userName && <StyledInputError>{errors.userName}</StyledInputError>}
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
          {errors.password && <StyledInputError>{errors.password}</StyledInputError>}
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
          {errors.confirmPassword && <StyledInputError>{errors.confirmPassword}</StyledInputError>}
        </Block>
        {errors.registration && <StyledFormError>{errors.registration}</StyledFormError>}
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
        <NavLink to="/login">
          Sign in
        </NavLink>
      </Block>
    </React.Fragment>
  );
}