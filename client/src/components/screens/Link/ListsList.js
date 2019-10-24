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
  const defaultInputValue = {
    inputValues: {
      linkInput: ""
    },
    listLinks: [],
    status: null,
    isError: false
  };
  const { isAuthenticated } = useContext(AuthContext);
  const [state, setState] = useState(defaultInputValue);
  const { inputValues: value, reset, setInputValues: onChange } = useInput(
    defaultInputValue
  );

  const { isError, listLinks, status } = state;
  const { tableTitles } = listContent;

  function handleSubmit(e) {
    e.preventDefault();
    (async function() {
      const responseBody = await saveLink(value);
      const isError = responseBody instanceof Error;

      if (isError) {
        setState(prevState => ({
          ...prevState,
          isError: true,
          status: responseBody.toString()
        }));
        return;
      }

      const { data, status } = responseBody;

      if (typeof data === "string") {
        setState(prevState => ({
          ...prevState,
          isError: true,
          status: `Error: ${data}`
        }));
        return;
      }
      setState(prevState => ({
        ...prevState,
        listLinks: [...prevState.links, data],
        isError: false,
        status: status
      }));
      reset();
    })();
  }

  useEffect(() => {
    (async function() {
      const responseBody = await getLinks();
      const isError = responseBody instanceof Error;

      if (isError) {
        setState(prevState => {
          return {
            ...prevState,
            listLinks: [],
            isError: true,
            status: responseBody.toString()
          };
        });
        return;
      }

      const { data, status } = responseBody;
      setState(prevState => ({
        ...prevState,
        listLinks: data,
        isError: false,
        status: status
      }));
    })();
  }, []);
  // TODO improve of notifications
  return (
    <React.Fragment>
      <h1>Magic Links</h1>
      <Block>
        <Toast
          autoHideDuration={3000}
          key={status}
          kind={isError ? KIND.warning : KIND.positive}
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
        {isAuthenticated ? (
          <React.Fragment>
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
                name={"linkInput"}
                onChange={event => onChange(event)}
                value={value.linkInput}
              />
              <Button onClick={e => handleSubmit(e)} type={"submit"}>
                Save
              </Button>
            </Block>
            <LinksTable headTitles={tableTitles} bodyRows={listLinks}/>
          </React.Fragment>
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
