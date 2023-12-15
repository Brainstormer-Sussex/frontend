import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { shallow } from "enzyme";
import KanoodlePuzzle from '../index.js';

describe('KanoodlePuzzle Component', () => {
  it('renders KanoodlePuzzle component', () => {
    render(shallow(<KanoodlePuzzle />));

    // Add assertions based on your component's structure
    expect(screen.getByText('Finding possible solutions for you....')).toBeInTheDocument();
    expect(screen.getByText('Solutions found:')).toBeInTheDocument();
  });

  it('starts and stops worker when buttons are clicked', async () => {
    render(shallow(<KanoodlePuzzle />));

    // Mock the StartWorker and StopWorker functions
    const mockStartWorker = jest.fn();
    const mockStopWorker = jest.fn();

    // Replace the original functions with the mocked ones
    jest.spyOn(window, 'StartWorker').mockImplementation(mockStartWorker);
    jest.spyOn(window, 'StopWorker').mockImplementation(mockStopWorker);

    // Click the "Find Solutions" button
    fireEvent.click(screen.getByText('Find Solutions'));

    // Add assertions to check if StartWorker is called
    expect(mockStartWorker).toHaveBeenCalledTimes(1);

    // Click the "Stop" button
    fireEvent.click(screen.getByText('Stop'));

    // Add assertions to check if StopWorker is called
    expect(mockStopWorker).toHaveBeenCalledTimes(1);

    // Restore the original functions
    jest.restoreAllMocks();
  });
});
