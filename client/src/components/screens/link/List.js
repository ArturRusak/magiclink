import React, { Component } from "react";
import { Table } from "baseui/table";
import { Block } from "baseui/block";

class List extends Component {
  render() {
    const titles = ["Link", "Hash Link"];
    const data = [["test", 1], ["test", 2]];
    return (
      <React.Fragment>
        <h1>Magic Links</h1>
        <Block margin={"1.5em 0"}>
          <Table columns={titles} data={data}/>
        </Block>
      </React.Fragment>
    );
  }
}

export default List;
