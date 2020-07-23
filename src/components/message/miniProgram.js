import React from "react";

import mnp from "../../assets/images/mnp.png";

export default function MiniProgram(props) {
  const { message } = props;
  const { id } = message;

  return (
    <div className={message.from_me ? "my-message-dowload" : "other-message-dowload"}>
      <div id={id} className="app-content">
        <div id={`title-${id}`} className="app-header">
          <img src={message.icon} className="app-header-img" alt="" />
          <span></span>
        </div>
        <div id={`information-${id}`} className="app-information">
          <span></span>
        </div>
        <img src={message.thumbnail_url} className="app-img" alt="" />
        <div className="url-type">
          <div className="url-line" />
          <div className="url-type-name">
            <img alt="" src={mnp} className="app-footer-img" />
            小程序
          </div>
        </div>
      </div>
    </div>
  );
}
