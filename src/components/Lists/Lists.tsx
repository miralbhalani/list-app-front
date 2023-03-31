import React, { FC, useEffect } from 'react';
import './Lists.css';
import { HomeOutlined, UnorderedListOutlined, PlusOutlined, AntDesignOutlined, EditOutlined } from "@ant-design/icons";
import listStore from "../../stores/ListStore";
import { Button, Popover, Input, Space } from 'antd';
import { List } from '../../types';
import ListTitleInput from '../ListTitleInput/ListTitleInput';
import { useObserver } from 'mobx-react-lite';
import { action } from 'mobx';
import { observer } from "mobx-react";
import { addList, editListTitle, getList } from "../../services/index";

interface ListsProps {}

const Lists: FC<ListsProps> = observer(() => {

  useEffect(() => {
    // fetch the lists
    fetchData();
  }, []);

  const fetchData = async() => {
    let lists = await getList();
    
    if(lists) {
      // attach the new lists to list store
      listStore.attachNewLists(lists as List[])
    }
  }

  const listSelectionHandler = (listEach: List) => {
    // update the new selected list to liststore
    listStore.selectList(listEach)
  }

  const handleListTitleChangeHandler = async (listEach: List, newTitle: string) => {

    // change the list title to list store
    listStore.changeListTitle(listEach, newTitle)

    // change the list title to list API
    let result = listEach._id && await editListTitle(listEach._id, newTitle)
    if(result) {
      listStore.changeListTitle(listEach, newTitle)
    } else {
      console.log("SOMETHING WRONG HAPPEND PLEASE CHECK THE LOGS");
    }
  }

  const addListHandler = async (title: string) => {

    // prepare the new list object
    var newProto = listStore.getListPrototype();
    newProto.title = title;
    
    // reflect to API
    let result = await addList(newProto)
    if(result) {
      newProto = {
        ...newProto,
        _id: newProto._id || result as string
      }

      // reflect to list store
      listStore.addNewList(newProto);
    } else {
      console.log("SOMETHING WRONG HAPPEND PLEASE CHECK THE LOGS");
    }
  }

  return  (
    <div className='ItemList' data-testid="Lists" >
      <div className='left-pane-item'>
        <HomeOutlined className='left-pane-item-icon' />
        To-Do 
      </div>
      {
        listStore.lists.map((listEach) => {
          return <>
            <div key={listEach._id} data-testid="list-item" className='left-pane-item' onClick={() => {listSelectionHandler(listEach)}}>
              <AntDesignOutlined className='left-pane-item-icon' />
              {listEach.title}

              <Popover content={<>
                <div data-testid="list-title-input">
                  <ListTitleInput  onSubmitComplete={(newTitle) => { 
                      handleListTitleChangeHandler(listEach, newTitle)
                    }}></ListTitleInput>
                </div>
              </>} title="Change list title" trigger="click">
                <EditOutlined data-testid="list-item-edit" className='left-pane-option-icon' />
              </Popover>

            </div>
          </>
        })
      }
      <div className='left-pane-item'>
        <PlusOutlined className='left-pane-item-icon' />
        <Popover  content={<>
          <div data-testid="list-title-input-add">
            <ListTitleInput onSubmitComplete={(title) => {
              addListHandler(title)
            }}></ListTitleInput>
          </div>
        </>} title="Change list title" trigger="click">
            <div data-testid="new-list-add">New List</div>
        </Popover>
        
      </div>
  </div>
  )
})

export default Lists;
