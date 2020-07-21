import React, { useState, useEffect } from "react";
import { Alert } from "ppfish";
import Axios from "axios";

import SubmitForm from "./addFriend";
import IsFriend from "./isFriend";
import NoData from "../components/noData";
import "../assets/styles/pages/app.less";

import ConvertParams from "../libs/util";
import Config from "../serve/config";
import { loginApi, alreadyFriendApi, currentRobotApi } from "../serve/api/index";

export default (props) => {
  const [authorized, setAuthorized] = useState(false); // 是否授权
  const [login, setLogin] = useState(false); // 机器人是否登录
  const [friend, setFriend] = useState(false); // 是否好友
  const [customId, setCustomId] = useState(null);
  const [staffId, setStaffId] = useState(null);

  const params = props.location.search;
  const http = Axios.create({
    baseURL: Config.baseUrl,
  });

  useEffect(() => {
    const init = async () => {
      const result = await loginApi(ConvertParams(params));
      sessionStorage.setItem("TOKEN", result.token);
      setAuthorized(result.wechat_enabled);
      const cid = result.target_wechat_id;
      const res = await currentRobotApi();
      if (res) {
        setLogin(true);
        setStaffId(res.wx_id);
        if (cid) {
          setCustomId(cid);
          const re = await alreadyFriendApi(cid);
          setFriend(re);
        }
      }
    };
    init();
  }, []);

  if (!authorized) {
    return <NoData title="请联系销售人员开通微信助手服务" />;
  } else if (!login) {
    // return <NoData title="请先登录微信助手" />;
    return (
      <div>
        <Alert message="你与该客户还不是微信好友" type="warning" showIcon />
        <SubmitForm customId={customId} />
      </div>
    );
  } else if (!friend) {
    return (
      <div>
        <Alert message="你与该客户还不是微信好友" type="warning" showIcon />
        <SubmitForm customId={customId} />
      </div>
    );
  } else {
    return <IsFriend />;
  }
};
