import React, { useState, useEffect } from "react";
import { useInput } from "../../../utils/hooks";
import { listContent, settingsAPI } from "../../../constants";
import { Table } from "baseui/table";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Input, SIZE } from "baseui/input";

function List() {

  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");

  const { value, reset, onChange } = useInput("");


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
        <Table columns={listContent.tableTitles} data={listLinks.map((item, i) => [i + 1, item.hash, item.link])}/>
      </Block>
    </React.Fragment>
  );
}

export default List;
