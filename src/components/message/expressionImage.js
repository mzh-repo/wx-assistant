import React, { useState } from "react";

export default function Image(props) {
  const [dialogVisible, setDialog] = useState(false);

  const { message } = props;
  const { id } = message;
  const { content } = message;

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
        <img src={content.url} alt="" />
      </div>
      {dialogVisible && (
        <div className="dialog-wrapper">
          <div className="mask" onClick={closeDialog} />
          <div className="dialog">
            <img src={content.url} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
