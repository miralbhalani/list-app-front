import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTodoBox from './CreateTodoBox';
import listStore from "../../stores/ListStore";

describe('<CreateTodoBox />', () => {
  test('it should mount', () => {
    render(<CreateTodoBox 
      list={listStore.getListPrototype()}
      listItem={listStore.getListItemPrototype()}
      listItemIndex = {0}
      onSubmitComplete={() => {}} />);
    
    const createTodoBox = screen.getByTestId('CreateTodoBox');

    expect(createTodoBox).toBeInTheDocument();
  });
});