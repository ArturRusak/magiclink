/*
*
* DISABLED COMPONENT
*
* */

import React, {useEffect, useState} from "react";
import {Block} from "baseui/block";
import {StyledBody, StyledCell, StyledHead, StyledHeadCell, StyledRow, StyledTable} from "baseui/table";
import {Spinner} from "baseui/spinner";
import {KIND, Toast} from "baseui/toast";

import {getLinkInfo} from "../../../../services";

export default function LinkInfo({match}) {
  const linkID = match.params.linkId;
  const [isLoading, setIsLoading] = useState(true);
  const [isReqError, setIsReqError] = useState(false);
  const [status, setStatus] = useState("");
  const [link, setLink] = useState({});

  useEffect(() => {
    (async function () {
      const responseBody = await getLinkInfo(linkID);
      const isError = responseBody instanceof Error;
      if (isError) {
        setIsReqError(true);
        setStatus(`${responseBody}`);
        setLink({});
        setIsLoading(false);
        return;
      }

      const {data, status} = responseBody;
      setIsReqError(false);
      setStatus(status);
      setLink(data);
      setIsLoading(false);
    })();
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
      {
        isLoading ?
          <Spinner/> :
          <React.Fragment>
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
      }
    </React.Fragment>
  );
}
