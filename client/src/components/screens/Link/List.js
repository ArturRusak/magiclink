import React, { useState, useEffect } from "react";
import { useInput } from "../../utils/hooks";
import { Table } from "baseui/table";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import { Input, SIZE } from "baseui/input";

function List() {

  const API = "http://localhost:3001/";
  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");

  const { value, reset, onChange } = useInput("");

  const request = new Request(`${API}links`);
  const titles = ["_id", "id", "link", "hash"];

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Submitting Name ${value}`);

    fetch("http://localhost:3001/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: "test",
        hash: "hash",
        link: "link"
      })
    })
      .then(response => response.json())
      .then(data => {
        setStatus(status);
      });

  }

  useEffect(() => {
    fetch(request)
      .then(response => response.json())
      .then(data => {
        setStatus(status);
        setListLinks(data.data);
      })
      .catch(error => {
        setStatus(error);
        setListLinks([]);
      });
  }, []);

  return (
    <React.Fragment>
      <h1>Magic Links</h1>
      <Block
        display={"flex"}
        maxWidth={"30em"}
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
        <Button onClick={(e) => handleSubmit(e)} type={"submit"}>Primary</Button>
      </Block>
      <Block margin={"1.5em 0"}>
        <Table columns={titles} data={listLinks.map((item) => Object.values(item))}/>
      </Block>
    </React.Fragment>
  );
}

export default List;
