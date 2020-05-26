import React from "react";
import { Avatar, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../assets/styles/pages/app.scss";

export default function App() {
  return (
    <div className="app">
      <Badge dot>
        <Avatar size={64} icon={<UserOutlined />} />
      </Badge>
      <div className="title">welcome</div>
    </div>
  );
}
