// Import necessary dependencies and utilities for testing
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NQueenProblem from './NQueenProblem.js';
import { shallow } from "enzyme";

// Mock Redux store
const mockStore = configureMockStore([thunk]);

describe('NQueenProblem Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      chessboard: {
        searching: false,
        resultFound: false,
        dimensions: 8, // initial value for testing
        permutations: [],
        allPermutations: [],
      },
    });
  });

  it('renders NQueenProblem component', () => {
    render(
      <Provider store={store}>
        {shallow(<NQueenProblem />)}
      </Provider>
    );

    // Add assertions based on your component's structure
    expect(screen.getByText('N-Queen')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('updates chessboard dimensions on input change', () => {
    render(
      <Provider store={store}>
        {shallow(<NQueenProblem />)}
      </Provider>
    );

    const input = screen.getByPlaceholderText('N');
    fireEvent.change(input, { target: { value: '8' } });

    expect(input.value).toBe('8');
  });

  it('generates N-Queen permutations on button click', async () => {
    render(
      <Provider store={store}>
        {shallow(<NQueenProblem />)}
      </Provider>
    );

    const generateButton = screen.getByText('Generate N-Queen permutations');
    fireEvent.click(generateButton);

    // Add assertions to check if the generation is triggered
    // Use waitFor to wait for asynchronous actions to complete if needed
    await waitFor(() => {
      expect(store.getActions()).toContainEqual(
        chessBoardAction.GENERATE_NQUEEN_PERMUTATION_CHESSBOARD({
            dimensions: 8,
            position: { row: 1, col: 1 }
        })
      );
    });
  });
});