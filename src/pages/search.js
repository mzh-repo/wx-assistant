import React from "react";
import { useParams } from "react-router-dom";

import HeaderBar from "../components/headerBar";
import "../assets/styles/pages/search.less";

export default function Search() {
  const { search } = useParams();

  return (
    <div className="main">
      <HeaderBar title="搜索结果" />
      <div>{search}</div>
    </div>
  );
}
