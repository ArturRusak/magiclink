import React, { useEffect } from "react";
import { Block } from "baseui/block";

import {checkAuth} from "../../../services";

export default function Home() {
  useEffect(() => {
    checkAuth();
  }, []);
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
