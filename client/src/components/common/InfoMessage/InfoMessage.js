import React from "react";
import PropTypes from "prop-types";
import { styled } from "baseui";

const Message = styled("div", ({ $isError, $theme }) => ({
  maxWidth: "40em",
  paddingTop: "1em",
  paddingBottom: "1em",
  marginLeft: "auto",
  marginRight: "auto",
  background: $isError ? $theme.colors.negative200 : $theme.colors.positive200,
  ...$theme.borders.border200,
  borderRadius: $theme.borders.radius200,
  borderColor: $theme.colors.positive400
}));

function InfoMessage({ message, isError }) {
  return (
    <Message $isError={isError}>{message}</Message>
  );
}

InfoMessage.prototype = {
  message: PropTypes.string,
  isError: PropTypes.bool
};

export default InfoMessage;

