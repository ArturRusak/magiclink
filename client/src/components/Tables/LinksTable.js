import React from "react";
import {
  StyledBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledTable
} from "baseui/table";
import { withStyle } from "styletron-react";
import { styled } from "baseui";
import { Link } from "react-router-dom";

const CustomRow = withStyle(StyledRow, ({ $theme }) => ({
  position: "relative",
  ":hover": {
    background: $theme.colors.primary50,
    cursor: "pointer"
  }
}));

const RowLink = styled(Link, {
  position: "absolute",
  width: "100%",
  height: "100%"
});

const CellLink = styled("a", {
  zIndex: "1",
  position: "relative"
});

function LinksTable({headTitles, bodyRows}) {
  return (
    <StyledTable>
      <StyledHead>
        {headTitles.map((title, index) => (
          <StyledHeadCell key={`${index}-head`}>{title}</StyledHeadCell>
        ))}
      </StyledHead>
      <StyledBody>
        {bodyRows.map((item, index) => (
          <CustomRow key={`${item._id}-row`}>
            <RowLink className={"link-info"} to={`/links/${item._id}`}/>
            <StyledCell>{index + 1}</StyledCell>
            <StyledCell>{item.hash}</StyledCell>
            <StyledCell>
              <CellLink href={item.link} title={item.link}>
                {item.link}
              </CellLink>
            </StyledCell>
          </CustomRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export default LinksTable;
