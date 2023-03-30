import React, { FC } from 'react';
import TodoListComponantStore from '../../stores/TodoListComponentStore';
import Lists from '../Lists/Lists';
import TodoList from '../TodoList/TodoList';
import './Dashboard.css';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {

  const todoListComponentStore:TodoListComponantStore = new TodoListComponantStore()

  return (
    <>
      <div className='Dashboard'>
        <div className='left-pane'>
          <div className='left-pane-item list-app-title'>
            LIST APP
          </div>
          <Lists></Lists>
        </div>
        <div className='right-pane'>
          <div className='right-pane-header'>
            <div className='right-pane-header-todo'>
              To-Do
            </div>
          </div>
          <div className='right-pane-list-container'>
            {/* LIST */}
            <TodoList todoListComponentStore={todoListComponentStore}></TodoList>
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;
