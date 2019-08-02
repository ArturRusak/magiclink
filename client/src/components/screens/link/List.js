import React, { Component } from "react";
import { Table } from "baseui/table";
import { Block } from "baseui/block";

class List extends Component {
  constructor() {
    super();
    this.state = {
      status: "",
      listLinks: []
    };
  }

  componentDidMount() {
    const request = new Request("http://localhost:3001/links");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ status: data.status, listLinks: data.data }));
  }
  render() {
    const { listLinks } = this.state;
    console.log(listLinks);
    const titles = ["_id", "id", "Link", "Hash Link"];
    return (
      <React.Fragment>
        <h1>Magic Links</h1>
        <Block margin={"1.5em 0"}>
          <Table columns={titles} data={listLinks.map((item) => Object.values(item))}/>
        </Block>
      </React.Fragment>
    );
  }
}

export default List;
