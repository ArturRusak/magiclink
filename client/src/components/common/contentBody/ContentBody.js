import React from "react";
import { styled } from "baseui";

const ContentBody = styled("div", () => ({
  flexGrow: "1",
  maxWidth: "1280px",
  width: "100%",
  padding: "1em 1.5em",
  margin: "0 auto"
}));

export default function(props) {
  return (
    <ContentBody>
      {props.children}
    </ContentBody>
  );
}