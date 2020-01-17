import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "baseui/spinner";
import { Block } from "baseui/block";
import { H2 } from "baseui/typography";
import {KIND, Toast} from "baseui/toast";

import {listContent} from "../../../../constants";
import {getLinks, removeLink, saveLink} from "../../../../services";

import {AuthContext} from '../../../Providers/AuthProvider';
import LinkInput from "../../../common/Inputs/LinkInput";
import LinksTable from "../../../Tables/LinksTable";

function LinksList() {
  const {isAuthenticated} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState(null);
  const [isErrors, setIsErrors] = useState({
    isLoadingError: false
  });

  const {tableTitles} = listContent;

  function handleErrorStatus(isError, responseBody) {
    const statusMessage = isError ? responseBody.toString() : `Error: ${responseBody.data.message}`;
    setStatus(statusMessage);
    setIsErrors(prevState => ({
      ...prevState,
      isLoadingError: true
    }));
  }

  function handleLinkDelete(e, item) {
    e.preventDefault();

    (async function () {
      const responseBody = await removeLink(item._id);
      const isError = responseBody instanceof Error;
      const {data} = responseBody;

      if ((responseBody.status && responseBody.status === "error") || isError) {
        handleErrorStatus(isError, responseBody);
        return;
      }

      if (data.deletedCount === 0) {
        setListLinks(prevState => [...prevState, data]);
        setStatus(`THE LINK NOT FOUND!`);
        setIsErrors(prevState => ({
          ...prevState,
          isLoadingError: false
        }));
        return;
      }

      setListLinks(listLinks.filter(link => link._id !== item._id));
      setStatus(`Link was removed ${item._id}`);
      setIsErrors(prevState => ({
        ...prevState,
        isLoadingError: false
      }));
    })();
  }

  function handleSubmit(inputValues, reset) {
    (async function () {
      const responseBody = await saveLink(inputValues.linkInput);
      const isError = responseBody instanceof Error;

      if ((responseBody.status && responseBody.status === "error") || isError) {
        handleErrorStatus(isError, responseBody);
        return;
      }

      const {data, status} = responseBody;

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
                    zIndex: 999,
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
                <LinkInput
                  onSubmit={handleSubmit}
                />
                <LinksTable
                  headTitles={tableTitles}
                  bodyRowsData={listLinks}
                  onLinkDelete={handleLinkDelete}
                />
              </React.Fragment>
            ) : (
              <Block>
                <H2>Not authorized!</H2>
              </Block>
            )}
          </Block>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default LinksList;
