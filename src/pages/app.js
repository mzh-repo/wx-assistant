import React from "react";
// import ReactDOM from "react-dom";
import { Select, Input } from "ppfish";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: "",
      value: "22",
      userList: [
        {
          id: 1,
          name: "a",
        },
        {
          id: 2,
          name: "b",
        },
      ],
    };
  }

  componentDidMount() {
    // 订阅更改
    this.getUserList();
  }

  componentWillUnmount() {
    // 清除订阅
  }

  getUserList() {
    this.$axios.get("chat/owners?wechat_id=1").then((res) => {
      console.log(res);
    });
  }

  handleChange(val) {

  }

  searchInfo() {
    // 搜索
  }

  render() {
    const { Search } = Input;
    return (
      <div className="search-box">
        所属微信
        <Select style={{ width: 200 }} onChange={this.handleChange}>
          {this.state.userList.map((d) => (
            <Select.Option key={d.id} title={d.name}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
        <Search placeholder="请搜索消息" onSearch={this.searchInfo} style={{ width: 120 }} />
      </div>
    );
  }
}
