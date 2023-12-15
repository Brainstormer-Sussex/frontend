import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  beforeEach(() => {
    render(<MyComponent />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show "Show" when sphere5 is true', () => {
    // Arrange
    const sphere5Button = screen.getByText(/Polysphere Pyramid Layer 5/i);

    // Act
    fireEvent.click(sphere5Button);

    // Assert
    expect(sphere5Button).toHaveTextContent(/Show/i);
  });

  test('should show "Hide" when sphere5 is false', () => {
    // Arrange
    const sphere5Button = screen.getByText(/Polysphere Pyramid Layer 5/i);

    // Act
    fireEvent.click(sphere5Button);

    // Assert
    expect(sphere5Button).toHaveTextContent(/Hide/i);
  });
});