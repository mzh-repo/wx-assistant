import React from "react";
import "../assets/styles/pages/search.less";

export default class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main">
        <iframe title="search" src="./app.js" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
}
