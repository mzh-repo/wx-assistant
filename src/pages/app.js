import React from "react";
import { Alert } from "ppfish";
import Axios from "axios";

import SubmitForm from "./addFriend";
import IsFriend from "./isFriend";
import "../assets/styles/pages/app.less";

import ConvertParams from "../libs/util";
import Config from "../serve/config";

export default function Search(props) {
  const params = props.location.search;
  const http = Axios.create({
    baseURL: Config.baseUrl,
  });
  http.post("/api/v2/login", ConvertParams(params)).then((res) => {
    sessionStorage.setItem("TOKEN", res.data.token);
  });

  const isFriend = false;

  const messages = [];
  const users = [];

  return (
    <div className="app">
      <AlreadyFriend isFriend={isFriend} users={users} messages={messages} />
    </div>
  );
}

function AlreadyFriend(props) {
  if (props.isFriend) {
    return <IsFriend users={props.users} messages={props.messages} />;
  } else {
    return (
      <div>
        <Alert message="你与该客户还不是微信好友" type="warning" showIcon />
        <SubmitForm />
      </div>
    );
  }
}
