import React from "react";
import { useHistory } from "react-router-dom";

import LeftArrow from "../assets/icons/zuojiantou.svg";
import "../assets/styles/components/headerBar.less";

export default function HeaderBar(props) {
  const history = useHistory();
  return (
    <div className="header-main">
      <div className="header-left" onClick={() => history.go(-1)}>
        <img src={LeftArrow} alt="" />
        返回
      </div>
      {props.title}
    </div>
  );
}
