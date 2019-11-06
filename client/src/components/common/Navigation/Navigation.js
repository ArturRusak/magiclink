import React, { useContext } from "react";
import { AuthContext } from "../..";
import { handleLogOut } from "../../../services/api";

import { styled } from "baseui";
import { Block } from "baseui/block";

import { NavLink } from "react-router-dom";

const StyledNav = styled("ul", {
  display: "flex",
  justifyContent: "flex-start"
});

const StyledNavItem = styled("li", {
  display: "flex",
  alignItems: "center",
  marginRight: "1em",
  listStyle: "none"
});

const StyledNavLink = styled(NavLink, ({ $theme }) => ({
  padding: "0.4em 0.7em",
  fontSize: "1.2em",
  color: $theme.colors.primary100,
  textDecoration: "none",
  ":hover": {
    color: $theme.colors.primary400
  }
}));

export default function Navigation() {
  const { isAuthenticated, logOut } = useContext(AuthContext);
  return (
    <Block maxWidth={"1280px"} margin={"0 auto"}>
      <nav>
        <StyledNav>
          <StyledNavItem>
            <StyledNavLink to="/">Home</StyledNavLink>
          </StyledNavItem>
          <StyledNavItem>
            <StyledNavLink to="/links">Links</StyledNavLink>
          </StyledNavItem>
          <StyledNavItem>
            <StyledNavLink to="/registration">Registration</StyledNavLink>
          </StyledNavItem>
          <StyledNavItem>
            {isAuthenticated ? (
              <StyledNavLink $as={"div"} onClick={() => handleLogOut(logOut)} role={"button"}>
                Sign out
              </StyledNavLink>
            ) : (
              <StyledNavLink to="/login">Sign in</StyledNavLink>
            )}
          </StyledNavItem>
        </StyledNav>
      </nav>
    </Block>
  );
}
