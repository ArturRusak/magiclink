import React, { useState, useEffect } from "react";
import { Table } from "baseui/table";
import { Block } from "baseui/block";

function List() {

  const [listLinks, setListLinks] = useState([]);
  const [status, setStatus] = useState("");
  const request = new Request("http://localhost:3001/links");
  const titles = ["_id", "id", "link", "hash"];
  useEffect(() => {
    fetch(request)
      .then(response => response.json())
      .then(data => {
        setStatus(status);
        setListLinks(data.data);
      })
  });
  return (
    <React.Fragment>
      <h1>Magic Links</h1>
      <Block margin={"1.5em 0"}>
        <Table columns={titles} data={listLinks.map((item) => Object.values(item))}/>
      </Block>
    </React.Fragment>
  );
}

export default List;
