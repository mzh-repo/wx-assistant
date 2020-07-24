import React, { useState, useEffect } from "react";

import baseUrl from "../../assets/images/audio-play.png";
import animationUrl from "../../assets/images/audio-play.gif";

import Config from "../../serve/config";
import Audio from "../../libs/decodeAudio";

export default function Audios(props) {
  const [audioUrl, setAudioUrl] = useState();

  const { message } = props;
  const { id } = message;
  const voiceImage = baseUrl;
  // const audioUrl = "";

  useEffect(() => {
    const voice = document.querySelector(`#message-${id}`);
    voice.setAttribute("data-after", `${message.voice_time}″`);
    // // 微信arm转mp3
    const url = message.content.url.replace(Config.audioOrgin, Config.audioUrl);
    console.log(url);
    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const blob = Audio.convert(arrayBuffer);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      });
  }, [id, message.content.url, message.voice_time]);

  const playAudio = () => {
    // status为定义在标签内的属性 play代表可播放 stop代表可停止
    const audio = document.querySelector(`#audio-${id}`);
    const audios = document.querySelectorAll("audio");
    const imageList = document.querySelectorAll(".audio-image");
    this.setState({ voiceImage: baseUrl });
    [].forEach.call(audios, (item, index) => {
      // 将audios中其他的audio全部暂停
      item.pause();
      audios[index].currentTime = 0;
      imageList[index].setAttribute("src", baseUrl);
      if (
        audio.getAttribute("id") === item.getAttribute("id") &&
        audio.getAttribute("status") === "play"
      ) {
        item.setAttribute("status", "play");
      } else {
        item.setAttribute("status", "stop");
      }
    });
    if (audio.getAttribute("status") === "stop") {
      audios.forEach((item, index) => {
        if (audio.getAttribute("id") === item.getAttribute("id")) {
          imageList[index].setAttribute("src", animationUrl);
        } else {
          imageList[index].setAttribute("src", baseUrl);
        }
      });
      this.setState({ voiceImage: animationUrl });
      audio.play();
      audio.setAttribute("status", "play");
      audio.addEventListener(
        "ended",
        () => {
          // 监听到播放结束后，在此处禁止播放动画
          this.setState({ voiceImage: baseUrl });
        },
        false
      );
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.setAttribute("status", "stop");
      this.setState({ voiceImage: baseUrl });
    }
  };

  return (
    <div className={message.from_me ? "my-message" : "other-message"}>
      <div
        className={message.from_me ? "my-voice" : "voice"}
        id={`message-${id}`}
        onClick={playAudio}
      >
        <img src={voiceImage} alt="" className="audio-image" />
        <audio id={`audio-${id}`} src={audioUrl}></audio>
      </div>
    </div>
  );
}
