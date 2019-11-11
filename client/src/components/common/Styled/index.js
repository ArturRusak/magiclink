import { styled } from "baseui";

export const StyledInputError = styled("div", ({$theme}) => ({
  ...$theme.typography.font200,
  paddingLeft: $theme.sizing.scale100,
  color: $theme.colors.negative,
  textAlign: "left"
}));