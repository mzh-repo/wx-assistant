import React from "react";

export default function Text(props) {
  const { message } = props;
  const { id } = message;

  return (
    <div className={message.from_me ? "my-message" : "other-message"}>
      <div className="word" id={id}>
        {/*  from_me 为true表示自己的项目 */}
        <span>{message.content}</span>
      </div>
    </div>
  );
}
