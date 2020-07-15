import React from "react";
import { Select, Input } from "ppfish";
import NoData from "../assets/images/no-data.png";

function Content(props) {
  if (props.data.length === 0) {
    return (
      <div className="no-box">
        <img src={NoData} className="no-data" alt="no-data" />
        暂无数据
      </div>
    );
  } else {
    return <div className="chat"></div>;
  }
}

export default function IsFriend(props) {
  const { Search } = Input;
  const handleChange = () => {};
  const search = () => {};

  return (
    <div>
      <div className="search-box">
        <div className="title">所属微信</div>
        <Select style={{ width: 200 }} onChange={handleChange}>
          {props.users.map((d) => (
            <Select.Option key={d.id} title={d.name}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
        <Search placeholder="请搜索消息" onSearch={search} style={{ width: 120 }} />
      </div>
      <Content data={props.messages} />
    </div>
  );
}
