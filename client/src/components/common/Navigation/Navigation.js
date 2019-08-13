import React from "react";
import { styled } from "baseui";
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
  fontSize: "1.2em",
  color: $theme.colors.primary,
  textDecoration: "none"
}));

export default function Navigation() {
  return (
    <React.Fragment>
      <nav>
        <UlNav>
          <LiNav>
            <CustomNavLink to="/">Home</CustomNavLink>
          </LiNav>
          <LiNav>
            <CustomNavLink to="/links">Links</CustomNavLink>
          </LiNav>
        </UlNav>
      </nav>
    </React.Fragment>
  );
}
