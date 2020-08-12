import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import HeaderBar from "../components/headerBar";
import NoData from "../components/noData";
import Message from "../components/message";

import { chatApi } from "../serve/api/index";
import { convertParams } from "../libs/util";

const Content = (props) => {
  if (props.data.length === 0) {
    return <NoData title=" 暂无数据" />;
  } else {
    return (
      <div id="message-content" style={{ height: "100%", overflowY: "scroll" }}>
        {props.noMorePre && <div className="info">没有更多了</div>}
        {props.data.map((item) => {
          return (
            <div key={item.id}>
              <Message keyWord={props.search} message={item} />
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

export default function Search(props) {
  const { customId, staffId, id } = convertParams(props.location.search);

  const [chats, setChats] = useState([]);
  const [flag, setFlag] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(null);
  const [scrollBottom, setScrollBottom] = useState(null);
  const [noMore, setNoMore] = useState(false);
  const [noMorePre, setNoMorePre] = useState(false);
  const [loadingPre, setLoadingPre] = useState(false);
  const [loading, setLoading] = useState(false);

  const { search } = useParams();

  useEffect(() => {
    const init = async () => {
      if (customId && staffId) {
        const res = await chatApi(customId, staffId, id, "MIDDLE");
        setChats(res.data_list || []);
      }
    };
    init();
    // eslint-disable-next-line
  }, [props]);

  // 鼠标滚轮事件
  const mouseScroll = () => {
    if (flag) {
      if (scrollPosition === 0 && !noMorePre) {
        setLoadingPre(true);
        getMorePre();
      } else if (scrollBottom && !noMore) {
        setLoading(true);
        getMore();
      } else {
        handleScroll();
      }
    }
  };

  const handleScroll = () => {
    const el = document.querySelector("#message-content");
    // 滚动条相对顶部位置
    setScrollPosition(el.scrollTop);
    // 可视区域高度
    const height = el.clientHeight;
    // 总高度
    const totalHeight = el.scrollHeight;
    setScrollBottom(scrollPosition + height >= totalHeight);
    if (scrollBottom && !noMore) {
      setLoading(true);
      getMore();
    } else if (scrollPosition === 0 && !noMorePre) {
      setLoadingPre(true);
      getMorePre();
    }
  };

  const getMore = () => {
    setFlag(false);
    if (!noMore) {
      const len = document.getElementsByClassName("message-container").length;
      const msgId = document.getElementsByClassName("message-container")[len - 1].id;
      setTimeout(async () => {
        const res = await chatApi(customId, staffId, msgId, "TOP");
        setFlag(true);
        if (res.data_list.length !== 0) {
          setChats([...chats, ...res.data_list]);
        } else {
          setLoading(false);
          setNoMore(true);
        }
      }, 500);
    }
  };

  const getMorePre = () => {
    setFlag(false);
    if (!noMorePre) {
      const msgId = document.getElementsByClassName("message-container")[0].id;
      setTimeout(async () => {
        const res = await chatApi(customId, staffId, msgId, "BOTTOM");
        setFlag(true);
        if (res.data_list.length !== 0) {
          setChats([...res.data_list, ...chats]);
        } else {
          setLoadingPre(false);
          setNoMorePre(true);
        }
      }, 0);
    }
  };

  return (
    <div className="result-container" onWheel={mouseScroll}>
      <HeaderBar title="查看搜索结果" />
      <Content
        data={chats}
        loading={loading}
        loadingPre={loadingPre}
        noMore={noMore}
        noMorePre={noMorePre}
        search={search}
      />
    </div>
  );
}
