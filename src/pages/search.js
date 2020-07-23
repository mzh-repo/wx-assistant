import React from "react";
import { useParams } from "react-router-dom";

import "../assets/styles/pages/search.less";

export default function Search() {
  const { search } = useParams();

  return (
    <div className="main">
      <div>{search}</div>;
    </div>
  );
}
