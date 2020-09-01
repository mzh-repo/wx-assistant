import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Select, Input } from "ppfish";

import NoData from "../components/noData";
import Message from "../components/message";

import { usersApi, chatApi, getChatApi } from "../serve/api/index";

const Content = (props) => {
  if (props.data.length === 0) {
    return <NoData title=" 暂无数据" />;
  } else {
    return (
      <div id="message-content" style={{ height: "100%", overflowY: "auto" }}>
        {props.data.map((item) => {
          return (
            <div key={item.id}>
              <Message message={item} />
            </div>
          );
        })}
        {props.loading && (
          <div className="info">
            <LoadingOutlined />
            加载中...
          </div>
        )}
        {props.noMore && <div className="info">没有更多了</div>}
      </div>
    );
  }
};

export default (props) => {
  const { customId, staffId } = props;

  const [belong, setBelong] = useState("");
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);

  const { Search } = Input;
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      if (customId && staffId) {
        const res = await getChatApi(customId, staffId);
        setChats(res.data_list || []);
        const result = await usersApi(customId);
        setUsers(result);
        result.forEach((item) => {
          if (item.is_follower) {
            setBelong(item.wechat_id);
          }
        });
      }
    };
    init();
    // eslint-disable-next-line
  }, [props]);

  const getChatData = async (val) => {
    const result = await getChatApi(customId, val);
    setChats(result.data_list || []);
  };

  const handleChange = (e) => {
    getChatData(e);
  };

  const handleSearch = (e) => {
    history.push(`/search/${e}?customId=${customId}&staffId=${staffId}`);
  };

  const handleScroll = () => {
    const el = document.querySelector("#message-content");
    // 滚动条相对顶部位置
    const top = el.scrollTop;
    // 可视区域高度
    const height = document.documentElement.clientHeight;
    // 总高度
    const totalHeight = el.scrollHeight;
    if (!noMore && top + height >= totalHeight) {
      setLoading(true);
      getMore();
    }
  };

  const getMore = async () => {
    let arr = document.querySelectorAll(".message-container");
    const len = arr.length;
    const msgId = arr[len - 1].id;
    const res = await chatApi(customId, staffId, msgId, "TOP");
    setLoading(false);
    if (res.data_list.length !== 0) {
      setChats([...chats, ...res.data_list]);
    } else {
      setNoMore(true);
    }
  };

  return (
    <div style={{ height: "100%" }} onWheel={handleScroll}>
      <div className="search-box">
        <div className="title">所属微信</div>
        <Select style={{ width: 200 }} defaultValue={belong} onChange={handleChange}>
          {users.map((user) => (
            <Select.Option key={user.wechat_id} title={user.display_name}>
              {user.display_name}
            </Select.Option>
          ))}
        </Select>
        <Search placeholder="请搜索消息" style={{ width: 120 }} onSearch={handleSearch} />
      </div>
      <Content data={chats} noMore={noMore} loading={loading} />
    </div>
  );
};
