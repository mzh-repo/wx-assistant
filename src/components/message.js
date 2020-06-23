import React from "react";

function messageType(props) {
  const msg = <div className={props.status ? "row" : "row-reserve"}></div>;
  switch (props.type) {
    case 2001:
      return <div></div>;
    default:
      return null;
  }
}
export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // let type = this.props.
    return {};
  }
}
