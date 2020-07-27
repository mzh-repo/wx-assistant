import React from "react";

export default function File(props) {
  const { message } = props;
  const { id } = props.message;
  const { content } = message;

  const download = (url) => {
    const eleLink = document.createElement("a");
    eleLink.style.display = "none";
    eleLink.setAttribute("download", "");
    eleLink.href = url;
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };

  const getDownloadPic = (type) => {
    const downloadIconList = [
      { type: "PPT", src: require("../../assets/images/ppt.png") },
      { type: "EXCEL", src: require("../../assets/images/excel.png") },
      { type: "WORD", src: require("../../assets/images/word.png") },
      { type: "PDF", src: require("../../assets/images/pdf.png") },
      { type: "MUSIC", src: require("../../assets/images/mp3.png") },
      { type: "OTHER", src: require("../../assets/images/unknow.png") },
    ];
    for (let i = 0; i < downloadIconList.length; i += 1) {
      if (type === downloadIconList[i].type) {
        return downloadIconList[i].src;
      }
    }
    return downloadIconList[5].src;
  };

  return (
    <div className={message.from_me ? "my-message-dowload" : "other-message-dowload"}>
      <div id={id} className="download" onClick={() => download(content.url)}>
        <img src={getDownloadPic(content.file_type)} alt="" />
        <div className="download-main">
          <div className="download-title" id={`title-${id}`}>
            <span></span>
          </div>
          <div className="download-size">{content.description}</div>
        </div>
      </div>
    </div>
  );
}
