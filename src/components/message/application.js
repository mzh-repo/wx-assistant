import React from "react";

export default function Application(props) {
  const { message } = props;
  const { id } = message;
  const { content } = message;

  const toWeb = () => {
    window.open(content.description);
  };

  return (
    <div className={message.from_me ? "my-message-download" : "other-message-download"}>
      <div id={id} className="url" onClick={toWeb}>
        <div id={`title-${id}`} className="url-title">
          <span></span>
        </div>
        <div className="url-main">
          <div id={`information-${id}`} className="url-information">
            <span></span>
          </div>
          <img src={content.thumbnail_url} alt="" />
        </div>
        <div className="url-type">
          <div className="url-line" />
          <div className="url-type-name">{content.bottom}</div>
        </div>
      </div>
    </div>
  );
}
