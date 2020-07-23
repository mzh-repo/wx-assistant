/**
 * convert url params into obj
 *
 * @param {String} params
 * @return {Object}
 */

//转换参数
export const convertParams = (params) => {
  const url = params.substr(1);
  const arr = url.split("&");
  let obj = {};
  arr.forEach((item) => {
    const data = item.split("=");
    obj[data[0]] = data[1];
  });
  return obj;
};

//转换消息时间
export const convertMessageTime = (messageTime) => {
  convertTime();
  const date = convertTime().date;
  const dateList = convertTime().dateList;
  if (messageTime) {
    const time = messageTime.split(/[\s:-]/);
    const d2 = new Date(`${time[0]}/${time[1]}/${time[2]}`);
    const iday = parseInt(date - d2, 10) / 1000 / 60 / 60 / 24;
    if (dateList[0] === time[0]) {
      if (dateList[1] === time[1] && dateList[2] === time[2]) {
        messageTime = `${time[3]}:${time[4]}`;
      } else if (parseInt(iday, 10) === 1) {
        messageTime = `昨天 ${time[3]}:${time[4]}`;
      } else if (parseInt(iday, 10) === 2) {
        messageTime = `前天 ${time[3]}:${time[4]}`;
      } else {
        messageTime = `${time[1]}-${time[2]} ${time[3]}:${time[4]}`;
      }
    } else {
      messageTime = `${time[0]}-${time[1]}-${time[2]} ${time[3]}:${time[4]}`;
    }
    return messageTime;
  }
};

//转换时间
export const convertTime = () => {
  const date = new Date();
  const dateList = [
    date.getFullYear().toString(),
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString(),
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate().toString(),
  ];
  return { date, dateList };
};

//转换内容
export const convertData = (message, keyWord) => {
  const title = document.querySelector(`#title-${message.id}`);
  const information = document.querySelector(`#information-${message.id}`);
  if (title) {
    title.removeChild(title.querySelectorAll("span")[0]);
    let titleNew = message.title;
    if (keyWord !== "") {
      const reg = new RegExp(keyWord, "gi");
      titleNew = titleNew.replace(reg, (txt) => `<span class="key-word-wait">${txt}</span>`);
    }
    title.insertAdjacentHTML("beforeEnd", `<span>${titleNew}</span>`);
  }
  if (information) {
    information.removeChild(information.querySelectorAll("span")[0]);
    let informationNew = message.description;
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
