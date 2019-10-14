import React, { useState } from "react";
import { Input, SIZE } from "baseui/input";
import { Button, KIND } from 'baseui/button';
import { settingsAPI } from "../../../constants";
import { useInput } from "../../../utils/hooks";

export default function Login() {
  const { value, reset, onChange } = useInput("");
  const [status, setStatus] = useState("");
  const [isReqError, setIsReqError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${settingsAPI.API}/login`, {
      method: "POST",
      headers: settingsAPI.headers,
      body: JSON.stringify({
        username: "ARTUR",
        password: "test"
      })
    })
      .then(response => response.json())
      .then(({ data, status }) => {
        if (typeof data !== "string") {
          setStatus("Success");
          setIsReqError(false);
          reset();
        } else {
          setIsReqError(true);
          setStatus(`Error: ${data}`);
        }
      })
      .catch(error => {
        setIsReqError(true);
        setStatus(`Error: ${error}`);
      });
  }

  return (
    <React.Fragment>
      <Input
        type={"text"}
        size={SIZE.compact}
        placeholder={"Login"}
        onChange={event => onChange(event)}
      />
      <Input
        type={"password"}
        size={SIZE.compact}
        placeholder={"Login"}
        onChange={event => onChange(event)}
      />
      <Button
        kind={KIND.secondary}
        type={"submit"}
        onClick={(e) => handleSubmit(e)}
      >
        Login
      </Button>
    </React.Fragment>
  );
};