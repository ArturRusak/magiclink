import React from "react";
import {
  StyledBody,
  StyledCell,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledTable
} from "baseui/table";
import {withStyle} from "styletron-react";
import {styled} from "baseui";

const CustomCell = withStyle(StyledCell, {
  maxWith: "100%",
  overflow: "hidden"
});

const CustomRow = withStyle(StyledRow, ({$theme}) => ({
  position: "relative",
  ":hover": {
    background: $theme.colors.primary50
  }
}));

const CellLink = styled("a", {
  position: "relative",
  maxWith: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden"
});

function LinksTable({headTitles, bodyRowsData}) {
  return (
    <StyledTable>
      <StyledHead>
        {headTitles.map((title, index) => (
          <StyledHeadCell key={`${index}-head`}>{title}</StyledHeadCell>
        ))}
      </StyledHead>
      <StyledBody>
        {bodyRowsData.map((item, index) => (
          <CustomRow key={`${item._id}-row`}>
            <StyledCell>{index + 1}</StyledCell>
            <CustomCell>
              <CellLink href={item.shortLink} target="_blank" title={item.shortLink}>
                {item.shortLink}
              </CellLink>
            </CustomCell>
            <CustomCell>
              <CellLink href={item.link} title={item.link}>
                {item.link}
              </CellLink>
            </CustomCell>
          </CustomRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
}

export default LinksTable;
