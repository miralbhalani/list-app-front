



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
  }
}))

describe('<Lists />', () => {
  test('it should mount', () => {
    render(<Lists />);
    
    const lists = screen.getByTestId('Lists');

    expect(lists).toBeInTheDocument();
  });

  describe('render lists', () => {

    beforeEach(() => {
      render(<Lists />);
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();
    })

    test('list reflects in store', async () => {

      await waitForExpect(() => {
        expect(listStore.lists).toStrictEqual(mockLists)
      })
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
      render(<Lists />);
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();

      await waitForExpect(() => {
        expect(listStore.lists).toStrictEqual(mockLists)
      })
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
      render(<Lists />);
      const lists = screen.getByTestId('Lists');
      expect(lists).toBeInTheDocument();

      await waitForExpect(() => {
        expect(listStore.lists).toStrictEqual(mockLists)
      })

    })

    test('renders popover on click of edit', async () => {

      
      let listItemEditDoc = screen.getByTestId('list-item-edit');

      fireEvent.click(listItemEditDoc)

      let listTitleInput = screen.getByTestId('list-title-input');
      expect(listTitleInput).toBeInTheDocument()

      
      let formIntpuTitle = screen.getByTestId('form-intpu-title');
      act(() => {
        fireEvent.change(formIntpuTitle, { target: { value: 'newIDM' } })
      })
      

      let formSubmitTitle = screen.getByTestId('form-submit-title');
      fireEvent.click(formSubmitTitle)
      

      let newTitle = screen.getByText('newIDM');
      expect(newTitle).toBeInTheDocument()
    });
  }) 


});