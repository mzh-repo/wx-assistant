import React, { useState, useEffect } from "react";
import { message, Input, Form, Button } from "ppfish";

import { lastMessageApi, addFriendApi } from "../serve/api/index";

export default (props) => {
  const FormItem = Form.Item;
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({ account: "", verifyInfo: "", note: "" });

  useEffect(() => {
    const init = async () => {
      const res = await lastMessageApi(props.customId);
      setFormData({ ...formData, verifyInfo: res.hello_words });
    };
    init();
  }, [formData, props.customId]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setSubmit(!submit);
    if (!submit) {
      const data = {
        account: formData.account,
        hello_words: formData.verifyInfo,
        remark: formData.note,
        cid: props.customId,
      };
      try {
        addFriendApi(data);
        message.success("好友请求发送成功");
      } catch (err) {
        message.error(err.data.title);
      }
    }
  };

  return (
    <div className="add">
      <div className="title">添加好友</div>
      <div className="line"></div>
      <Form layout="vertical">
        <FormItem label="手机号/微信号">
          {/* {getFieldDecorator("account", {
            rules: [{ required: true, message: "请输入手机号/微信号!" }],
            initialValue: formData.account,
            getValueFromEvent: this.handleAccount,
          })(<Input placeholder="请输入" />)} */}

          <Input
            placeholder="请输入"
            defaultValue={formData.account}
            onChange={(e) => {
              setFormData({ ...formData, account: e.target.value });
            }}
          />
        </FormItem>
        <FormItem label="验证请求">
          <Input.TextArea
            row={4}
            defaultValue={formData.verifyInfo}
            onChange={(e) => setFormData({ ...formData, verifyInfo: e.target.value })}
          />
        </FormItem>
        <FormItem label="备注名">
          <Input
            placeholder="请输入"
            defaultValue={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
        </FormItem>
        <FormItem>
          <Button
            type={submit ? "defult" : "primary"}
            htmlType="submit"
            className="submit-btn"
            onClick={handleSubmit}
          >
            {submit ? "重新添加" : "发送申请"}
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};
