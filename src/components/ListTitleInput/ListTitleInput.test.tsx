import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListTitleInput from './ListTitleInput';

describe('<ListTitleInput />', () => {
  test('it should mount', () => {
    render(<ListTitleInput onSubmitComplete={() => {}} />);
    
    const listTitleInput = screen.getByTestId('ListTitleInput');

    expect(listTitleInput).toBeInTheDocument();
  });
});