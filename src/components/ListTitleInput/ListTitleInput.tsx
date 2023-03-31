import React, { FC } from 'react';
import './ListTitleInput.css';
import { Button, Checkbox, Form, Input } from 'antd';
import ListTitleInputComponentStore from '../../stores/ListTitleInputComponentStore';


interface ListTitleInputProps {
  title?: string;
  onSubmitComplete: (titleInput: string) => void
}

const ListTitleInput: FC<ListTitleInputProps> = (props) => {

  const listTitleInputStore = new ListTitleInputComponentStore(props.title);
  
  const onFinish = (values: any) => {
    props.onSubmitComplete(values.title)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
          
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please add title' }]}
        >
          <Input data-testid="form-intpu-title" defaultValue={props.title} />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" 
            data-testid="form-submit-title">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default ListTitleInput;
