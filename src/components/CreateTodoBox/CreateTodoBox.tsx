import React, { FC } from 'react';
import './CreateTodoBox.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { List, ListItem } from '../../types';
import listStore from "../../stores/ListStore";
import {upsertListItem} from "../../services/index";

interface CreateTodoBoxProps {
  list: List;
  listItem : ListItem | null;
  listItemIndex? : number;
  onSubmitComplete: Function;
}

const CreateTodoBox: FC<CreateTodoBoxProps> = (props) => {

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    let listItem: ListItem = listStore.getListItemPrototype()

    listItem = {
      ...listItem,
      ...values
    }

    let result = props.list._id && await upsertListItem(props.list._id, listItem, listItem.id)
    if(result) {
      listItem = {
        ...listItem,
        id: listItem.id || result as string
      }
      listStore.upsertListItem(props.list, listItem, props.listItemIndex)
      props.onSubmitComplete(listItem)
    } else {
      console.log("SOMETHING WRONG HAPPEND PLEASE CHECK THE LOGS");
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="CreateTodoBox" data-testid="CreateTodoBox">
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
          initialValue={props.listItem?.title}
          rules={[{ required: true, message: 'Please add title' }]}
        >
          <Input data-testid="create-todo-title"/>
        </Form.Item>
  
        <Form.Item
          label="Details"
          name="details"
          initialValue={props.listItem?.details}
        >
          <Input.TextArea data-testid="create-todo-details"/>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button data-testid="create-todo-submit" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
};

export default CreateTodoBox;
