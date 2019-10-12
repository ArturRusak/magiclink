import React from 'react';
import { Input, SIZE } from "baseui/input";
import { Button, KIND } from 'baseui/button';

export default function Login() {
  return (
    <React.Fragment>
      <Input
        type={"text"}
        size={SIZE.compact}
        placeholder={"Login"}
      />
      <Input
        type={"password"}
        size={SIZE.compact}
        placeholder={"Login"}
      />
      <Button
        kind={KIND.secondary}
        type={"submit"}
      >
        Login
      </Button>
    </React.Fragment>
  );
};