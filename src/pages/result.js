import React from "react";
import { useParams } from "react-router-dom";

import HeaderBar from "../components/headerBar";

export default function Search() {
  const { search } = useParams();

  return (
    <div className="main">
      <HeaderBar title="查看搜索结果" />
      <div>{search}</div>
    </div>
  );
}
