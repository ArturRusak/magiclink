import React, { useContext } from "react";
import { AuthContext } from "../..";
import { styled } from "baseui";
import { Link } from "react-router-dom";

import { commonContent } from "../../../constants";
import { Navigation } from "../../index";

const StyledHeader = styled("header", ({$theme}) => ({
  minHeight: "4em",
  padding: "1em 1.5em",
  background: $theme.colors.primary700
}));

const StyledHeaderContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto"
}));

const StyledHeaderRouterLink = styled(Link, ({$theme}) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "2em",
  color: $theme.colors.primary100,
  textDecoration: "none",
  transition: "0.3s",
  ":hover": {
    color: $theme.colors.primary200
  }
}));

const StyledHeaderLinkSpan = styled("span", () => ({
  margin: "0 0 0 0.5em"
}));

const StyledHelloUser = styled("div", ({$theme}) => ({
  ...$theme.typography.font400,
  position: 'absolute',
  top: $theme.sizing.scale700,
  right: $theme.sizing.scale700,
  color: $theme.colors.primary100,
}));

export default function () {
  const {currentUser} = useContext(AuthContext);
  return (
    <StyledHeader>
      <StyledHeaderContainer>
        <StyledHeaderRouterLink to="/">
          <i className="fa fa-link fa-2x" aria-hidden="true"/>
          <StyledHeaderLinkSpan>{commonContent.NAME_PROJECT}</StyledHeaderLinkSpan>
        </StyledHeaderRouterLink>
      </StyledHeaderContainer>
      {currentUser && <StyledHelloUser>{`Hello, ${currentUser}!`}</StyledHelloUser>}
      <Navigation/>
    </StyledHeader>
  );
}
