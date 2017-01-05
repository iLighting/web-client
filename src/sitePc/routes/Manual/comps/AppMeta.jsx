import React, { Component, PropTypes } from 'react';
import { Form, Input, Button } from 'antd';

// TODO: 改为带状态组件（切换时，需要reset表单）
let AppMeta = ({
  labelName,
  name, nwk, ieee, endPoint, form,
  onChangeName
}) => {

  const formLabelName = labelName || '应用名';

  const { getFieldDecorator, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
  };

  function handleSubmit() {
    const { name } = form.getFieldsValue();
    onChangeName && onChangeName(name);
  }

  return (
    <div>
      <Form horizontal>
        <Form.Item label={formLabelName} {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: name
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="网络地址" {...formItemLayout}>
          <p className="ant-form-text">{nwk}</p>
        </Form.Item>
        <Form.Item label="MAC" {...formItemLayout}>
          <p className="ant-form-text">{ieee}</p>
        </Form.Item>
        <Form.Item label="端口" {...formItemLayout}>
          <p className="ant-form-text">{endPoint}</p>
        </Form.Item>
      </Form>
      <footer style={{textAlign: 'right'}}>
        <Button type="primary" size="small" onClick={handleSubmit}>保存</Button>
      </footer>
    </div>
  )
};

AppMeta = Form.create()(AppMeta);

export default AppMeta;