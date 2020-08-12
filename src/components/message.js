import React, { useEffect } from "react";

import Application from "./message/application";
import Audio from "./message/audio";
import Card from "./message/card";
import ExpressionImage from "./message/expressionImage";
import File from "./message/file";
import Image from "./message/image";
import Link from "./message/link";
import MiniProgram from "./message/miniProgram";
import Video from "./message/video";
import Text from "./message/text";
import "../assets/styles/components/message.less";

import { convertMessageTime } from "../libs/util";

export default function Message(props) {
  const { message, keyWord, type } = props;

  useEffect(() => {
    const convertData = (message, keyWord) => {
      const title = document.querySelector(`#title-${message.id}`);
      const information = document.querySelector(`#information-${message.id}`);
      if (title) {
        title.removeChild(title.querySelectorAll("span")[0]);
        let titleNew = message.content.title;
        if (keyWord !== "") {
          const reg = new RegExp(keyWord, "gi");
          if (titleNew) {
            titleNew = titleNew.replace(reg, (txt) => `<span class="key-word-wait">${txt}</span>`);
          }
        }
        title.insertAdjacentHTML("beforeEnd", `<span>${titleNew}</span>`);
      }
      if (information) {
        information.removeChild(information.querySelectorAll("span")[0]);
        let informationNew = message.content.description;
        if (keyWord !== "") {
          const reg = new RegExp(keyWord, "gi");
          informationNew = informationNew.replace(
            reg,
            (txt) => `<span class="key-word-wait">${txt}</span>`
          );
        }
        information.insertAdjacentHTML("beforeEnd", `<span>${informationNew}</span>`);
      }
    };
    convertData(message, keyWord);
  });

  return (
    <div className="message-content">
      <div
        className={`message-container ${type === "search" ? "message-search" : ""}  ${
          message.from_me ? "row-reverse" : ""
        }`}
        id={message.id}
      >
        <div className="message-pic">
          <img src={message.speaker.avatar_url} alt="" />
        </div>
        <div className={message.from_me ? "my-area" : "information-area"}>
          {!message.from_me && <div className="message-name">{message.speaker.nickname}</div>}
          {message.type === 2001 && <Text message={message} />}
          {message.type === 2002 && <Image message={message} />}
          {message.type === 2003 && <Audio message={message} />}
          {message.type === 2004 && <Video message={message} />}
          {message.type === 2005 && <Link message={message} />}
          {message.type === 2006 && <Card message={message} />}
          {message.type === 2007 && <ExpressionImage message={message} />}
          {message.type === 2010 && <File message={message} />}
          {message.type === 2013 && <MiniProgram message={message} />}
          {message.type === 2016 && <Application message={message} />}
          <div className={message.from_me ? "my-message-time" : "other-message-time"}>
            {convertMessageTime(message.message_time)}
          </div>
        </div>
      </div>
    </div>
  );
}
