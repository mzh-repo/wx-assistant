/**
 * convert url params into obj
 *
 * @param {String} params
 * @return {Object}
 */
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

/**
 * 对消息中的时间进行处理
 *
 * @param {String} messageTime
 * @return {String}
 */
export const convertMessageTime = (messageTime) => {
  const date = new Date();
  const dateList = [
    date.getFullYear().toString(),
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
  ];
  if (messageTime) {
    const time = messageTime.split(/[\s:-]/);
    const d2 = new Date(`${time[0]}/${time[1]}/${time[2]}`);
    const iday = parseInt(date - d2, 10) / 1000 / 60 / 60 / 24;
    if (dateList[0] === time[0]) {
      switch (parseInt(iday, 10)) {
        case 0:
          return (messageTime = `${time[3]}:${time[4]}`);
        case 1:
          return (messageTime = `昨天 ${time[3]}:${time[4]}`);
        case 2:
          return (messageTime = `前天 ${time[3]}:${time[4]}`);
        default:
          return (messageTime = `${time[1]}-${time[2]} ${time[3]}:${time[4]}`);
      }
    } else {
      messageTime = `${time[0]}-${time[1]}-${time[2]} ${time[3]}:${time[4]}`;
    }
    return messageTime;
  }
};
