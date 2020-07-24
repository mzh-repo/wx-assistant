import React from "react";

import Message from "../components/message";

export default (props) => {
  return (
    <div style={{ height: "100%", "overflow-y": "scroll" }}>
      <Message message={props.messages} />;
    </div>
  );
};
