import React, { FC, useEffect } from 'react';
import './TodoList.css';
import { CheckCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from 'antd';
import TodoListComponentStore from '../../stores/TodoListComponentStore';
import CreateTodoBox from '../CreateTodoBox/CreateTodoBox';
import listStore from "../../stores/ListStore";
import { List, ListItem } from '../../types';
import { observer } from 'mobx-react';

interface TodoListProps {
  todoListComponentStore:TodoListComponentStore
}

const TodoList: FC<TodoListProps> = observer((props) => {

  const selectedList = listStore.selectedList as List | null;

  const onSubmitHandler = () => {
    props.todoListComponentStore.closeAddTodoModal();
  }

  const onCancelHandler = () => {
    props.todoListComponentStore.closeAddTodoModal()
  }

  const todoClickHandler = (listItemEach: ListItem | null, listItemEachIndex?: number) => {
    // modify the store for selectd list item to show in popup
    props.todoListComponentStore.setSelectedListIndex(listItemEachIndex)
    props.todoListComponentStore.setSelectedListItem(listItemEach)
    props.todoListComponentStore.openAddTodoModal()
  }

  return (
    <>
      <div className='ItemList' data-testid="TodoList">
        {
          selectedList?.items?.map((listEach: ListItem, itemIndex) => {
            return <>
              <div onClick={() => {todoClickHandler(listEach, itemIndex)}} className='left-pane-item' data-testid="ListItem">
                <CheckCircleOutlined className='left-pane-item-icon' />
                {listEach.title}
              </div>
            </>
          })
        }
        <div onClick={() => {todoClickHandler(null)}} className='right-pane-item' data-testid="addTodo">
          <PlusOutlined className='left-pane-item-icon' />
          Add a todo
        </div>
      </div>
  
      <Modal title="Add/Edit Todo"
        destroyOnClose ={true}
        open={props.todoListComponentStore.isAddTodoModalOpen} onCancel={onCancelHandler}>
        {
          listStore.selectedList && <CreateTodoBox
            data-testid="CreateTodoBox"
            list={listStore.selectedList}
            listItem={props.todoListComponentStore.selectedListItem}
            listItemIndex={props.todoListComponentStore.selectedListIndex}
            onSubmitComplete={onSubmitHandler}></CreateTodoBox>
        }
      </Modal>
  
    </>
  )
});

export default TodoList;
