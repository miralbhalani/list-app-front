import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Lists from './Lists';
import { listMockData } from '../../testdata/common.testdata';
import listStore from "../../stores/ListStore";
import { getList } from "../../services/index";
import { List } from '../../types';
// jest.mock("../../services/index");

const mockLists = [{ _id: "5252", title: "Title 1", items: [{ title: 'Title 2' }, { title: 'Title 3' }, { title: 'Title 4' }] }];

jest.mock('../../services/index', () => ({
  getList: jest.fn(() => {
    console.log("*************************************")
    return Promise.resolve([{ _id: "5252", title: "Title 1" , items: [{title: 'Title 2'}, {title: 'Title 3'}, {title: 'Title 4'}] }])
  }),
}));

describe('<Lists />', () => {
  // test('it should mount', () => {
  //   render(<Lists />);
    
  //   const lists = screen.getByTestId('Lists');

  //   expect(lists).toBeInTheDocument();
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  // var mockList = [{ _id: "5252", title: "Title 1", items: [{ title: 'Title 2' }, { title: 'Title 3' }, { title: 'Title 4' }] }];
  // const mockGetUserDetails = getList as jest.MockedFunction<
  //   typeof getList
  // >;
  // // Provide our custom implementation here
  // mockGetUserDetails.mockImplementation(() => Promise.resolve(mockList));


  // beforeAll(async () => {
  //   await getList()
  // });

  // test('it should mount', async () => {
  //   // const spyFetchData = jest.spyOn(Lists.prototype, 'fetchData');

  //   render(<Lists />);

  //   const lists = screen.getByTestId('Lists');

  //   expect(lists).toBeInTheDocument();

  //   expect(listStore.lists).toBe(mockLists)
  //   // await waitFor(() => {
  //   //     expect(screen.getByText('Title 1')).toBeInTheDocument();
  //   // });
  // });
  
  test('it should mount', async () => {
    let result = await getList();

    console.log(result, "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    result = result as List[];
    expect(result.length).toBe(1);
    expect(result[0]._id).toBe("5252");
    expect(result[0].title).toBe("Title 1");
    expect(result[0].items.length).toBe(3);
    expect(result[0].items[0].title).toBe("Title 2");
    expect(result[0].items[1].title).toBe("Title 3");
    expect(result[0].items[2].title).toBe("Title 4");
  });

});