import React, { useState, useEffect, useContext } from "react";
import { AuthContext, LinksTable } from "../../";

import { useInput } from "../../../utils/hooks";
import { Toast, KIND } from "baseui/toast";
import { getLinks, saveLink } from "../../../services/api";

import { listContent } from "../../../constants";

import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Input, SIZE } from "baseui/input";
import { H2 } from "baseui/typography";

function ListsList() {
  const isAuthentificated = useContext(AuthContext);
  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");
  const [isReqError, setIsReqError] = useState(false);

  const [value, reset, onChange] = useInput("");
  const { tableTitles } = listContent;

  function handleSubmit(e) {
    e.preventDefault();
    (async function() {
      const responseBody = await saveLink(value);
      const isError = responseBody instanceof Error;

      if (isError) {
        setIsReqError(true);
        setStatus(`${responseBody}`);
        return;
      }

      const { data, status } = responseBody;

      if (typeof data === "string") {
        setIsReqError(true);
        setStatus(`Error: ${data}`);
        return;
      }
      setStatus(status);
      setIsReqError(false);
      setListLinks([...listLinks, data]);
      reset();
    })();
  }

  useEffect(() => {
    (async function() {
      const responseBody = await getLinks();
      const isError = responseBody instanceof Error;

      if (isError) {
        setIsReqError(true);
        setStatus(`${responseBody}`);
        setListLinks([]);
        return;
      }

      const { data, status } = responseBody;
      setIsReqError(false);
      setStatus(status);
      setListLinks(data);
    })();
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
          size={SIZE.large}
          placeholder={"Input link"}
          onChange={event => onChange(event)}
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
        {isAuthentificated ? (
          <LinksTable headTitles={tableTitles} bodyRows={listLinks}/>
        ) : (
          <Block>
            <H2>Not autorized!</H2>
          </Block>
        )}
      </Block>
    </React.Fragment>
  );
}

export default ListsList;
