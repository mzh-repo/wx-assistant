import http from "../api";

// 登录管理
export const loginApi = (data) => http.post("/api/v2/login", data);

// 好友管理
export const alreadyFriendApi = (id) => http.get(`/friends/${id}/already_friend`); // 是否好友
export const addFriendApi = (data) => http.post("/friends/add_friend_request", data); // 添加好友

// 授权管理
export const currentRobotApi = () => http.get("/staff/current_robot"); // 机器人当前状态

// 聊天内容
export const chatApi = (cid, sid, msgId, msgPosition) =>
  http.get(
    `/chat/history?left_wechat_alias=${cid}&right_wechat_id=${sid}&msg_id=${msgId}&msg_position=${msgPosition}`
  );

//首次获取聊天内容
export const getChatApi = (cid, sid) =>
  http.get(`/chat/history?left_wechat_alias=${cid}&right_wechat_id=${sid}`);

// 获取消息列表
export const searchApi = (cid, sid, keyword, page) =>
  http.get(
    `/chat/search_history?left_wechat_alias=${cid}&right_wechat_id=${sid}&keyword=${keyword}&page=${page}&page_size=10`
  );
// 搜索聊天记录
export const usersApi = (id) => http.get(`/chat/owners?wechat_alias=${id}`); // 获取指定客户微信所有归属信息

// 微信机器人管理
export const lastMessageApi = (id) => http.get(`/robot/last_hello_words?to=${id}`); // 获取当前机器人最后一次好友请求的'打招呼'内容
