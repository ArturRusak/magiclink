import React, { useContext, useEffect, useState } from "react";
import { AuthContext, LinksTable } from "../../";

import { useInput } from "../../../utils/hooks";
import { KIND, Toast } from "baseui/toast";
import { getLinks, saveLink } from "../../../services/api";

import { listContent } from "../../../constants";

import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Input, SIZE } from "baseui/input";
import { H2 } from "baseui/typography";

function LinksList() {
  const {isAuthenticated} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState(null);
  const [isErrors, setIsErrors] = useState({
    isInputError: false,
    isLoadingError: false
  });
  const {inputValues, reset, setInputValues: onChange} = useInput(
    {
      linkInput: ""
    }
  );

  const {tableTitles} = listContent;

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputValues.linkInput.length) {
      return setIsErrors(prevState => ({
        ...prevState,
        isInputError: true
      }));
    }

    (async function () {
      const responseBody = await saveLink(inputValues.linkInput);
      const isError = responseBody instanceof Error;

      if (isError) {
        setStatus(responseBody.toString());
        setIsErrors(prevState => ({
          ...prevState,
          isLoadingError: true
        }));
        return;
      }

      const {data, status} = responseBody;

      if (typeof data === "string") {
        setStatus(`Error: ${data}`);
        setIsErrors(prevState => ({
          ...prevState,
          isLoadingError: true
        }));
        return;
      }
      setListLinks(prevState => [...prevState, data]);
      setStatus(status);
      setIsErrors(prevState => ({
        ...prevState,
        isLoadingError: false
      }));
      reset();
    })();
  }

  useEffect(() => {
    (async function () {
      const responseBody = await getLinks();
      const isError = responseBody instanceof Error;

      if (isError) {
        setListLinks([]);
        setStatus(responseBody.toString());
        setIsErrors(prevState => ({
          ...prevState,
          isLoadingError: true
        }));
        setIsLoading(false);
        return;
      }

      const {data, status} = responseBody;

      setListLinks(data);
      setStatus(status);
      setIsErrors(prevState => ({
        ...prevState,
        isLoadingError: false
      }));
      setIsLoading(false);
    })();
  }, []);
  // TODO improve of notifications
  return (
    <React.Fragment>
      <h1>Magic Links</h1>
      {isLoading ?
        <Spinner/> :
        <React.Fragment>
          <Block>
            <Toast
              autoHideDuration={3000}
              key={status}
              kind={isErrors.isLoadingError ? KIND.warning : KIND.positive}
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
                    error={isErrors.isInputError}
                    type={"text"}
                    size={SIZE.large}
                    placeholder={"Input link"}
                    name={"linkInput"}
                    onChange={event => onChange(event)}
                    value={inputValues.linkInput}
                  />
                  <Button onClick={e => handleSubmit(e)} type={"submit"}>
                    Save
                  </Button>
                </Block>
                <LinksTable headTitles={tableTitles} bodyRowsData={listLinks}/>
              </React.Fragment>
            ) : (
              <Block>
                <H2>Not autorized!</H2>
              </Block>
            )}
          </Block>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default LinksList;
