import React from "react";

import NoData from "../assets/images/no-data.png";
import "../assets/styles/components/noData.less";

export default (props) => {
  return (
    <div className="no-box">
      <img src={NoData} className="no-data" alt="no-data" />
      {props.title}
    </div>
  );
};
