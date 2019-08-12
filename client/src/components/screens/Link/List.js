import React, { useState, useEffect } from "react";
import { useInput } from "../../../utils/hooks";
import { listContent, settingsAPI } from "../../../constants";
import { withStyle } from "styletron-react";

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

const CustomRow = withStyle(StyledRow, ({ $theme }) => ({

    ":hover": {
      background: $theme.colors.primary50,
      cursor: "pointer"
    }
  })
);

function editLink(e) {
  console.log(e.currentTarget.dataset.idLink);
}

function List() {

  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");

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
          setStatus(status);
          setListLinks([...listLinks, data]);
        } else {
          setStatus(data);
        }
        reset();
      })
      .catch(error => {
        setStatus(`${error}`);
      });

  }

  useEffect(() => {
    fetch(`${settingsAPI.API}/links`)
      .then(response => response.json())
      .then(({ data, status }) => {
        setStatus(status);
        setListLinks(data);
      })
      .catch((error) => {
        setStatus(`${error}`);
        setListLinks([]);
      });
  }, []);

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
          onChange={event => onChange(event)}
          size={SIZE.large}
          placeholder="Input link"
          value={value}
        />
        <Button onClick={(e) => handleSubmit(e)} type={"submit"}>Save</Button>
      </Block>
      <Block>
        <span>
          {status}
        </span>
      </Block>
      <Block margin={"1.5em 0"}>
        <StyledTable>
          <StyledHead>
            {
              tableTitles.map((title, index) => (
                <StyledHeadCell key={`${index}-head`}>
                  {title}
                </StyledHeadCell>
              ))
            }
          </StyledHead>
          <StyledBody>
            {listLinks.map((item, index) => (
              <CustomRow
                onClick={(e) => editLink(e)}
                key={`${index}-row`}
                data-id-link={item._id}
              >
                <StyledCell>{index + 1}</StyledCell>
                <StyledCell>{item.hash}</StyledCell>
                <StyledCell>
                  <a href={item.link}>
                    {item.link}
                  </a>
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
