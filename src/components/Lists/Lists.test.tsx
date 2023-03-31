



import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Lists from './Lists';
import { listMockData } from '../../testdata/common.testdata';
import listStore from "../../stores/ListStore";
// import {getList} from "../../services/index";
import { List, ListItem } from '../../types';
import waitForExpect from 'wait-for-expect';
import { act } from 'react-dom/test-utils';
import { editListTitle } from '../../services';
const mockLists: List[] = [{ _id: "5252", title: "Title 1", items: [{ title: 'Title 2' }, { title: 'Title 3' }, { title: 'Title 4' }] }];

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

jest.setTimeout(10000)
jest.mock("../../services/index", () => ({
  
  getList: async () => {
    return mockLists
  },
  editListTitle: async () => {
    return true
  },
  addList: async () => {
    return "523666"
  },
}))

describe('<Lists />', () => {
  test('it should mount', async () => {

    await act(async () => {
      render(<Lists />);
    });
    
    const lists = screen.getByTestId('Lists');

    expect(lists).toBeInTheDocument();
  });

  describe('render lists', () => {

    beforeEach( async () => {
      await act(async () => {
        render(<Lists />);
      });
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();
    })

    test('list reflects in store', async () => {

      expect(listStore.lists).toStrictEqual(mockLists)
    });
    
    test('list renders', async () => {

      await waitForExpect(() => {

        let allTestList = screen.getAllByTestId('list-item');
        expect(allTestList).toHaveLength(1)

        for(let i=0; i<mockLists.length; i++ ) {
          const docE = screen.getByText(mockLists[i].title);
          expect(docE).toBeInTheDocument();
        }
      })
    });

  })  

  
  describe('list ad/edit popover renders', () => {

    beforeEach(async () => {
      await act(async () => {
        render(<Lists />);
      });
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();

      expect(listStore.lists).toStrictEqual(mockLists)
    })

    test('renders popover on click of edit', async () => {

      let listItemEditDoc = screen.getByTestId('list-item-edit');

      fireEvent.click(listItemEditDoc)

      let listTitleInput = screen.getByTestId('list-title-input');
      expect(listTitleInput).toBeInTheDocument()
      
    });
  }) 

  
  
  describe('add/edit lists', () => {

    beforeEach(async () => {
      await act(async () => {
        render(<Lists />);
      });
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();

      expect(listStore.lists).toStrictEqual(mockLists)

    })

    test('edits the list', async () => {

      let listItemEditDoc = screen.getByTestId('list-item-edit');

      fireEvent.click(listItemEditDoc)

      let listTitleInput = screen.getByTestId('list-title-input');
      expect(listTitleInput).toBeInTheDocument()
      
      let formIntpuTitle = screen.getByTestId('form-intput-title');
      await act(async () => {
        fireEvent.change(formIntpuTitle, { target: { value: 'newIDM' } })
      });

      let formSubmitTitle = screen.getByTestId('form-submit-title');
      await act(async () => {
        fireEvent.click(formSubmitTitle)
      });

      let newTitle = screen.getByText('newIDM');
      expect(newTitle).toBeInTheDocument()
    });

    test('restricts invalid value edit in the list', async () => {

      let listItemEditDoc = screen.getByTestId('list-item-edit');

      fireEvent.click(listItemEditDoc)

      let listTitleInput = screen.getByTestId('list-title-input');
      expect(listTitleInput).toBeInTheDocument()
      
      let formIntpuTitle = screen.getByTestId('form-intput-title');
      await act(async () => {
        fireEvent.change(formIntpuTitle, { target: { value: '' } })
      });

      let formSubmitTitle = screen.getByTestId('form-submit-title');
      await act(async () => {
        fireEvent.click(formSubmitTitle)
      });

      let newTitle = screen.getByText(mockLists[0].title);
      expect(newTitle).toBeInTheDocument()
    });

    test('adds in the list', async () => {

      let addListItem = screen.getByTestId('new-list-add');

      fireEvent.click(addListItem)

      let listTitleInput = screen.getByTestId('list-title-input-add');
      expect(listTitleInput).toBeInTheDocument()
      
      let formIntpuTitle = screen.getByTestId('form-intput-title');
      await act(async () => {
        fireEvent.change(formIntpuTitle, { target: { value: 'AddedList' } })
      });

      let formSubmitTitle = screen.getByTestId('form-submit-title');
      await act(async () => {
        fireEvent.click(formSubmitTitle)
      });

      expect(listStore.lists).toHaveLength(2)

      let newTitle = screen.getByText('AddedList');
      expect(newTitle).toBeInTheDocument()
    });

    test('restricts invalid value to add in the list', async () => {

      let addListItem = screen.getByTestId('new-list-add');

      fireEvent.click(addListItem)

      let listTitleInput = screen.getByTestId('list-title-input-add');
      expect(listTitleInput).toBeInTheDocument()
      
      let formIntpuTitle = screen.getByTestId('form-intput-title');
      await act(async () => {
        fireEvent.change(formIntpuTitle, { target: { value: '' } })
      });

      let formSubmitTitle = screen.getByTestId('form-submit-title');
      await act(async () => {
        fireEvent.click(formSubmitTitle)
      });

      expect(listStore.lists).toHaveLength(1)
    });
  }) 
});