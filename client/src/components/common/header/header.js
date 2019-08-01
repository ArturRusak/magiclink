import React from "react";
import { styled } from "baseui";

const Header = styled("header", ({ $theme }) => ({
  minHeight: "4em",
  padding: "1em 1.5em",
  color: $theme.colors.primary,
  background: $theme.colors.primary50
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

const HeaderLink = styled("a", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "2em",
  color: $theme.colors.primary,
  textDecoration: "none",
  transition: "0.3s",
  ":hover": {
    color: $theme.colors.primary700
  }
}));

const HeaderLinkSpan = styled("span", () => ({
  margin: "0 0 0 0.5em"
}));

export default function() {
  return (
    <Header>
      <HeaderContainer>
        <HeaderLink href="#">
          <i className="fa fa-link fa-2x" aria-hidden="true"></i>
          <HeaderLinkSpan>
            Magik link
          </HeaderLinkSpan>
        </HeaderLink>
      </HeaderContainer>
    </Header>
  );
}
