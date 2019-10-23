import React, { useState } from "react";
import { handleLogin } from "../../../services/api";

import { Input, SIZE } from "baseui/input";
import { Button, KIND } from 'baseui/button';
import { Block } from "baseui/block";
import { useInput } from "../../../utils/hooks";

export default function Login() {
  //TODO replace several constants to one - need to use one state for except extra code
  const [login, resetLogin, setLogin] = useInput("");
  const [password, resetPassword, setPassword] = useInput("");

  function handleSubmit(e) {
    e.preventDefault();

    (async function () {
      await handleLogin({login, password});
    })();
  }

  return (
    <React.Fragment>
      <Block
        maxWidth={"40em"}
        margin={"2em auto 0"}
      >
        <Block
          marginBottom={"1em"}
        >
          <Input
            type={"text"}
            size={SIZE.compact}
            placeholder={"Login"}
            onChange={event => setLogin(event)}
            value={login}
          />
        </Block>
        <Block
          marginBottom={"1.5em"}
        >
          <Input
            type={"password"}
            size={SIZE.compact}
            placeholder={"Password"}
            onChange={event => setPassword(event)}
            value={password}
          />
        </Block>
        <Button
          kind={KIND.secondary}
          type={"submit"}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Block>
    </React.Fragment>
  );
};