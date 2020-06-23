import React from "react";

// eslint-disable-next-line
import { Select, Input, Form, Button, Alert, message } from "ppfish";

import "../assets/styles/pages/app.less";
import SubmitForm from "./addFriend";
// import NoData from "../assets/images/no-data.png";

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
      formData: {
        account: "1",
        verifyInfo: "oo",
        note: "asdf",
      },
      isFriend: false,
      hasSubmit: false, // 是否已发送好友申请
      chatData: [],
    };
  }

  componentDidMount() {
    // 订阅更改
    // this.getUserList();
  }

  componentWillUnmount() {
    // 清除订阅
  }

  getUserList() {
    this.$axios.get("chat/owners?wechat_id=1").then((res) => {
      console.log(res);
    });
  }

  handleChange(val) {}

  searchInfo() {
    // 搜索
  }

  handelNote = (e) => {
    console.log("parent", e);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    message.success("好友请求发送成功");
  };

  changeVerify = (val) => {
    console.log("12", val);
  };

  render() {
    const { Search } = Input;

    return (
      <div className="app">
        {/* <FrindOrNot data={this.state} /> */}
        <div className="search-box">
          <div className="title">所属微信</div>
          <Select style={{ width: 200 }} onChange={this.handleChange}>
            {this.state.userList.map((d) => (
              <Select.Option key={d.id} title={d.name}>
                {d.name}
              </Select.Option>
            ))}
          </Select>
          <Search placeholder="请搜索消息" onSearch={this.searchInfo} style={{ width: 120 }} />
        </div>
        <Alert message="你与该客户还不是微信好友" type="warning" showIcon />
        <SubmitForm
          formData={this.state.formData}
          hasSubmit={this.state.hasSubmit}
          handleSubmit={this.handleSubmit.bind(this)}
        />
        {/* <Content chatData={this.state.chatData}></Content> */}
        {/* <div className="chat"></div> */}
      </div>
    );
  }
}

// function handleChange(e) {
//   console.log("123", e);
// }

// function searchInfo(e) {
//   console.log("123", e);
// }

// function FrindOrNot(props) {
//   if (props.data.isFriend) {
//     return (
//       <div>
//         <div className="search-box">
//           <div className="title">所属微信</div>
//           <Select style={{ width: 200 }} onChange={handleChange}>
//             {props.data.userList.map((d) => (
//               <Select.Option key={d.id} title={d.name}>
//                 {d.name}
//               </Select.Option>
//             ))}
//           </Select>
//           <Search placeholder="请搜索消息" onSearch={searchInfo} style={{ width: 120 }} />
//         </div>
//         <Content chatData={props.data.chatData}></Content>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <Alert message="你与该客户还不是微信好友" type="warning" showIcon />
//         <SubmitForm formData={props.formData} hasSubmit={props.hasSubmit} />
//       </div>
//     );
//   }
// }

// function Content(props) {
//   if (props.chatData.length !== 0) {
//     return (
//       <div className="no-box">
//         <img src={NoData} className="no-data" alt="no-data" />
//         暂无数据
//       </div>
//     );
//   } else {
//     return <div className="chat"></div>;
//   }
// }

// const FormItem = Form.Item;

// const SubmitForm = Form.create()(
//   class extends React.Component {
//     render() {
//       const { getFieldDecorator } = this.props.form;
//       const { formData } = this.props;
//       return (
//         <div className="add">
//           <div className="title">添加好友</div>
//           <div className="line"></div>
//           <Form layout="vertical" onSubmit={this.props.handleSubmit}>
//             <FormItem label="手机号/微信号">
//               {getFieldDecorator("account", {
//                 rules: [{ required: true, message: "请输入手机号/微信号!" }],
//                 initialValue: formData.account,
//               })(<Input placeholder="请输入" />)}
//             </FormItem>
//             <FormItem label="验证请求">
//               <Input.TextArea row={4} defaultValue={formData.verifyInfo} />
//             </FormItem>
//             <FormItem label="备注名">
//               <Input placeholder="请输入" defaultValue={formData.note} />
//             </FormItem>
//             <FormItem>
//               <Button
//                 type={this.props.hasSubmit ? "defult" : "primary"}
//                 htmlType="submit"
//                 className="submit-btn"
//               >
//                 {this.props.hasSubmit ? "重新添加" : "发送申请"}
//               </Button>
//             </FormItem>
//           </Form>
//         </div>
//       );
//     }
//   }
// );
