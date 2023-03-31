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
    fetchData();
  }, []);

  const fetchData = async() => {
    let lists = await getList();
    
    if(lists) {
      listStore.attachNewLists(lists as List[])
    }
  }

  const listSelectionHandler = (listEach: List) => {
    listStore.selectList(listEach)
  }

  const handleListTitleChangeHandler = async (listEach: List, newTitle: string) => {
    listStore.changeListTitle(listEach, newTitle)

    let result = listEach._id && await editListTitle(listEach._id, newTitle)
    if(result) {
      listStore.changeListTitle(listEach, newTitle)
    } else {
      console.log("SOMETHING WRONG HAPPEND PLEASE CHECK THE LOGS");
    }
  }

  const addListHandler = async (title: string) => {
    var newProto = listStore.getListPrototype();
    newProto.title = title;
    
    let result = await addList(newProto)
    if(result) {
      newProto = {
        ...newProto,
        _id: newProto._id || result as string
      }
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
