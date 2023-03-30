import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';
import listStore from "../../stores/ListStore";
import TodoListComponantStore from '../../stores/TodoListComponentStore';
import { getTodoListComponantStore } from '../../stores/StoreFactory';
import { todoListTestData } from '../../testdata/common.testdata';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('<TodoList />', () => {

  /**RENDER TESTS */
  test('it should mount', () => {
    render(<TodoList todoListComponentStore={getTodoListComponantStore()} />);
    
    const todoList = screen.getByTestId('TodoList');

    expect(todoList).toBeInTheDocument();
  });

  test('renders all list items matching titles', () => {
    const selectedList = todoListTestData
    const todoListComponentStore:TodoListComponantStore = new TodoListComponantStore()

    listStore.selectedList = selectedList;
    
    render(<TodoList todoListComponentStore={getTodoListComponantStore()} />);
    const listItems = screen.getAllByTestId('ListItem');
    expect(listItems.length).toBe(selectedList.items.length);

    let items = selectedList.items;
    listItems.some((listItemEach, itemIndex) => {
      expect(listItemEach).toHaveTextContent(items[itemIndex].title);
    })
  });
  
  describe("add/edit todo click", () => {

    let todoListComponentStore: TodoListComponantStore;
    beforeEach(() => {
      // Prepare testData
      listStore.selectedList = todoListTestData;

      // Prepare states
      todoListComponentStore = getTodoListComponantStore()      
      
      render(<TodoList todoListComponentStore={todoListComponentStore} />);
    })

    test('add todo button click renders Add/Edit popup', () => {

    
      // click add todo button
      const addButton = screen.getByTestId('addTodo');
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
      
      // expect click effects
      expect(todoListComponentStore.isAddTodoModalOpen).toBe(true);
      const CreateTodoBoxCompo = screen.getByTestId('CreateTodoBox');
      expect(CreateTodoBoxCompo).toBeInTheDocument();
      expect(todoListComponentStore.selectedListItem).toBe(null)
      expect(todoListComponentStore.selectedListIndex).toBe(undefined)
    });

    test('item click rednders the Add/Edit popup', () => {

      // click add todo button
      const listItems = screen.getAllByTestId('ListItem');
      fireEvent.click(listItems[0]);
      
      // expect click effects
      expect(todoListComponentStore.isAddTodoModalOpen).toBe(true);
      expect(todoListComponentStore.selectedListItem?.title).toBe(listStore.selectedList?.items[0].title);
      expect(todoListComponentStore.selectedListIndex).toBe(0)
      const CreateTodoBoxCompo = screen.getByTestId('CreateTodoBox');
      expect(CreateTodoBoxCompo).toBeInTheDocument();
    });

    test('item click rednders the Add/Edit popup', () => {

      // click add todo button
      const listItems = screen.getAllByTestId('ListItem');
      fireEvent.click(listItems[0]);
      
      // expect click effects
      expect(todoListComponentStore.isAddTodoModalOpen).toBe(true);
      const CreateTodoBoxCompo = screen.getByTestId('CreateTodoBox');
      expect(CreateTodoBoxCompo).toBeInTheDocument();

      // cancel click
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      // cancel click effect
      expect(todoListComponentStore.isAddTodoModalOpen).toBe(false);
    });
  })

  /**PROP TESTS */
  describe("Prop tests", () => {

    test('renders with valid props', () => {
      const todoListComponentStore = getTodoListComponantStore()
      
      listStore.selectedList = todoListTestData
      render(<TodoList todoListComponentStore={todoListComponentStore} />);
      expect(screen.getByTestId('TodoList')).toBeInTheDocument();
    });

    test('renders with invalid props', () => {
      const todoListComponentStore = getTodoListComponantStore();
      listStore.selectedList = null
      render(<TodoList todoListComponentStore={todoListComponentStore} />);
      expect(screen.getByTestId('addTodo')).toBeInTheDocument();
    });

    test('renders change of selectedlist', () => {
      const todoListComponentStore = getTodoListComponantStore();

      // load first list
      listStore.selectedList = { title: 'first', items: [{title: "first list item"}] };
      const { rerender } = render(<TodoList todoListComponentStore={todoListComponentStore} />);
      expect(screen.getByText('first list item')).toBeInTheDocument();

      // load changed list
      listStore.selectedList = { title: 'second', items: [{title: "second list item"}] };
      rerender(<TodoList todoListComponentStore={todoListComponentStore} />);
      expect(screen.getByText('second list item')).toBeInTheDocument();
    });
  })

});
