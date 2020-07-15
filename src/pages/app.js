import React from "react";
import { Alert } from "ppfish";

import SubmitForm from "./addFriend";
import IsFriend from "./isFriend";
import "../assets/styles/pages/app.less";

export default function Search() {
  const isFriend = false;

  const messages = [];
  const users = [
    {
      id: 1,
      name: "a",
    },
    {
      id: 2,
      name: "b",
    },
  ];

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
