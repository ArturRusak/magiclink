import React from "react";
import { Block } from "baseui/block";

export default function LinkInfo() {
  return (
    <React.Fragment>
      <Block>
        <h1>Home</h1>
      </Block>
      <Block
        margin={"1em 0"}
      >
        <span>About project</span>
      </Block>
    </React.Fragment>
  );
}
