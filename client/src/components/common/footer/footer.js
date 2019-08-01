import React from "react";
import { styled } from "baseui";
import { StyledLink } from "baseui/link";

const Footer = styled("footer", ({ $theme }) => ({
  minHeight: "4em",
  padding: "1em 1.5em",
  color: $theme.colors.primary,
  background: $theme.colors.primary50
}));

const FooterContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  width: "100%",
  maxWidth: "1280px",
  margin: "0 auto"
}));

const FooterLink = styled("a", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "1em",
  color: $theme.colors.primary,
  textDecoration: "none",
  transition: "0.3s",
  ":hover": {
    color: $theme.colors.primary700
  }
}));

const FooterLinkSpan = styled("span", () => ({
  margin: "0 0 0 0.5em"
}));

export default function() {
  return (
    <Footer>
      <FooterContainer>
        <FooterLink href="#">
          <i className="fa fa-link fa-2x" aria-hidden="true"></i>
          <FooterLinkSpan>
            Magik link
          </FooterLinkSpan>
        </FooterLink>
        <StyledLink href={"https://www.facebook.com/artur.rusak.5"} target={"_blank"}>
          Developed by Artur Rusak
        </StyledLink>
      </FooterContainer>
    </Footer>
  );
}
