
import React, { Component, PropTypes } from 'react';
import { Row, Col, Slider, Card, Form, Button, Input } from 'antd';


@Form.create()
class LampMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  handleClickEdit = () => {
    this.setState({isEditing: true});
  }
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    const { name } = getFieldsValue();
    this.handleCancel();
    this.props.onChange({ name });
  }
  handleCancel = () => {
    this.setState({isEditing: false});
  }
  render () {
    const { name, type } = this.props;
    const { isEditing } = this.state;
    const { getFieldProps } = this.props.form;
    const itemSty = {
      width: '200px'
    };
    return (
      isEditing ?
      <Form horizontal onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          <Input
            type="text"
            placeholder="请输入新名称"
            style={itemSty}
            {...getFieldProps('name', {initialValue: name})}
          />
        </Form.Item>
        <Form.Item label="类型">
          <Input type="text" readOnly value={type} style={itemSty} />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="small">确定</Button>
      </Form> :
      <div>
        <p>名称：{name}</p>
        <p>类型：{type}</p>
        <p style={{marginTop: 8}}>
          <Button type="ghost" size="small" onClick={this.handleClickEdit}>编辑</Button>
        </p>
      </div>
    )
  }
}
LampMeta.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

module.exports = LampMeta;