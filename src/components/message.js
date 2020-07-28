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
  const { message } = props;
  const { keyWord } = props;

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
    message.forEach((item) => {
      convertData(item, keyWord);
    });
  });

  return (
    <div>
      {message.map((item) => (
        <div
          className={`message-container ${item.from_me ? "row-reverse" : ""}`}
          id={item.id}
          key={item.id}
        >
          <div className="message-pic">
            <img src={item.speaker.avatar_url} alt="" />
          </div>
          <div className={item.from_me ? "my-area" : "information-area"}>
            {!item.from_me && <div className="message-name">{item.speaker.nickname}</div>}
            {item.type === 2001 && <Text message={item} />}
            {item.type === 2002 && <Image message={item} />}
            {item.type === 2003 && <Audio message={item} />}
            {item.type === 2004 && <Video message={item} />}
            {item.type === 2005 && <Link message={item} />}
            {item.type === 2006 && <Card message={item} />}
            {item.type === 2007 && <ExpressionImage message={item} />}
            {item.type === 2010 && <File message={item} />}
            {item.type === 2013 && <MiniProgram message={item} />}
            {item.type === 2016 && <Application message={item} />}
            <div className={item.from_me ? "my-message-time" : "other-message-time"}>
              {convertMessageTime(item.message_time)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
