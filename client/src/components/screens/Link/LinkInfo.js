import React, { useEffect, useState } from "react";
import { settingsAPI } from "../../../constants";
import { Block } from "baseui/block";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell
} from "baseui/table";

import { KIND, Toast } from "baseui/toast";

export default function LinkInfo({ match }) {
  const linkID = match.params.linkId;
  const [isReqError, setIsReqError] = useState(false);
  const [status, setStatus] = useState("");
  const [link, setLink] = useState({});

  useEffect(() => {
    fetch(`${settingsAPI.API}/links/${linkID}`)
      .then(response => response.json())
      .then(({ data, status }) => {
        setIsReqError(false);
        setStatus(status);
        setLink(data);
      })
      .catch(error => {
        setIsReqError(true);
        setStatus(`${error}`);
        setLink({});
      });
  }, [linkID]);

  const headTitles = () =>
    Object.keys(link).map((key, index) => (
      <StyledHeadCell key={`${index}--head-cell`}>{key}</StyledHeadCell>
    ));
  const bodyCell = () =>
    Object.keys(link).map((key, index) => (
      <StyledCell key={`${index}--body-cell`}>{link[key]}</StyledCell>
    ));

  return (
    <React.Fragment>
      <Block margin={"1em 0"}>
        <h1>Links Info</h1>
      </Block>
      <Block margin={"1em 0"}>
        <Toast
          autoHideDuration={3000}
          key={status}
          kind={isReqError ? KIND.warning : KIND.positive}
          overrides={{
            Body: {
              style: {
                position: "fixed",
                bottom: "2em",
                right: "2em"
              }
            }
          }}
        >
          {status}
        </Toast>
      </Block>
      <Block>
        <StyledTable>
          <StyledHead>{headTitles()}</StyledHead>
          <StyledBody>
            <StyledRow>{bodyCell()}</StyledRow>
          </StyledBody>
        </StyledTable>
      </Block>
    </React.Fragment>
  );
}
