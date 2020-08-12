import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Progress, Button } from "ppfish";

import "../assets/styles/pages/notFound.less";

// 声明组件  并对外输出
export default class notFound extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props);
    this.state = {
      // activeTab: 'pop' ,
    };
  }

  render() {
    return (
      <div className="not-found">
        <Progress
          type="circle"
          percent={100}
          format={() => "404"}
          width={200}
          status="active"
        />

        <div className="link">
          <p>
            <Link to="/">跳转至首页</Link>
          </p>
          <Button type="primary" onClick={() => this.props.history.goBack()}>
            返回上一页
          </Button>
        </div>
      </div>
    );
  }
}
