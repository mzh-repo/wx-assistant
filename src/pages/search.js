import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import HeaderBar from "../components/headerBar";
import Message from "../components/message";
import NoData from "../components/noData";
import "../assets/styles/pages/search.less";

import { convertParams } from "../libs/util";
import { searchApi } from "../serve/api/index";

export default function Search(props) {
  const { customId, staffId } = convertParams(props.location.search);

  const { search } = useParams("");
  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setPage(page + 1);
      if (customId && staffId) {
        const result = await searchApi(customId, staffId, search, page);
        setChats(result.data_list || []);
      }
    };
    init();
    // eslint-disable-next-line
  }, [props]);

  const getMore = () => {
    setPage(page + 1);
    const getMoreData = async () => {
      const result = await searchApi(customId, staffId, search, page);
      if (result.data_list.length > 0) {
        setChats([...chats, ...result.data_list]);
      } else {
        setNoMore(true);
      }
    };
    getMoreData();
  };

  const handleScroll = () => {
    const el = document.querySelector("#result-content");
    // 滚动条相对顶部位置
    const top = el.scrollTop;
    // 可视区域高度
    const height = el.clientHeight;
    // 总高度
    const totalHeight = el.scrollHeight;
    if (!noMore && top + height >= totalHeight) {
      if (Loading) {
        getMore();
        setLoading(false);
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      }
    }
  };

  return (
    <div className="main" onWheel={handleScroll}>
      <HeaderBar title="搜索结果" />
      {chats.length > 0 && (
        <div id="result-content" style={{ height: "100%", overflowY: "auto" }}>
          <Message message={chats} />
          {!noMore && (
            <div className="info">
              <LoadingOutlined />
              加载中...
            </div>
          )}
          {noMore && <div className="info">没有更多了</div>}
        </div>
      )}
      {chats.length === 0 && <NoData title=" 暂无数据" />}
    </div>
  );
}
