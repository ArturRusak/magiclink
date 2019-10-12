import React, { useState, useEffect } from "react";
import { useInput } from "../../../utils/hooks";
import { Toast, KIND } from "baseui/toast";
import { withStyle } from "styletron-react";

import { listContent, settingsAPI } from "../../../constants";

import { styled } from "baseui";
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell
} from "baseui/table";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Input, SIZE } from "baseui/input";
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

function List() {
  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");
  const [isReqError, setIsReqError] = useState(false);

  const { value, reset, onChange } = useInput("");
  const { tableTitles } = listContent;

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${settingsAPI.API}/links`, {
      method: "POST",
      headers: settingsAPI.headers,
      body: JSON.stringify({
        id: "test",
        hash: "hash",
        link: value
      })
    })
      .then(response => response.json())
      .then(({ data, status }) => {
        if (typeof data !== "string") {
          setStatus("Success");
          setIsReqError(false);
          setListLinks([...listLinks, data]);
          reset();
        } else {
          setIsReqError(true);
          setStatus(`Error: ${data}`);
        }
      })
      .catch(error => {
        setIsReqError(true);
        setStatus(`Error: ${error}`);
      });
  }

  useEffect(() => {
    fetch(`${settingsAPI.API}/links`)
      .then(response => response.json())
      .then(({ data, status }) => {
        setIsReqError(false);
        setStatus("Success");
        setListLinks(data);
      })
      .catch(error => {
        setIsReqError(true);
        setStatus(`Error: ${error}`);
        setListLinks([]);
      });
  }, []);
  // TODO improve of notifications
  return (
    <React.Fragment>
      <h1>Magic Links</h1>
      <Block
        display={"flex"}
        maxWidth={"35em"}
        padding={"0.3em"}
        margin={"1.5em auto"}
        backgroundColor={"#dadada"}
      >
        <Input
          type={"text"}
          onChange={event => onChange(event)}
          size={SIZE.large}
          placeholder={"Input link"}
          value={value}
        />
        <Button onClick={e => handleSubmit(e)} type={"submit"}>
          Save
        </Button>
      </Block>
      <Block>
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
      <Block margin={"1.5em 0"}>
        <StyledTable>
          <StyledHead>
            {tableTitles.map((title, index) => (
              <StyledHeadCell key={`${index}-head`}>{title}</StyledHeadCell>
            ))}
          </StyledHead>
          <StyledBody>
            {listLinks.map((item, index) => (
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
      </Block>
    </React.Fragment>
  );
}

export default List;
