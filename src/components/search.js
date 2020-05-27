import React from "react";
// import ReactDOM from "react-dom";
import { Select } from "ppfish";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  componentDidMount() {
    // 订阅更改
  }

  componentWillUnmount() {
    // 清除订阅
  }

  handleChange() {
    // 当数据源更新时，更新组件状态
    this.setState({});
  }

  render() {
    return (
      <div className="search-box">
        所属微信
        <Select style={{ width: 300 }}>
          <Select.Option value={0}>{"选项0"}</Select.Option>
          <Select.Option value={1}>{"选项1"}</Select.Option>
          <Select.Option value={2}>{"选项2"}</Select.Option>
          <Select.Option value={3}>{"选项3"}</Select.Option>
        </Select>
      </div>
    );
  }
}

export default Search;
