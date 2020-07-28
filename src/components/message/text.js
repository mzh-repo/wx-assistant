import React from "react";

export default function Text(props) {
  const { message } = props;
  const { id } = message;

  return (
    <div className={message.from_me ? "my-message" : "other-message"}>
      <div className="word" id={id}>
        <span>{message.content}</span>
      </div>
    </div>
  );
}
