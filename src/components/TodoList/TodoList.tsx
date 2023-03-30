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


// Test that the "Add/Edit Todo" modal is not open by default.
// Test that clicking the cancel button in the "Add/Edit Todo" modal closes the modal.
// Test that clicking the submit button in the "Add/Edit Todo" modal closes the modal and calls the onSubmitComplete callback.
// Test that clicking the "Add a todo" button sets the selected list item to null and the selected list item index to undefined.
// Test that clicking a list item sets the selected list item to the clicked item and the selected list item index to the index of the clicked item.
// Test that clicking a list item when the "Add/Edit Todo" modal is already open sets the selected list item to the clicked item and the selected list item index to the index of the clicked item, but does not close the modal.
// Test that changing the selected list in the list store updates the component to show the new list's items.
// Test that changing the selected list in the list store when the "Add/Edit Todo" modal is open updates the CreateTodoBox to show the new list's information.
// Test that changing the selected list in the list store when the "Add/Edit Todo" modal is open and there is a selected list item updates the CreateTodoBox to show the correct list item information.