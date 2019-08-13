import React from "react";
import { styled } from "baseui";
import { commonContent } from "../../../constants";

const Footer = styled("footer", ({ $theme }) => ({
  minHeight: "4em",
  padding: "1em 1.5em",
  background: $theme.colors.primary700
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
  color: $theme.colors.primary100,
  textDecoration: "none",
  transition: "0.3s",
  ":hover": {
    color: $theme.colors.primary200
  }
}));

const FooterLinkSpan = styled("span", () => ({
  margin: "0 0 0 0.5em"
}));

export default function() {
  const { DEVELOPER, NAME_PROJECT } = commonContent;
  return (
    <Footer>
      <FooterContainer>
        <FooterLink href="#">
          <i className="fa fa-link fa-2x" aria-hidden="true"/>
          <FooterLinkSpan>
            {NAME_PROJECT}
          </FooterLinkSpan>
        </FooterLink>
        <FooterLink href={DEVELOPER.LINK} target={"_blank"}>
          {DEVELOPER.TTITLE}
        </FooterLink>
      </FooterContainer>
    </Footer>
  );
}
