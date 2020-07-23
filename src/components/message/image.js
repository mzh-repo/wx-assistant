import React, { useState } from "react";

export default function Image(props) {
  const { message } = props;
  const { id } = message;
  const [dialogVisible, setDialog] = useState(false);
  const previewImage = () => {
    document.documentElement.style.overflow = "hidden";
    setDialog(true);
  };

  const closeDialog = () => {
    setDialog(!dialogVisible);
  };

  return (
    <div className={message.from_me ? "my-message-pic" : "other-message-pic"}>
      <div className="image" id={id} onClick={previewImage}>
        {/*  from_me 为true表示自己的项目 */}
        <img src={message.url} alt="" />
      </div>
      {dialogVisible && (
        <div className="dialog-wrapper">
          <div className="mask" onClick={closeDialog}></div>
          <div className="dialog">
            <img src={message.url} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
