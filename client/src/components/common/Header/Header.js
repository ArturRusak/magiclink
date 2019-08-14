import React from "react";
import { styled } from "baseui";
import { Link } from "react-router-dom";

import { commonContent } from "../../../constants";
import { Navigation } from "../../index";

const Header = styled("header", ({ $theme }) => ({
  minHeight: "4em",
  padding: "1em 1.5em",
  background: $theme.colors.primary700
}));

const HeaderContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto"
}));

const HeaderRouterLink = styled(Link, ({ $theme }) => ({
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

const HeaderLinkSpan = styled("span", () => ({
  margin: "0 0 0 0.5em"
}));

export default function() {
  return (
    <Header>
      <HeaderContainer>
        <HeaderRouterLink to="/">
          <i className="fa fa-link fa-2x" aria-hidden="true"/>
          <HeaderLinkSpan>{commonContent.NAME_PROJECT}</HeaderLinkSpan>
        </HeaderRouterLink>
      </HeaderContainer>
      <Navigation/>
    </Header>
  );
}
