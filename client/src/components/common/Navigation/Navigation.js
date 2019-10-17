import React from "react";
import { styled } from "baseui";
import { Block } from "baseui/block";

import { NavLink } from "react-router-dom";

const UlNav = styled("ul", {
  display: "flex",
  justifyContent: "flex-start"
});

const LiNav = styled("li", {
  marginRight: "1em",
  listStyle: "none"
});

const CustomNavLink = styled(NavLink, ({ $theme }) => ({
  padding: "0.4em 0.7em",
  fontSize: "1.2em",
  color: $theme.colors.primary100,
  textDecoration: "none",
  ":hover": {
    color: $theme.colors.primary400
  }
}));

export default function Navigation() {
  return (
    <Block
      maxWidth={"1280px"}
      margin={"0 auto"}
    >
      <nav>
        <UlNav>
          <LiNav>
            <CustomNavLink to="/">Home</CustomNavLink>
          </LiNav>
          <LiNav>
            <CustomNavLink to="/links">Links</CustomNavLink>
          </LiNav>
          <LiNav>
            <CustomNavLink to="/login">Sign in</CustomNavLink>
          </LiNav>
        </UlNav>
      </nav>
    </Block>
  );
}
