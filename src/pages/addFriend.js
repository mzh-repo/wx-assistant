import React from "react";
import { Input, Form, Button } from "ppfish";

import "../assets/styles/pages/app.less";

export default class SubmitForm extends React.Component {
  constructor(props) {
    super(props);
    // this.handleAccount = this.handleAccount.bind(this);
    // this.handleVerify = this.handleVerify.bind(this);
    // this.handleNote = this.handleNote.bind(this);
    this.state = {
      formData: {
        account: "1",
        verifyInfo: "oo",
        note: "asdf",
      },
    };
  }

  handleAccount = (e) => {
    console.log("a", e);
  };

  handleVerify = (e) => {
    console.log("b", e);
  };

  handleNote = (e) => {
    // e.persist();
    this.setState(
      {
        formData: { ...this.state.formData, note: e.target.value },
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = (e) => {
    console.log("rreeee", e);
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { formData } = this.props;

    return (
      <div className="add">
        <div className="title">添加好友</div>
        <div className="line"></div>
        <Form layout="vertical" onSubmit={this.handleSubmit()}>
          <FormItem label="手机号/微信号">
            {getFieldDecorator("account", {
              rules: [{ required: true, message: "请输入手机号/微信号!" }],
              initialValue: formData.account,
              getValueFromEvent: this.handleAccount,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="验证请求">
            <Input.TextArea
              row={4}
              defaultValue={formData.verifyInfo}
              onChange={this.handleVerify}
            />
          </FormItem>
          <FormItem label="备注名">
            <Input placeholder="请输入" defaultValue={formData.note} onChange={this.handleNote} />
          </FormItem>
          <FormItem>
            <Button
              type={this.state.hasSubmit ? "defult" : "primary"}
              htmlType="submit"
              className="submit-btn"
            >
              {this.state.hasSubmit ? "重新添加" : "发送申请"}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

SubmitForm = Form.create({})(SubmitForm);
