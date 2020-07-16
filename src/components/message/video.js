import React, { useState, useEffect } from "react";

import play from "../../assets/images/play.png";

export default function Video(props) {
  const { message } = props;
  const { id } = message;
  const [dialogVisible, setDialog] = useState(false);

  useEffect(() => {
    const video = document.querySelector(`#video-${id}`);
    video.src = message.url;
  });

  const previewVideo = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(!dialogVisible);
  };

  return (
    <div className={message.from_me ? "my-message-pic" : "other-message-pic"}>
      <div className="video" id={id} onClick={previewVideo}>
        {/*  from_me 为true表示自己的项目 */}
        <video id={`video-${id}`}>您的浏览器不支持 video 标签。</video>
        <img src={play} alt="" className="play-icon" />
      </div>
      {dialogVisible && (
        <div className="dialog-wrapper">
          <div className="mask" onClick={closeDialog}></div>
          <div className="dialog">
            <video autoPlay controls muted>
              <source type="video/mp4" src={message.url} />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
