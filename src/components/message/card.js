import React from "react";

export default function Card(props) {
  const { message } = props;
  const { id } = message;

  return (
    <div className={message.from_me ? "my-message-download" : "other-message-download"}>
      <div id={id} className="card">
        <div className="card-body">[暂不支持该消息查看]</div>
        <div className="card-line" />
        <div className="card-footer">个人名片</div>
      </div>
    </div>
  );
}
