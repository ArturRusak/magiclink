import React, { useState } from "react";
import { login } from "../../../services/api";

import { Input, SIZE } from "baseui/input";
import { Button, KIND } from 'baseui/button';
import { useInput } from "../../../utils/hooks";

export default function Login() {
  const { value, reset, onChange } = useInput("");
  const [status, setStatus] = useState("");
  const [isReqError, setIsReqError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    (async function() {
      const result = await login();
      console.log(result);
    })();
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