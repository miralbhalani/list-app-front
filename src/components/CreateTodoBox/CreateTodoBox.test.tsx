import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTodoBox from './CreateTodoBox';
import listStore from "../../stores/ListStore";
import { listMockData } from '../../testdata/common.testdata';
import { List, ListItem } from '../../types';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';

const upsertListItemReturnId = "323"

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

jest.setTimeout(10000)
jest.mock("../../services/index", () => ({
  
  upsertListItem: async (listId: string, listItem: ListItem, listItemId?: string | null) : Promise<boolean | string> => {
      if(listItemId) {
          return true
      } else {
          return upsertListItemReturnId
      }
    },
}))

describe('<CreateTodoBox />', () => {

  describe("edit tests", () => {


    let onSubmitComplete = {
      ref: (listItem: ListItem) => { listItem }
    }

    beforeEach(() => {
      render(<CreateTodoBox 
        list={listMockData[0] as List}
        listItem={listMockData[0].items[0]}
        listItemIndex = {0}
        onSubmitComplete={(listItem: ListItem) => {
          onSubmitComplete.ref(listItem)
        }} />);
    })
    
    test('it should mount', () => {
      
      const createTodoBox = screen.getByTestId('CreateTodoBox');

      expect(createTodoBox).toBeInTheDocument();
    });

    test('renders proper title and details', () => {

      const createTodoBoxTitle = screen.getByTestId("create-todo-title") as HTMLInputElement

      expect(createTodoBoxTitle.value).toBe(listMockData[0].items[0].title)

      const createTodoBoxDetails = screen.getByTestId("create-todo-details") as HTMLInputElement

      expect(createTodoBoxDetails.value).toBe(listMockData[0].items[0].details)
    });

    test('submits valid', async () => {

      onSubmitComplete.ref = (listItem: ListItem) => {
        expect(listItem.title).toBe("newIDM")
        expect(listItem.details).toBe("newIDMDetails")
        expect(listItem.id).toBe(upsertListItemReturnId)
      } 

      let createTodoBoxTitleInput: any = screen.getByTestId("create-todo-title")
      let createTodoBoxDetailsInput: any = screen.getByTestId("create-todo-details")

      await act(async () => {
        fireEvent.change(createTodoBoxTitleInput, { target: { value: 'newIDM' } })
        fireEvent.change(createTodoBoxDetailsInput, { target: { value: 'newIDMDetails' } })
      });

      createTodoBoxTitleInput = screen.getByTestId("create-todo-title") as HTMLInputElement

      expect(createTodoBoxTitleInput.value).toBe("newIDM")

      const createTodoBoxSubmit = screen.getByTestId("create-todo-submit")

      fireEvent.click(createTodoBoxSubmit);

    });

    
    
  })

  test('edit does not submit blank title', async () => {

    const mockSubmit = jest.fn();

    render(<CreateTodoBox 
      list={listMockData[0] as List}
      listItem={listMockData[0].items[0]}
      listItemIndex = {0}
      onSubmitComplete={mockSubmit} />);

    let createTodoBoxTitleInput: any = screen.getByTestId("create-todo-title")
    let createTodoBoxDetailsInput: any = screen.getByTestId("create-todo-details")

    await act(async () => {
      fireEvent.change(createTodoBoxTitleInput, { target: { value: '' } })
      fireEvent.change(createTodoBoxDetailsInput, { target: { value: 'newIDMDetails' } })
    });

    const createTodoBoxSubmit = screen.getByTestId("create-todo-submit")

    fireEvent.click(createTodoBoxSubmit);

    expect(mockSubmit).not.toHaveBeenCalled()

  });

  test('edit does submit blank details and non empty title', async () => {

    const mockSubmit = jest.fn();

    render(<CreateTodoBox 
      list={listMockData[0] as List}
      listItem={listMockData[0].items[0]}
      listItemIndex = {0}
      onSubmitComplete={mockSubmit} />);

    let createTodoBoxTitleInput: any = screen.getByTestId("create-todo-title")
    let createTodoBoxDetailsInput: any = screen.getByTestId("create-todo-details")

    await act(async () => {
      fireEvent.change(createTodoBoxTitleInput, { target: { value: 'newIDM' } })
      fireEvent.change(createTodoBoxDetailsInput, { target: { value: '' } })
    });

    const createTodoBoxSubmit = screen.getByTestId("create-todo-submit")
    
    await act(async () => {
      fireEvent.click(createTodoBoxSubmit);
    });
    
    expect(mockSubmit).toHaveBeenCalled()

  });

  describe("add tests", () => {

    beforeEach(() => {
      render(<CreateTodoBox 
        list={listMockData[0] as List}
        listItem={null}
        onSubmitComplete={() => {}} />);
    })
    
    test('renders nothing in text boxes', () => {

      const createTodoBoxTitle = screen.getByTestId("create-todo-title") as HTMLInputElement

      expect(createTodoBoxTitle.value).toBe("")

      const createTodoBoxDetails = screen.getByTestId("create-todo-details") as HTMLInputElement

      expect(createTodoBoxDetails.value).toBe("")
    });
    
  })

  

  test('add does not submit blank title', async () => {

    const mockSubmit = jest.fn();

    render(<CreateTodoBox 
      list={listMockData[0] as List}
      listItem={null}
      onSubmitComplete={() => {}} />);

    let createTodoBoxTitleInput: any = screen.getByTestId("create-todo-title")
    let createTodoBoxDetailsInput: any = screen.getByTestId("create-todo-details")

    await act(async () => {
      fireEvent.change(createTodoBoxTitleInput, { target: { value: '' } })
      fireEvent.change(createTodoBoxDetailsInput, { target: { value: 'newIDMDetails' } })
    });

    const createTodoBoxSubmit = screen.getByTestId("create-todo-submit")

    fireEvent.click(createTodoBoxSubmit);

    expect(mockSubmit).not.toHaveBeenCalled()

  });

  test('add does submit blank details and non empty title', async () => {

    const mockSubmit = jest.fn();

    render(<CreateTodoBox 
      list={listMockData[0] as List}
      listItem={null}
      onSubmitComplete={mockSubmit} />);

    let createTodoBoxTitleInput: any = screen.getByTestId("create-todo-title")
    let createTodoBoxDetailsInput: any = screen.getByTestId("create-todo-details")

    await act(async () => {
      fireEvent.change(createTodoBoxTitleInput, { target: { value: 'newIDM' } })
      fireEvent.change(createTodoBoxDetailsInput, { target: { value: '' } })
    });

    const createTodoBoxSubmit = screen.getByTestId("create-todo-submit")
    
    await act(async () => {
      fireEvent.click(createTodoBoxSubmit);
    });
    
    expect(mockSubmit).toHaveBeenCalled()
  });

});