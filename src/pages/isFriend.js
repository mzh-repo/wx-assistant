import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Select, Input } from "ppfish";

import NoData from "../components/noData";
import Message from "../components/message";

import { usersApi, chatApi } from "../serve/api/index";

const Content = (props) => {
  if (props.data.length === 0) {
    return <NoData title=" 暂无数据" />;
  } else {
    return (
      <div style={{ height: "100%", overflowY: "scroll" }}>
        <Message message={props.data} />
      </div>
    );
  }
};

export default (props) => {
  const [belong, setBelong] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  const { Search } = Input;
  const history = useHistory();
  useEffect(() => {
    const init = async () => {
      if (props.customId) {
        const res = await chatApi(props.customId, props.staffId);
        setChats(res.data_list || []);
        const result = await usersApi(props.customId);
        setUsers(result);
        result.forEach((item) => {
          if (item.is_follower) {
            setBelong(item.wechat_id);
          }
        });
      }
    };
    init();
  }, [props]);

  const getChatData = async (val) => {
    const result = await chatApi(props.customId, val);
    setChats(result.data_list || []);
  };

  const handleChange = (e) => {
    getChatData(e);
  };

  const handleSearch = (e) => {
    history.push(
      `/search/${e}?customId=${props.customId}&staffId=${props.staffId}`
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <div className="search-box">
        <div className="title">所属微信</div>
        <Select
          style={{ width: 200 }}
          defaultValue={belong}
          onChange={handleChange}
        >
          {users.map((d) => (
            <Select.Option key={d.wechat_id} title={d.display_name}>
              {d.display_name}
            </Select.Option>
          ))}
        </Select>
        <Search
          placeholder="请搜索消息"
          style={{ width: 120 }}
          onSearch={handleSearch}
        />
      </div>
      <Content data={chats} />
    </div>
  );
};
