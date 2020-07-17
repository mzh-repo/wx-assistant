/**
 * convert url params into obj
 * 
 * @param {String} params
 * @return {Object}
 */

export default function convertParams(params) {
  const url = params.substr(1);
  const arr = url.split("&");
  let obj = {};
  arr.forEach((item) => {
    const data = item.split("=");
    obj[data[0]] = data[1];
  });
  return obj;
}
