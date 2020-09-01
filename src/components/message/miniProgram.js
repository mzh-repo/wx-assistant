import React from "react";

import mnp from "../../assets/images/mnp.png";

export default function MiniProgram(props) {
  const { message } = props;
  const { id } = message;
  const { content } = message;

  return (
    <div className={message.from_me ? "my-message-download" : "other-message-download"}>
      <div id={id} className="app-content">
        <div id={`title-${id}`} className="app-header">
          <img src={content.icon} alt="" className="app-header-img" />
          <span></span>
        </div>
        <div id={`information-${id}`} className="app-information">
          <span></span>
        </div>
        <img src={content.thumbnail_url} alt="" className="app-img" />
        <div className="url-type">
          <div className="url-line" />
          <div className="url-type-name">
            <img src={mnp} alt="" className="app-footer-img" />
            {content.bottom}
          </div>
        </div>
      </div>
    </div>
  );
}
